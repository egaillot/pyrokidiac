const expect = require("expect.js");
const { JSDOM } = require("jsdom");

const { aKidView } = require("../../src/views/kid.view.js");

describe("Kid view", function () {
  var document;

  beforeEach(function () {
    document = new JSDOM("<div class=\"playscreen\"></div>").window.document;
  });

  it("displays Kid", function () {
    const kidView = aKidView({ position: 4}, document, ".playscreen");
    expect(document.querySelector(".playscreen").children.length).to.equal(1);
    const kidElement = document.querySelector(".playscreen .kid");
    expect(kidElement).not.to.be(null);
    expect(kidElement.style.visibility).to.equal("hidden");

    kidView.display();
    expect(kidElement.style.visibility).to.equal("visible");
  });

  it("plays a sound when Kid drops log in fire", function (done) {
    const player = {
      play: function (soundName) {
        expect(soundName).to.equal("dropLogInFire");
        done();
      }
    };

    const kidView = aKidView({ position: 4}, document, ".playscreen", player);
    kidView.kidStateChanged({ justDroppedALogInFire: true });
  });

  it("plays a sound when Kid drops log away", function (done) {
    const player = {
      play: function (soundName) {
        expect(soundName).to.equal("dropLog");
        done();
      }
    };

    const kidView = aKidView({ position: 4}, document, ".playscreen", player);
    kidView.kidStateChanged({ justDroppedALogAway: true });
  });

  it("plays a sound when Kid picks up a log", function (done) {
    const player = {
      play: function (soundName) {
        expect(soundName).to.equal("pickUpLog");
        done();
      }
    };

    const kidView = aKidView({ position: 4}, document, ".playscreen", player);
    kidView.kidStateChanged({ justPickedALog: true });
  });

  it("displays Kid differently when Game Over", function () {
    const kidView = aKidView({ position: 4}, document, ".playscreen");
    const kidElement = document.querySelector(".playscreen .kid");
    expect(Object.values(kidElement.classList)).not.to.contain("game-over");

    kidView.gameStateChanged({ gameOver: true });
    expect(Object.values(kidElement.classList)).to.contain("game-over");
  });
});
