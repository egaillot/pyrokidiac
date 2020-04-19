(function () {
  const aSoundPlayer = function () {
    const soundBank = {
      "gameOver": new Audio("assets/sounds/gameOver.wav")
    };

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

