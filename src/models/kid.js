const atPosition = function(initialPosition) {
  const position = function () {
    return initialPosition;
  }

  return { position };
};

module.exports = { atPosition };
