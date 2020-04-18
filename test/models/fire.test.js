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
    expect(fire.state()).to.eql({ strength: 3 });
  });

  it("notifies its observers when it grows", function (done) {
    const observer = {
      fireStateChanged: function (state) {
        expect(state.strength).to.equal(3);
        done();
      }
    };

    const fire = aFire({ strength: 2 });
    fire.addObserver(observer);
    fire.grow();
  });

  it("knows its edge", function () {
    const fire = aFire({ strength: 2 });
    expect(fire.edge()).to.equal(0);
  });
});
