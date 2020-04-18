const kidAtPosition = function(initialPosition) {
  var currentPosition = initialPosition;

  const moveLeft = function () {
    if (currentPosition > 0) currentPosition -= 1;
  };

  const position = function () {
    return currentPosition;
  };

  return { moveLeft, position };
};

(function () {
  const thingsToExport = { kidAtPosition };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
