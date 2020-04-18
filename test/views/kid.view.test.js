const expect = require("expect.js");
const { JSDOM } = require("jsdom");

const { aKidView } = require("../../src/views/kid.view.js");


describe("Kid view", function () {
  const { document } = new JSDOM(
    "<div class=\"playscreen\" style=\"width: 600px; height: 400px\"></div>"
  ).window;

  it("displays Kid", function () {
    const kid = { position: () => 4 };
    const kidView = aKidView(kid, document, ".playscreen");
    expect(document.querySelector(".playscreen").children.length).to.equal(0);

    kidView.display();
    expect(document.querySelector(".playscreen").children.length).to.equal(1);
    expect(document.querySelector(".playscreen .kid")).not.to.be(null);
  });
});
