const aFire = function (initialState) {
  var strength = initialState.strength;
  var observers = [];

  const addObserver = function (observer) {
    observers.push(observer);
  };

  const edge = function () {
    return 0;
  };

  const grow = function () {
    strength += 1;
    notifyObservers();
  };

  const isAlive = function () {
    return strength > 0;
  };

  const state = function () {
    return { strength };
  };

  const notifyObservers = function () {
    const currentState = state();
    observers.forEach((o) => o.fireStateChanged(currentState));
  };

  return { addObserver, edge, grow, isAlive, state };
};

(function () {
  const thingsToExport = { aFire };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
