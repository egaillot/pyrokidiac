const atPosition = function(initialPosition) {
  var currentPosition = initialPosition;

  const moveLeft = function () {
    if (currentPosition > 0) currentPosition -= 1;
  };

  const position = function () {
    return currentPosition;
  };

  return { moveLeft, position };
};

module.exports = { atPosition };
