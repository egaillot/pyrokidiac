(function () {
  const { aDivOfClass } = (typeof(module) !== "undefined")
                        ? require("./utils.js")
                        : window.PK;

  const aScoreView = function (document, selector) {
    const parent = document.querySelector(selector);

    const display = function () {
      scoreElement.style.visibility = "visible";
      scoreElement.innerText = "0";
    };

    const fireStateChanged = function (newState) {
      const score = newState.score;
      scoreElement.innerText = `${score}`;
    };

    const getScoreElement = function () {
      const element = aDivOfClass("score", document);
      return element;
    };

    const scoreElement = getScoreElement();
    parent.appendChild(scoreElement);

    return { display, fireStateChanged };
  };

  const thingsToExport = { aScoreView };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
