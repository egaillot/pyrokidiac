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

  it("notifies observers when Right Button is pressed", function (done) {
    const observer = {
      rightButtonPressed: function () {
        done();
      }
    };

    const listener = aButtonListener();
    listener.add(observer);
    listener.notifyObservers({ keyCode: listener.RIGHT_BUTTON });
  });

  it("notifies observers when Drop Button is pressed", function (done) {
    const observer = {
      dropButtonPressed: function () {
        done();
      }
    };

    const listener = aButtonListener();
    listener.add(observer);
    listener.notifyObservers({ keyCode: listener.DROP_BUTTON });
  });
});
