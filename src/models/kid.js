const aKid = function(initialState, fire) {
  var currentPosition = initialState.position;
  var carriesALog = initialState.carriesALog;
  var observers = [];

  const addObserver = function (observer) {
    observers.push(observer);
  };

  const dropButtonPressed = function () {
    dropLog();
  };

  const dropLog = function () {
    if (carriesALog) {
      carriesALog = false;
      notifyObserversStateChanged();

      if (fire.edge() === currentPosition - 1) {
        fire.grow();
      }
    }
  };

  const isCarryingALog = function () {
    return carriesALog;
  };

  const leftButtonPressed = function () {
    moveLeft();
  };

  const moveLeft = function () {
    if (currentPosition > 0) shiftPosition(-1);
  };

  const moveRight = function () {
    if (currentPosition < 5) shiftPosition(1);
    else getALog();
  };

  const position = function () {
    return currentPosition;
  };

  const rightButtonPressed = function () {
    moveRight();
  };

  const state = function () {
    return {
      position: currentPosition,
      carriesALog: carriesALog
    };
  };

  const getALog = function () {
    carriesALog = true;
    notifyObserversStateChanged();
  };

  const notifyObserversStateChanged = function () {
    const currentState = state();
    observers.forEach((o) => o.kidStateChanged(currentState));
  };

  const shiftPosition = function (shift) {
    currentPosition += shift;
    notifyObserversStateChanged();
  };

  return { addObserver, dropButtonPressed, dropLog, isCarryingALog, leftButtonPressed,
           moveLeft, moveRight, position, rightButtonPressed, state };
};

(function () {
  const thingsToExport = { aKid };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());
