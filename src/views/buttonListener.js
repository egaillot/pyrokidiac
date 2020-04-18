const aButtonListener = function () {
  const DROP_BUTTON = 65; // A key
  const LEFT_BUTTON = 90; // Z key
  const RIGHT_BUTTON = 77; // M key

  var observers = [];

  const add = function (observer) {
   observers.push(observer);
  };

  const notifyObservers = function (event) {
    switch(event.keyCode) {
      case DROP_BUTTON:
        observers.forEach((o) => o.dropButtonPressed());
        break;
      case LEFT_BUTTON:
        observers.forEach((o) => o.leftButtonPressed());
        break;
      case RIGHT_BUTTON:
        observers.forEach((o) => o.rightButtonPressed());
        break;
    }
  };

  return { DROP_BUTTON, LEFT_BUTTON, RIGHT_BUTTON, add, notifyObservers };
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
