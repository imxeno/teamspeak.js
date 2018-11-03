"use strict";
const chalk = require("chalk");
const expect = require("chai").expect;
const TSJSServerQuery = require("../dist/index.js").TSJSServerQuery;
const realServer = require("./util/realServer");

const serverPath = "./temp";
const credentials = {
  client_login_name: "serveradmin",
  client_login_password: "p4ssw0rd"
};

describe("Real server test", () => {
  before(async function() {
    this.timeout(60000);
    console.log(
      chalk.grey(
        "    Downloading and starting a local TeamSpeak 3 server instance..."
      )
    );
    await realServer.startServer(
      serverPath,
      process.env.PLATFORM,
      process.env.VERSION,
      credentials.client_login_password
    );
    console.log(
      chalk.grey("    TeamSpeak 3 server instance has been started!")
    );
  });

  it("should connect to a local server and login using predefined details", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  it("should logout", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
      await ts.logout();
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  it("should throw request error when permissions are insufficient", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.getServers();
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  it("should get server list", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
      expect((await ts.getServers()).length).to.be.equal(1);
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  it("should get a server by id", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
      await ts.getServerById(1);
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  it("should get a server by default port", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
      await ts.getServerByPort(9987);
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  it("should restart the server", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
      const server = await ts.getServerById(1);
      await server.stop();
      await server.start();
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  it("should stop the server", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
      await ts.stopProcess();
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });

  after(() => {
    console.log(
      chalk.grey("    Killing and removing TeamSpeak 3 server instance...")
    );
    realServer.stopServer(serverPath);
    console.log(
      chalk.grey("    TeamSpeak 3 server instance has been killed and removed!")
    );
  });
});
