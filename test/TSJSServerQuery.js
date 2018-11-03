"use strict";
const expect = require("chai").expect;
const TSJSServerQuery = require("../dist/index.js").TSJSServerQuery;

describe("TSJSServerQuery", () => {
  it("should throw when trying to override an unknown option", () => {
    expect(() => {
      new TSJSServerQuery({ anUnknownOption: "nobody cares" });
    }).to.throw("Unknown option");
  });

  it("should override host option and preserve default port", () => {
    expect(new TSJSServerQuery({ host: "example.com" }).options).to.include({
      host: "example.com",
      port: 10011
    });
  });

  it("should throw when it gets a connection error", async () => {
    const ts = new TSJSServerQuery({ host: "a.host.which.does.not.exist" });
    try {
      await ts.connect();
      throw new Error("Something went wrong");
    } catch (err) {
      expect(err.getCode()).to.be.equal("CONNERR");
      expect(err.getMessage()).to.contain("getaddrinfo ENOTFOUND");
    }
  });
});
