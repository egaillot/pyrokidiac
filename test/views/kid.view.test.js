const expect = require("expect.js");
const { JSDOM } = require("jsdom");

const { aKidView } = require("../../src/views/kid.view.js");

describe("Kid view", function () {
  const { document } = new JSDOM("<div class=\"playscreen\"></div>").window;

  it("displays Kid", function () {
    const kidView = aKidView({ position: 4}, document, ".playscreen");
    expect(document.querySelector(".playscreen").children.length).to.equal(1);
    const kidElement = document.querySelector(".playscreen .kid");
    expect(kidElement).not.to.be(null);
    expect(kidElement.style.visibility).to.equal("hidden");

    kidView.display();
    expect(kidElement.style.visibility).to.equal("visible");
  });
});