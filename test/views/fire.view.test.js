const expect = require("expect.js");
const { JSDOM } = require("jsdom");

const { aFireView } = require("../../src/views/fire.view.js");

describe("Fire View", function () {
  var document;

  beforeEach(function () {
    document = new JSDOM("<div class=\"playscreen\"></div>").window.document;
  });

  it("displays the fire", function () {
    const fireView = aFireView({ strength: 2 }, document, ".playscreen");
    fireView.display();

    const fireElement = document.querySelector(".playscreen .fire");
    expect(fireElement).not.to.be(null);
    expect(fireElement.style.visibility).to.equal("visible");
  });

  it("displays flames", function () {
    aFireView({ strength: 2 }, document, ".playscreen");
    const fireElement = document.querySelector(".fire");
    expect(fireElement.children.length).to.equal(2);
  });

  it("refreshes when fire state changes", function () {
    const fireView = aFireView({ strength: 2 }, document, ".playscreen");
    fireView.fireStateChanged({ strength: 3 });
    const fireElement = document.querySelector(".fire");
    expect(fireElement.children.length).to.equal(3);
  });

  it("displays Fire differently when Game Over", function () {
    const fireView = aFireView({ strength: 1 }, document, ".playscreen");
    const flameElement = document.querySelector(".playscreen .flame");
    expect(flameElement).not.to.be(null);
    expect(Object.values(flameElement.classList)).not.to.contain("game-over");

    fireView.gameStateChanged({ gameOver: true });
    expect(Object.values(flameElement.classList)).to.contain("game-over");
  });

  it("plays a sound when Fire dims", function (done) {
    const player = {
      play: function (soundName) {
        expect(soundName).to.equal("fireDim");
        done();
      }
    };

    const fireView = aFireView({ strength: 2 }, document, ".playscreen", player);
    fireView.fireStateChanged({ justDimmed: true });
  });

});
