const expect = require("expect.js");

const { aFire } = require("../../src/models/fire.js");

describe("The Fire", function () {
  it("is alive!", function () {
    const fire = aFire({ strength: 2 });
    expect(fire.isAlive()).to.be.ok();
  });

  it("can be dead", function () {
    const fire = aFire({ strength: 0 });
    expect(fire.isAlive()).not.to.be.ok();
  });

  it("grows", function () {
    const fire = aFire({ strength: 2 });
    expect(fire.canGrow()).to.be(true);
    fire.grow();
    expect(fire.state().strength).to.eql(3);
  });

  it("notifies its observers when it grows", function (done) {
    const observer = {
      fireStateChanged: function (state) {
        expect(state.strength).to.equal(3);
        done();
      }
    };

    const fire = aFire({ strength: 2, maxStrength: 5 });
    fire.addObserver(observer);
    fire.grow();
  });

  it("knows its edge", function () {
    const fire = aFire({ strength: 2 });
    expect(fire.edge()).to.equal(0);
  });

  it("dies out if not fed", function () {
    const fire = aFire({ strength: 2 });
    fire.nextTick();
    expect(fire.state().strength).to.equal(1);
  });

  it("doesn't dim when game is over", function () {
    const fire = aFire({ strength: 2, gameOver: true });
    fire.nextTick();
    expect(fire.state().strength).to.equal(2);
  });

  it("cannot go below 0", function () {
    const fire = aFire({ strength: 0 });
    fire.nextTick();
    expect(fire.state().strength).to.equal(0);
  });

  it("notifies its observers when it dims", function (done) {
    const observer = {
      fireStateChanged: function (state) {
        expect(state.strength).to.equal(1);
        done();
      }
    };

    const fire = aFire({ strength: 2 });
    fire.addObserver(observer);
    fire.dim();
  });

  it("doesn't notify its observers when it dies out", function () {
    var observerWasNotified = false;
    const observer = {
      fireStateChanged: function (state) {
        if (state.justDimmed) observerWasNotified = true;
      }
    };

    const fire = aFire({ strength: 1 });
    fire.addObserver(observer);
    fire.dim();
    expect(observerWasNotified).to.be(false);
  });

  it("cannot grow past max strength", function () {
    const fire = aFire({ strength: 5, maxStrength: 5 });
    expect(fire.canGrow()).to.be(false);
    fire.grow();
    expect(fire.state().strength).to.equal(5);
  });

  it("scores points when it strengthens", function (done) {
    const observer = {
      fireStateChanged: function (state) {
        expect(state.scoreShift).to.equal(1);
        done();
      }
    };
    const fire = aFire({ strength: 2 });
    fire.addObserver(observer);
    fire.grow();
  });

  it("ends game when fire dies out", function (done) {
    const observer = {
      fireStateChanged: function (state) {
        expect(state.gameOver).to.be(true);
        done();
      }
    };
    const fire = aFire({ strength: 1 });
    fire.addObserver(observer);
    fire.dim();
  });

  it("ends game when told so", function (done) {
    const observer = {
      fireStateChanged: function (newState) {
        expect(newState.gameOver).to.be(true);
        done();
      }
    };

    const fire = aFire({ strength: 1 });
    fire.addObserver(observer);
    fire.gameStateChanged({ gameOver: true });
  });

  it("doesn't forward Game Over message when game is already over", function () {
    var timesObserverNotified = 0;
    const observer = { fireStateChanged: () => timesObserverNotified +=1 };

    const fire = aFire({ strength: 1 });
    fire.addObserver(observer);
    fire.gameStateChanged({ gameOver: true });
    fire.gameStateChanged({ gameOver: true });
    expect(timesObserverNotified).to.equal(1);
  });

  it("notifies its observers when just having dimmed", function () {
    var timesObserverNotifiedAboutDim = 0;
    const observer = {
      fireStateChanged: function (state) {
        if (state.justDimmed) timesObserverNotifiedAboutDim +=1;
      }
    };

    const fire = aFire({ strength: 2 });
    fire.addObserver(observer);
    fire.dim();
    fire.grow();
    expect(timesObserverNotifiedAboutDim).to.equal(1);
  });
});
