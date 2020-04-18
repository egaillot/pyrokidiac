(function () {
  const { aDivOfClass } = (typeof(module) !== "undefined")
                        ? require("./utils.js")
                        : window.PK;

  const aKidView = function (initialState, document, selector) {
    const WIDTH = 50;
    const HEIGHT = 100;
    const MAX_POS = 6;

    const display = function () {
      kidElement.style.visibility = "visible";
    };

    const kidPositionChanged = function (newPosition) {
      return updateElementPosition(newPosition);
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

    const getKidElement = function (document) {
      return aDivOfClass("kid", document);
    };

    const parent = document.querySelector(selector);
    const kidElement = getKidElement(document);
    updateElementPosition(initialState.position);
    parent.appendChild(kidElement);

    return { display, kidPositionChanged };
  };


  const thingsToExport = { aKidView };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
