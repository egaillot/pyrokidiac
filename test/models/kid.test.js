const expect = require("expect.js");
const { aKid } = require("../../src/models/kid.js");

describe("Kid", function () {
  var fire;

  beforeEach(function () {
    fire = { edge: () => 0 };
  });

  it("has a starting position", function () {
    const kid = aKid({ position: 4}, fire);
    expect(kid.position()).to.equal(4);
  });

  it("moves to the left", function () {
    const kid = aKid({ position: 4 }, fire);
    kid.moveLeft();
    expect(kid.position()).to.equal(3);
  });

  it("moves to the right", function () {
    const kid = aKid({ position: 4 }, fire);
    kid.moveRight();
    expect(kid.position()).to.equal(5);
  });

  it("can't move left past position 0", function () {
    const kid = aKid({ position: 0 }, fire);
    kid.moveLeft();
    expect(kid.position()).to.equal(0);
  });

  it("can't move right past position 5", function () {
    const kid = aKid({ position: 5 }, fire);
    kid.moveRight();
    expect(kid.position()).to.equal(5);
  });

  it("updates its position when Left Button is pressed", function () {
    const kid = aKid({ position: 4 }, fire);
    kid.leftButtonPressed();
    expect(kid.position()).to.equal(3);
  });

  it("updates its position when Right Button is pressed", function () {
    const kid = aKid({ position: 4 }, fire);
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
    const kid = aKid({ position: 4 }, fire);
    kid.addObserver(observer);
    kid.moveLeft();
  });

  it("gets a log when trying to move past position 5", function () {
    const kid = aKid({ position: 5, carriesALog: false }, fire);
    expect(kid.isCarryingALog()).to.be(false);

    kid.moveRight();
    expect(kid.isCarryingALog()).to.be(true);
  });

  it("drops the log when Drop Button is pressed", function () {
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
    const kid = aKid({ position: 5 }, fire);
    kid.addObserver(observer);
    kid.moveRight();
  });

  it("returns its state", function () {
    const kid = aKid({ position: 4, carriesALog: false, gameOver: true }, fire);
    expect(kid.state()).to.eql({
      position: 4, carriesALog: false, gameOver: true,
      justDroppedALogAway: false, justDroppedALogInFire: false
    });
  });

  it("feeds Fire when dropping log close to it", function (done) {
    fire.grow = done;
    const kid = aKid({ position: 1, carriesALog: true }, fire);

    kid.dropLog();
  });

  it("cannot move when game is over", function () {
    const kid = aKid({ position: 4, gameOver: true }, fire);
    kid.moveRight();
    expect(kid.state().position).to.equal(4);
    kid.moveLeft();
    expect(kid.state().position).to.equal(4);
  });

  it("cannot drop log when game is over", function () {
    const kid = aKid({ position: 4, carriesALog: true, gameOver: true }, fire);
    expect(kid.state().carriesALog).to.be(true);
    kid.dropLog();
    expect(kid.state().carriesALog).to.be(true);
  });

  it("looses when notified game is over", function () {
    const kid = aKid({ position: 4 }, fire);
    expect(kid.state().gameOver).to.be(false);
    kid.gameStateChanged({ gameOver: true });
    expect(kid.state().gameOver).to.be(true);
  });

  it("looses when it attemps to walk into fire", function () {
    const kid = aKid({ position: 1 }, fire);
    expect(kid.state().gameOver).to.be(false);
    kid.moveLeft();
    expect(kid.state().gameOver).to.be(true);
  });

  it("ends game when told so", function (done) {
    const observer = {
      kidStateChanged: function (newState) {
        expect(newState.gameOver).to.be(true);
        done();
      }
    };

    const kid = aKid({ position: 1 }, fire);
    kid.addObserver(observer);
    kid.gameStateChanged({ gameOver: true });
  });

  it("doesn't forward Game Over message when game is already over", function () {
    var timesObserverNotified = 0;
    const observer = { kidStateChanged: () => timesObserverNotified +=1 };

    const kid = aKid({ position: 1 }, fire);
    kid.addObserver(observer);
    kid.gameStateChanged({ gameOver: true });
    kid.gameStateChanged({ gameOver: true });
    expect(timesObserverNotified).to.equal(1);
  });

  it("notifies its observers when just having dropped a log in the fire", function () {
    var timesObserverNotifiedAboutDroppingLog = 0;
    const observer = {
      kidStateChanged: function (state) {
        if (state.justDroppedALogInFire) timesObserverNotifiedAboutDroppingLog +=1;
      }
    };

    fire.grow = () => {};
    const kid = aKid({ position: 1, carriesALog: true }, fire);
    kid.addObserver(observer);
    kid.dropLog();
    kid.moveRight();
    expect(timesObserverNotifiedAboutDroppingLog).to.equal(1);
  });

  it("notifies its observers when just having dropped a log away from fire", function () {
    var timesObserverNotifiedAboutDroppingLog = 0;
    const observer = {
      kidStateChanged: function (state) {
        if (state.justDroppedALogAway) timesObserverNotifiedAboutDroppingLog +=1;
      }
    };

    fire.grow = () => {};
    const kid = aKid({ position: 2, carriesALog: true }, fire);
    kid.addObserver(observer);
    kid.dropLog();
    kid.moveRight();
    expect(timesObserverNotifiedAboutDroppingLog).to.equal(1);
  });
});
