const expect = require("expect.js");

const { aGame } = require("../../src/models/game.js");

describe("Game", function () {
  it("is over when Kid says so", function () {
    const game = aGame();
    expect(game.state().gameOver).to.be(false);

    game.kidStateChanged({ gameOver: true });
    expect(game.state().gameOver).to.be(true);
  });

  it("is over when Fire says so", function () {
    const game = aGame();
    expect(game.state().gameOver).to.be(false);

    game.fireStateChanged({ gameOver: true });
    expect(game.state().gameOver).to.be(true);
  });

  it("keeps track of the score", function () {
    const game = aGame();
    expect(game.state().score).to.equal(0);
    game.fireStateChanged({ scoreShift: 2 });
    expect(game.state().score).to.equal(2);
  });

  it("notifies its observers when state changes", function (done) {
    const observer = {
      gameStateChanged: function (state) {
        expect(state.score).to.be(2);
        done();
      }
    };
    const game = aGame();
    game.addObserver(observer);
    game.fireStateChanged({ scoreShift: 2 });
  });

  it("doesn't forward Game Over notification when unnecessary", function () {
    var timesObserversWereNotified = 0;
    const observer = { gameStateChanged: () => timesObserversWereNotified += 1 };

    const game = aGame();
    game.addObserver(observer);
    game.fireStateChanged({ gameOver: true });
    game.fireStateChanged({ gameOver: true });
    game.kidStateChanged({ gameOver: true });
    expect(timesObserversWereNotified).to.equal(1);
  });
});
