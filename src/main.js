window.start = function (selector) {
  const kid = window.PK.kidAtPosition(5);
  const kidView = window.PK.aKidView(kid, document, selector);
  kidView.display();
};
