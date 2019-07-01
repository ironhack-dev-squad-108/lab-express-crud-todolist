const buildRanking = function(playerArr, scoreArr) {
  let ranking = [];
  for (let i = 0; i < playerArr.length; i++) {
    ranking.push({ name: playerArr[i], score: scoreArr[i] });
  }
  // console.log(ranking)
  return ranking;
};

module.exports = buildRanking;
