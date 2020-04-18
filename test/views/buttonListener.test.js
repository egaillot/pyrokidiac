const { aButtonListener } = require("../../src/views/buttonListener.js");

describe("The Button Listener", function () {
  it("notifies observers when Left Button is pressed", function (done) {
    const observer = {
      leftButtonPressed: function () {
        done();
      }
    };

    const listener = aButtonListener();
    listener.add(observer);
    listener.notifyObservers({ keyCode: listener.LEFT_BUTTON });
  });
});
