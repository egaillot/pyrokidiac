const expect = require("expect.js");
const Kid = require("../../src/models/kid.js");

describe("Kid", function () {
  it("has a starting position", function () {
    const kid = Kid.atPosition(5);
    expect(kid.position()).to.equal(5);
  });
});
