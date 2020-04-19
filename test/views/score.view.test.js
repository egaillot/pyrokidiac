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

  it("refreshes the score when Game state changes", function () {
    const scoreView = aScoreView(document, ".playscreen");
    scoreView.gameStateChanged({ score: 5 });
    const scoreElement = document.querySelector(".playscreen .score");
    expect(scoreElement.innerText).to.equal("5");
  });

  it("displays Game Over", function () {
    const scoreView = aScoreView(document, ".playscreen");
    const gameOverElement = document.querySelector(".playscreen .game-over");
    expect(gameOverElement).not.to.be(null);
    expect(gameOverElement.innerText).to.equal(undefined);
    scoreView.gameStateChanged({ score: 5, gameOver: true });
    expect(gameOverElement.innerText).to.equal("Game Over!");
  });

  it("plays sound when Game Over", function (done) {
    const soundPlayer = {
      play: function (sound) {
        expect(sound).to.equal("gameOver");
        done();
      }
    };

    const scoreView = aScoreView(document, ".playscreen", soundPlayer);
    scoreView.gameStateChanged({ gameOver: true });
  });
});
