const kidAtPosition = function(initialPosition) {
  var currentPosition = initialPosition;
  var observers = [];

  const addObserver = function (observer) {
    observers.push(observer);
  };

  const leftButtonPressed = function () {
    moveLeft();
  };

  const moveLeft = function () {
    if (currentPosition > 0) shiftPosition(-1);
  };

  const position = function () {
    return currentPosition;
  };

  const shiftPosition = function (shift) {
    currentPosition += shift;
    notifyObserversPositionChanged();
  };

  const notifyObserversPositionChanged = function () {
    observers.forEach((o) => o.kidPositionChanged(currentPosition));
  };

  return { addObserver, leftButtonPressed, moveLeft, position };
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
