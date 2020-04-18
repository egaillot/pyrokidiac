window.start = function (selector) {
  const buttonListener = window.PK.aButtonListener();
  const kid = window.PK.kidAtPosition(4);
  const kidView = window.PK.aKidView({position: 4}, document, selector);
  const fireView = window.PK.aFireView({ strength: 2 }, document, selector);

  buttonListener.add(kid);
  kid.addObserver(kidView);

  document.addEventListener("keydown", (e) => buttonListener.notifyObservers(e));
  kidView.display();
  fireView.display();
};
