(function () {
  const { aDivOfClass } = (typeof(module) !== "undefined")
                        ? require("./utils.js")
                        : window.PK;

  const aScoreView = function (document, selector, player) {
    const parent = document.querySelector(selector);
    const soundPlayer = player || { play: () => {} };

    const display = function () {
      gameOverElement.style.visibility = "visible";
      scoreElement.style.visibility = "visible";
      scoreElement.innerText = "0";
    };

    const gameStateChanged = function (newState) {
      if (newState.gameOver) {
        soundPlayer.play("gameOver");
        gameOverElement.innerText = "Game Over!";
        return;
      }

      const score = newState.score;
      scoreElement.innerText = `${score}`;
    };

    const kidStateChanged = function (newState) {
      if (newState.gameOver) gameOverElement.innerText = "Game Over!";
    };

    const getGameOverElement = function () {
      const element = aDivOfClass("game-over-message", document);
      return element;
    };

    const getScoreElement = function () {
      const element = aDivOfClass("score", document);
      return element;
    };

    const scoreElement = getScoreElement();
    const gameOverElement = getGameOverElement();
    parent.appendChild(scoreElement);
    parent.appendChild(gameOverElement);

    return { display, gameStateChanged, kidStateChanged };
  };

  const thingsToExport = { aScoreView };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
