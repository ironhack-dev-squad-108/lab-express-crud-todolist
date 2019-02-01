const express = require('express');
const router  = express.Router();
const Match = require('../models/Match.js');

/* GET home page */
router.get('/', (req,res,next) => {
  let filter = {}
  if (req.query.player) {
    filter = {
      $or: [{ player1: req.query.player }, { player2: req.query.player }]
    }
  }

  Match.find(filter)
  .then((matches) => {
    res.render('index', {results: matches})
  })
  .catch(error => {
    console.log(error);
  })
});

router.post('/', (req,res,next) => {
  const { sport, player1, score1, score2, player2 } = req.body
  const newMatch = new Match({ sport, player1, score1, score2, player2 })
  newMatch.save()
  .then((match) => {
    res.redirect('/')
  })
})

router.get('/delete/:id', (req,res,next) => {
  Match.findByIdAndDelete(req.params.id)
  .then((match) => {
    res.redirect('/')
  })
})

router.get('/ranking', (req,res) => {
  Match.find()
    .then(matches => {
      // Take all the names of the players and remove duplicates
      let playerNames =
        [...matches.map(match => match.player1), ...matches.map(match => match.player2)]
          .filter((value, index, self) => self.indexOf(value) === index)
      let players = playerNames.map(name => ({
        name: name,
        score: 0,
        nbOfMatches: 0,
      }))
      for (let i = 0; i < matches.length; i++) {
        let indexOfPlayer1 = players.findIndex(player => player.name === matches[i].player1)
        let indexOfPlayer2 = players.findIndex(player => player.name === matches[i].player2)
        
        // If player1 won
        if (matches[i].score1 > matches[i].score2) {
          players[indexOfPlayer1].score += 2
        }
        else if (matches[i].score1 < matches[i].score2) {
          players[indexOfPlayer2].score += 2
        }
        else {
          players[indexOfPlayer1].score ++
          players[indexOfPlayer2].score ++
        }
        players[indexOfPlayer1].nbOfMatches++
        players[indexOfPlayer2].nbOfMatches++
      }
      players.sort((a,b)=> b.score - a.score)
      res.render('ranking', { players })
    })
})


module.exports = router;
