window.start = function (selector) {
  const buttonListener = window.PK.aButtonListener();
  const fire = window.PK.aFire({ strength: 2 });
  const kid = window.PK.aKid({ position: 4 }, fire);
  const kidView = window.PK.aKidView(kid.state(), document, selector);
  const fireView = window.PK.aFireView(fire.state(), document, selector);

  buttonListener.add(kid);
  kid.addObserver(kidView);
  fire.addObserver(fireView);

  document.addEventListener("keydown", (e) => buttonListener.notifyObservers(e));
  kidView.display();
  fireView.display();
};
