const aButtonListener = function () {
  const LEFT_BUTTON = 90;
  var observers = [];

  const add = function (observer) {
   observers.push(observer);
  };

  const notifyObservers = function (event) {
    if (event.keyCode === LEFT_BUTTON) {
      observers.forEach((o) => o.leftButtonPressed());
    }
  };

  return { LEFT_BUTTON, add, notifyObservers };
};

(function () {
  const thingsToExport = { aButtonListener };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
