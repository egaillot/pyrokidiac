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

  it("cannot grow past max strength", function () {
    const fire = aFire({ strength: 5, maxStrength: 5 });
    fire.grow();
    expect(fire.state().strength).to.equal(5);
  });

  it("scores points when it strengthens", function () {
    const fire = aFire({ strength: 2 });
    expect(fire.state().score).to.equal(0);
    fire.grow();
    expect(fire.state().score).to.equal(1);
  });

  it("ends game when fire dies out", function () {
    const observer = {
      fireStateChanged: function (state) {
        expect(state.gameOver).to.be(true);
      }
    };
    const fire = aFire({ strength: 1 });
    fire.addObserver(observer);
    fire.dim();
  });
});
