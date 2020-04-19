const PK = window.PK;

window.start = function (selector) {
  const buttonListener = PK.aButtonListener();
  const tickerListener = PK.aTickerListener();
  const fire = PK.aFire({ strength: 2 });
  const kid = PK.aKid({ position: 4 }, fire);
  const kidView = PK.aKidView(kid.state(), document, selector);
  const fireView = PK.aFireView(fire.state(), document, selector);
  const scoreView = PK.aScoreView(document, selector);

  buttonListener.add(kid);
  tickerListener.add(fire);
  fire.addObserver(fireView);
  fire.addObserver(scoreView);
  fire.addObserver(kid);
  kid.addObserver(kidView);

  document.addEventListener("keydown", (e) => buttonListener.notifyObservers(e));
  kidView.display();
  fireView.display();
  scoreView.display();

  setInterval(function () {
    tickerListener.notifyObservers();
  }, 5000);
};
