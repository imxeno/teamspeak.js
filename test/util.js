"use strict";
const expect = require("chai").expect;

const Util = require("../dist/util/Util").default;

describe("Util", () => {
  it("should throw when instantiated", () => {
    expect(() => new Util()).to.throw(
      "The Util class may not be instantiated."
    );
  });
});
