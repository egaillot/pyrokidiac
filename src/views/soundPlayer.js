(function () {
  const aSoundPlayer = function () {
    const soundNames = ["dropLogInFire", "gameOver"];

    const soundBank = soundNames.reduce(function (acc, name) {
      acc[name] = new Audio(`assets/sounds/${name}.wav`);
      return acc;
    }, {});

    const play = function (name) {
      const audio = soundBank[name];
      audio.play();
    };

    return { play };
  };

  const thingsToExport = { aSoundPlayer };

  if (typeof(module) !== "undefined")
    module.exports = thingsToExport;

  if (typeof(window) !== "undefined") {
    window.PK = window.PK || {};
    Object.keys(thingsToExport).forEach(function (key) { window.PK[key] = thingsToExport[key]; });
  }
}());

