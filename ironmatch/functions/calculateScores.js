const calculateScores = function(playerArr, matches) {
  let scoreArr = [];
  for (let i = 0; i < playerArr.length; i++) {
    let playerScore = 0;
    for (let j = 0; j < matches.length; j++) {
      if (playerArr[i].toLowerCase() === matches[j].player1.name) {
        if (matches[j].player1.result === "win") {
          playerScore += 2;
        } else if (matches[j].player1.result === "draw") {
          playerScore += 1;
        }
      }
      if (playerArr[i].toLowerCase() === matches[j].player2.name) {
        if (matches[j].player2.result === "win") {
          playerScore += 2;
        } else if (matches[j].player2.result === "draw") {
          playerScore += 1;
        }
      }
    }
    scoreArr.push(playerScore);
  }
  return scoreArr;
};

module.exports = calculateScores;
