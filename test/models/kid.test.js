const expect = require("expect.js");
const { kidAtPosition } = require("../../src/models/kid.js");

describe("Kid", function () {
  it("has a starting position", function () {
    const kid = kidAtPosition(4);
    expect(kid.position()).to.equal(4);
  });

  it("moves to the left", function () {
    const kid = kidAtPosition(4);
    kid.moveLeft();
    expect(kid.position()).to.equal(3);
  });

  it("moves to the right", function () {
    const kid = kidAtPosition(4);
    kid.moveRight();
    expect(kid.position()).to.equal(5);
  });

  it("can't move left past position 0", function () {
    const kid = kidAtPosition(0);
    kid.moveLeft();
    expect(kid.position()).to.equal(0);
  });

  it("can't move right past position 5", function () {
    const kid = kidAtPosition(5);
    kid.moveRight();
    expect(kid.position()).to.equal(5);
  });

  it("updates its position when Left Button is pressed", function () {
    const kid = kidAtPosition(4);
    kid.leftButtonPressed();
    expect(kid.position()).to.equal(3);
  });

  it("updates its position when Right Button is pressed", function () {
    const kid = kidAtPosition(4);
    kid.rightButtonPressed();
    expect(kid.position()).to.equal(5);
  });

  it("notifies its observers when position changes", function (done) {
    const observer = {
      kidStateChanged: function (newState) {
        expect(newState.position).to.equal(3);
        done();
      }
    };
    const kid = kidAtPosition(4);
    kid.addObserver(observer);
    kid.moveLeft();
  });

  it("doesn't carry a log at first", function () {
    const kid = kidAtPosition(4);
    expect(kid.isCarryingALog()).not.to.be.ok();
  });

  it("gets a log when trying to move past position 5", function () {
    const kid = kidAtPosition(5);
    expect(kid.isCarryingALog()).not.to.be.ok();

    kid.moveRight();
    expect(kid.isCarryingALog()).to.be.ok();
  });
});
