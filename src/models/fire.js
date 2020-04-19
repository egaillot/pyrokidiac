const aFire = function (initialState) {
  const DEFAULT_MAX_STRENGTH = 5;
  const maxStrength = initialState.maxStrength || DEFAULT_MAX_STRENGTH;
  var strength = initialState.strength;
  var observers = [];

  const addObserver = function (observer) {
    observers.push(observer);
  };

  const dim = function () {
    shiftStrength(-1);
  };

  const edge = function () {
    return 0;
  };

  const grow = function () {
    if (strength < maxStrength) shiftStrength(1);
  };

  const isAlive = function () {
    return strength > 0;
  };

  const nextTick = function () {
    if (strength > 0) dim();
  };

  const state = function () {
    return { strength };
  };

  const shiftStrength = function (shift) {
    strength += shift;
    notifyObservers();
  };

  const notifyObservers = function () {
    const currentState = state();
    observers.forEach((o) => o.fireStateChanged(currentState));
  };

  return { addObserver, dim, edge, grow, isAlive, nextTick, state };
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
