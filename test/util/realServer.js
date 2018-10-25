const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
const os = require("os");

const getPlatform = () => {
  const platform = os.platform();
  if (platform === "darwin") return "mac";
  if (platform === "win32") {
    if (arch === "x64") return "win64";
    return "win32";
  }
  const arch = os.arch() === "x64" ? "amd64" : "x86";
  return platform + "_" + arch;
};

module.exports = {
  startServer: async (
    serverPath = "./temp",
    platform = getPlatform(),
    version = "3.4.0",
    serveradmin_password
  ) => {
    let zip = false;
    if (platform === "mac" || platform === "win32" || platform === "win64") {
      zip = true;
    }
    shelljs.exec(
      "wget http://dl.4players.de/ts/releases/" +
        version +
        "/teamspeak3-server_" +
        platform +
        "-" +
        version +
        "." +
        (zip ? "zip" : "tar.bz2") +
        " -O " +
        "teamspeak3-server.temp",
      { silent: true }
    );

    if (zip) shelljs.exec("unzip teamspeak3-server.temp", { silent: true });
    else shelljs.exec("tar xjf teamspeak3-server.temp", {});

    fs.unlinkSync("teamspeak3-server.temp");
    shelljs.mv(path.resolve("./teamspeak3-server_*"), path.resolve(serverPath));
    fs.chmodSync(path.resolve(serverPath, "./ts3server"), "744");
    fs.writeFileSync(path.resolve(serverPath, "./.ts3server_license_accepted"));
    shelljs.exec(
      'export LD_LIBRARY_PATH="${LIBRARYPATH}:${LD_LIBRARY_PATH}" &&	cd ' +
        path.resolve(serverPath) +
        " && ./ts3server license_accepted=1 serveradmin_password=" +
        serveradmin_password +
        " > /dev/null & echo $! > " +
        path.resolve(serverPath, "./ts3server.pid"),
      { silent: true, async: true }
    );
    await new Promise(resolve => setTimeout(resolve, 5000));
  },
  stopServer: async serverPath => {
    await shelljs.exec(
      "kill -KILL $(cat " + path.resolve(serverPath, "./ts3server.pid") + ")",
      { async: true, silent: true }
    );
    await new Promise(resolve => setTimeout(resolve, 5000));
    shelljs.rm("-R", path.resolve(serverPath));
  }
};
