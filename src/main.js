window.start = function (selector) {
  const buttonListener = window.PK.aButtonListener();
  const kid = window.PK.aKid({ position: 4 });
  const kidView = window.PK.aKidView(kid.state(), document, selector);
  const fireView = window.PK.aFireView({ strength: 2 }, document, selector);

  buttonListener.add(kid);
  kid.addObserver(kidView);

  document.addEventListener("keydown", (e) => buttonListener.notifyObservers(e));
  kidView.display();
  fireView.display();
};
