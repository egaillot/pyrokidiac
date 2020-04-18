const expect = require("expect.js");

const { aFire } = require("../../src/models/fire.js");

describe("The Fire", function () {
  it("is alive!", function () {
    const fire = aFire({strength: 2});
    expect(fire.isAlive()).to.be.ok();
  });

  it("can be dead", function () {
    const fire = aFire({strength: 0});
    expect(fire.isAlive()).not.to.be.ok();
  });
});
