const aFire = function (initialState) {
  var strength = initialState.strength;

  const isAlive = function () {
    return strength > 0;
  };

  return { isAlive };
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
