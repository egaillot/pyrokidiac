const aFire = function (initialState) {
  const DEFAULT_MAX_STRENGTH = 5;
  const maxStrength = initialState.maxStrength || DEFAULT_MAX_STRENGTH;
  var gameOver = (typeof(initialState.gameOver) !== "undefined") ? initialState.gameOver : false;
  var strength = initialState.strength;
  var scoreShift = 0;
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

  const gameStateChanged = function (newState) {
     if (!gameOver && newState.gameOver) gameIsOver();
  };

  const grow = function () {
    if (strength < maxStrength) {
      scoreShift += 1;
      shiftStrength(1);
    }
  };

  const isAlive = function () {
    return strength > 0;
  };

  const nextTick = function () {
    if (gameOver) return;

    if (strength > 0) dim();
  };

  const state = function () {
    return { strength, scoreShift, gameOver };
  };

  const gameIsOver = function () {
    gameOver = true;
    notifyObservers();
  };

  const shiftStrength = function (shift) {
    strength += shift;
    if (strength === 0) gameOver = true;
    notifyObservers();
  };

  const notifyObservers = function () {
    const currentState = state();
    observers.forEach((o) => o.fireStateChanged(currentState));
    scoreShift = 0;
  };

  return { addObserver, dim, edge, gameStateChanged, grow, isAlive, nextTick, state };
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
