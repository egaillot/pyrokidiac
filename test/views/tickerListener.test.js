const expect = require("expect.js");

const { aTickerListener } = require("../../src/views/tickerListener.js");

describe("Ticker Listener", function () {
  it("notifies its observers when ticker ticks", function (done) {
    const observer = {
      nextTick: function (tickStamp) {
        expect(tickStamp).to.equal(1);
        done();
      }
    };
    const listener = aTickerListener({ initialPace: 1 });
    listener.add(observer);
    listener.notifyObservers();
  });
});
