window.start = function (selector) {
  const buttonListener = window.PK.aButtonListener();
  const kid = window.PK.kidAtPosition(5);
  const kidView = window.PK.aKidView({position: 5}, document, selector);

  buttonListener.add(kid);
  kid.addObserver(kidView);

  document.addEventListener("keydown", (e) => buttonListener.notifyObservers(e));
  kidView.display();
};
