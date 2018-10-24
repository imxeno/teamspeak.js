"use strict";
const expect = require("chai").expect;
const TSJSServerQuery = require("../dist/index.js").TSJSServerQuery;

const credentials = {
  client_login_name: "serveradmin",
  client_login_password: "p4ssw0rd"
};

describe("TSJSServerQuery constructor", () => {
  it("should throw when trying to override an unknown option", () => {
    expect(() => {
      new TSJSServerQuery({ anUnknownOption: "nobody cares" });
    }).to.throw("Unknown option");
  });

  it("should correctly override host option and preserve default port", () => {
    expect(new TSJSServerQuery({ host: "example.com" }).options).to.include({
      host: "example.com",
      port: 10011
    });
  });

  it("should correctly connect to a local server and login using predefined details", async () => {
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

  it("should be able to select a server by id", async () => {
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

  it("should be able to select a server by default port", async () => {
    const ts = new TSJSServerQuery();
    try {
      await ts.connect();
      await ts.login(
        credentials.client_login_name,
        credentials.client_login_password
      );
      await ts.getServerByPort(9967);
    } catch (err) {
      throw err;
    }
    await ts.quit();
  });
});
