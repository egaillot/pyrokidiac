const expect = require("expect.js");
const { JSDOM } = require("jsdom");

const { aScoreView } = require("../../src/views/score.view.js");

describe("Score View", function () {
  var document;

  beforeEach(function () {
    document = new JSDOM("<div class=\"playscreen\"></div>").window.document;
  });

  it("displays the score", function () {
    const scoreView = aScoreView(document, ".playscreen");
    scoreView.display();
    const scoreElement = document.querySelector(".playscreen .score");
    expect(scoreElement).not.to.be(null);
    expect(scoreElement.style.visibility).to.equal("visible");
    expect(scoreElement.innerText).to.equal("0");
  });

  it("refreshes the score when fire state changes", function () {
    const scoreView = aScoreView(document, ".playscreen");
    scoreView.fireStateChanged({ score: 5 });
    const scoreElement = document.querySelector(".playscreen .score");
    expect(scoreElement.innerText).to.equal("5");
  });
});
