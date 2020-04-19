(function () {
  const { aDivOfClass } = (typeof(module) !== "undefined")
                        ? require("./utils.js")
                        : window.PK;

  const aFireView = function (initialState, document, selector) {
    const parent = document.querySelector(selector);

    const MAX_POS = 6;
    const MAX_STRENGTH = 5;
    const COLUMN_WIDTH = parent.clientWidth / MAX_POS;
    const FLAME_WIDTH = 0.8 * COLUMN_WIDTH;


    var strength = initialState.strength;

    const display = function () {
      fireElement.style.visibility = "visible";
    };

    const fireStateChanged = function (newState) {
      strength = newState.strength;
      refresh(fireElement);
    };

    const getFireElement = function () {
      const fireElement = aDivOfClass("fire", document);
      return fireElement;
    };

    const getFlameElement = function (strengthIndex) {
      const flameElement = aDivOfClass("flame", document);
      const xPosition = (COLUMN_WIDTH - FLAME_WIDTH) / 2;

      const parentHeight = parent.clientHeight;
      const groundLine = 0.75 * parentHeight;
      const skyLine = 0.15 * parentHeight;
      const flameStackStep = (groundLine - skyLine) / MAX_STRENGTH;
      const flameHeight = 0.9 * flameStackStep;
      const yPosition = groundLine - strengthIndex * flameStackStep - flameHeight;

      flameElement.style.left = `${xPosition}px`;
      flameElement.style.top = `${yPosition}px`;
      flameElement.style.width = `${FLAME_WIDTH}px`;
      flameElement.style.height = `${flameHeight}px`;
      flameElement.style.visibility = "visible";

      return flameElement;
    };

    const refresh = function (element) {
      element.textContent = "";

      for(var i = 0; i < strength; i++) {
        element.append(getFlameElement(i));
      }
    };

    const fireElement = getFireElement();
    refresh(fireElement);
    parent.appendChild(fireElement);

    return { display, fireStateChanged };
  };

  const thingsToExport = { aFireView };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
