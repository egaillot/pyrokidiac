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

  it("displays Kid differently when Game Over", function () {
    const kidView = aKidView({ position: 4}, document, ".playscreen");
    const kidElement = document.querySelector(".playscreen .kid");
    expect(Object.values(kidElement.classList)).not.to.contain("game-over");

    kidView.gameStateChanged({ gameOver: true });
    expect(Object.values(kidElement.classList)).to.contain("game-over");
  });
});
