const sortByScore = function(ranking) {
  return ranking.sort((a, b) => b.score - a.score);
};

module.exports = sortByScore