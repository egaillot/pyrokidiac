const expect = require("expect.js");
const Kid = require("../../src/models/kid.js");

describe("Kid", function () {
  it("has a starting position", function () {
    const kid = Kid.atPosition(4);
    expect(kid.position()).to.equal(4);
  });

  it("moves to the left", function () {
    const kid = Kid.atPosition(4);
    kid.moveLeft();
    expect(kid.position()).to.equal(3);
  });

  it("can't move left past position 0", function () {
    const kid = Kid.atPosition(0);
    kid.moveLeft();
    expect(kid.position()).to.equal(0);
  });

});
