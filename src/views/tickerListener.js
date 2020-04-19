(function () {
  const aTickerListener = function () {
    var observers = [];
    var tickStamp = 0;

    const add = function (observer) {
      observers.push(observer);
    };

    const notifyObservers = function () {
      tickStamp += 1;
      observers.forEach((o) => o.nextTick(tickStamp));
    };

    return { add, notifyObservers };
  };

  const thingsToExport = { aTickerListener };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());

