const getPlayers = function(matches) {
  let playerArr = [];
  for (let i = 0; i < matches.length; i++) {
    if (!playerArr.includes(matches[i].player1.name.charAt(0).toUpperCase() +
    matches[i].player1.name.slice(1))) {
      playerArr.push(
        matches[i].player1.name.charAt(0).toUpperCase() +
          matches[i].player1.name.slice(1)
      );
    }
  }
  for (let i = 0; i < matches.length; i++) {
    if (!playerArr.includes(matches[i].player2.name.charAt(0).toUpperCase() +
    matches[i].player2.name.slice(1))) {
      playerArr.push(
        matches[i].player2.name.charAt(0).toUpperCase() +
          matches[i].player2.name.slice(1)
      );
    }
  }
  // console.log(playerArr);
  return playerArr;
};

module.exports = getPlayers;
