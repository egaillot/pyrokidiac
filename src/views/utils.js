(function () {
  const aDivOfClass = function (className, document) {
    const element = document.createElement("div");
    element.setAttribute("class", className);
    element.style.visibility = "hidden";

    return element;
  };

  const thingsToExport = { aDivOfClass };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
