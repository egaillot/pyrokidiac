const PK = window.PK;

window.start = function (selector) {
  const buttonListener = PK.aButtonListener();
  const tickerListener = PK.aTickerListener();
  const soundPlayer = PK.aSoundPlayer();
  const fire = PK.aFire({ strength: 2 });
  const kid = PK.aKid({ position: 4 }, fire);
  const game = PK.aGame();
  const kidView = PK.aKidView(kid.state(), document, selector, soundPlayer);
  const fireView = PK.aFireView(fire.state(), document, selector);
  const scoreView = PK.aScoreView(document, selector, soundPlayer);

  buttonListener.add(kid);
  tickerListener.add(fire);

  fire.addObserver(game);
  fire.addObserver(fireView);

  kid.addObserver(game);
  kid.addObserver(kidView);

  game.addObserver(fire);
  game.addObserver(kid);
  game.addObserver(fireView);
  game.addObserver(kidView);
  game.addObserver(scoreView);

  kidView.display();
  fireView.display();
  scoreView.display();

  document.addEventListener("keydown", (e) => buttonListener.notifyObservers(e));
  setInterval(function () {
    tickerListener.notifyObservers();
  }, 5000);
};
