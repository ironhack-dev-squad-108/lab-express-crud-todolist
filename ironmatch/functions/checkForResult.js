const checkForResult = function(scoreA, scoreB) {
  if (scoreA === scoreB) {
    return "draw";
  } else {
    return scoreA > scoreB ? "win" : "loose";
  }
};

module.exports = checkForResult;
