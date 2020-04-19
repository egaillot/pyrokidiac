(function () {
  const aGame = function () {
    var gameOver = false;
    var score = 0;
    var observers = [];

    const addObserver = function (observer) {
      observers.push(observer);
    };

    const fireStateChanged = function (newState) {
      if (gameOver) return;

      gameOver = newState.gameOver;
      score += newState.scoreShift;
      notifyObservers();
    };

    const kidStateChanged = function (newState) {
      if (gameOver) return;

      gameOver = newState.gameOver;
      notifyObservers();
    };

    const state = function () {
      return { gameOver, score };
    };

    const notifyObservers = function () {
      observers.forEach((o) => o.gameStateChanged(state()));
    };

    return { addObserver, fireStateChanged, kidStateChanged, state };
  };

  const thingsToExport = { aGame };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
