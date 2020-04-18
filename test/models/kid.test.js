const expect = require("expect.js");
const { aKid } = require("../../src/models/kid.js");

describe("Kid", function () {
  it("has a starting position", function () {
    const kid = aKid({ position: 4});
    expect(kid.position()).to.equal(4);
  });

  it("moves to the left", function () {
    const kid = aKid({ position: 4 });
    kid.moveLeft();
    expect(kid.position()).to.equal(3);
  });

  it("moves to the right", function () {
    const kid = aKid({ position: 4 });
    kid.moveRight();
    expect(kid.position()).to.equal(5);
  });

  it("can't move left past position 0", function () {
    const kid = aKid({ position: 0 });
    kid.moveLeft();
    expect(kid.position()).to.equal(0);
  });

  it("can't move right past position 5", function () {
    const kid = aKid({ position: 5 });
    kid.moveRight();
    expect(kid.position()).to.equal(5);
  });

  it("updates its position when Left Button is pressed", function () {
    const kid = aKid({ position: 4 });
    kid.leftButtonPressed();
    expect(kid.position()).to.equal(3);
  });

  it("updates its position when Right Button is pressed", function () {
    const kid = aKid({ position: 4 });
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
    const kid = aKid({ position: 4 });
    kid.addObserver(observer);
    kid.moveLeft();
  });

  it("gets a log when trying to move past position 5", function () {
    const kid = aKid({ position: 5, carriesALog: false });
    expect(kid.isCarryingALog()).to.be(false);

    kid.moveRight();
    expect(kid.isCarryingALog()).to.be(true);
  });

  it("drops the log when Drop Button is pressed", function () {
    const fire = { edge: () => 0 };
    const kid = aKid({ position: 5, carriesALog: true }, fire);
    expect(kid.isCarryingALog()).to.be(true);

    kid.dropButtonPressed();
    expect(kid.isCarryingALog()).to.be(false);
  });

  it("notifies its observers when getting a log", function (done) {
    const observer = {
      kidStateChanged: function (newState) {
        expect(newState.carriesALog).to.equal(true);
        done();
      }
    };
    const kid = aKid({ position: 5 });
    kid.addObserver(observer);
    kid.moveRight();
  });

  it("returns its state", function () {
    const kid = aKid({ position: 4, carriesALog: false });
    expect(kid.state()).to.eql({ position: 4, carriesALog: false });
  });


  it("feeds Fire when dropping log close to it", function (done) {
    const fire = { edge: () => 0, grow: done };
    const kid = aKid({ position: 1, carriesALog: true }, fire);

    kid.dropLog();
  });
});
