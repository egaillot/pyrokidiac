const expect = require("expect.js");
const { JSDOM } = require("jsdom");

const { aFireView } = require("../../src/views/fire.view.js");

describe("Fire View", function () {
  var document;

  beforeEach(function () {
    document = new JSDOM("<div class=\"playscreen\"></div>").window.document;
  });

  it("displays the fire", function () {
    const fireView = aFireView({ strength: 2 }, document, ".playscreen");
    fireView.display();

    const fireElement = document.querySelector(".playscreen .fire");
    expect(fireElement).not.to.be(null);
    expect(fireElement.style.visibility).to.equal("visible");
  });

  it("displays flames", function () {
    aFireView({ strength: 2 }, document, ".playscreen");
    const fireElement = document.querySelector(".fire");
    expect(fireElement.children.length).to.equal(2);
  });

  it("refreshes when fire state changes", function () {
    const fireView = aFireView({ strength: 2 }, document, ".playscreen");
    fireView.fireStateChanged({ strength: 3 });
    const fireElement = document.querySelector(".fire");
    expect(fireElement.children.length).to.equal(3);
  });
});
