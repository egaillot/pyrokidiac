const aKidView = function (kid, document, selector) {
  const WIDTH = 50;
  const HEIGHT = 100;
  const MAX_POS = 6;
  const parent = document.querySelector(selector);

  const display = function () {
    const kidElement = getKidElement(document);
    parent.appendChild(kidElement);
  };

  const getKidElement = function (document) {
    const parentHeight = parent.clientHeight;
    const parentWidth = parent.clientWidth;
    const x_position = parentWidth * (kid.position() + 0.5) / MAX_POS - WIDTH / 2;
    const y_position = parentHeight * 0.75 - HEIGHT;

    const element = document.createElement("div");
    element.setAttribute("class", "kid");
    const style = element.style;
    style.width = `${WIDTH}px`;
    style.height = `${HEIGHT}px`;
    style.left = `${x_position}px`;
    style.top = `${y_position}px`;

    return element;
  };

  return { display };
};


(function () {
  const thingsToExport = { aKidView };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
