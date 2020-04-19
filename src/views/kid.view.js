(function () {
  const { aDivOfClass } = (typeof(module) !== "undefined")
                        ? require("./utils.js")
                        : window.PK;

  const aKidView = function (initialState, document, selector, player) {
    const WIDTH = 50;
    const HEIGHT = 100;
    const MAX_POS = 6;

    const soundPlayer = player || { play: () => {} };
    const parent = document.querySelector(selector);

    const display = function () {
      kidElement.style.visibility = "visible";
    };

    const gameStateChanged = function (newState) {
      updateGameOver(newState.gameOver);
    };

    const kidStateChanged = function (newState) {
      if (newState.justDroppedALogInFire) soundPlayer.play("dropLogInFire");
      if (newState.justDroppedALogAway) soundPlayer.play("dropLog");

      updateElementPosition(newState.position);
      updateLogCarrying(newState.carriesALog);
    };

    const updateElementPosition = function (newPosition) {
      const parentHeight = parent.clientHeight;
      const parentWidth = parent.clientWidth;
      const x_position = parentWidth * (newPosition + 0.5) / MAX_POS - WIDTH / 2;
      const y_position = parentHeight * 0.75 - HEIGHT;

      const style = kidElement.style;
      style.width = `${WIDTH}px`;
      style.height = `${HEIGHT}px`;
      style.left = `${x_position}px`;
      style.top = `${y_position}px`;
    };

    const updateGameOver = function (gameOver) {
      if (gameOver) kidElement.classList.add("game-over");
    };

    const updateLogCarrying = function (carriesALog) {
      var classList = kidElement.classList;
      if (carriesALog) classList.add("withLog");
      else classList.remove("withLog");
    };

    const getKidElement = function (document) {
      return aDivOfClass("kid", document);
    };

    const kidElement = getKidElement(document);
    updateElementPosition(initialState.position);
    parent.appendChild(kidElement);

    return { display, gameStateChanged, kidStateChanged };
  };


  const thingsToExport = { aKidView };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
