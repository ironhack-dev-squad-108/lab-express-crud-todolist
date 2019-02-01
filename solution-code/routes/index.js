const express = require('express');
const Match = require('../models/Match')
const router = express.Router();

router.get('/', (req, res, next) => {
  let filter = {}
  let playerSearched = req.query.player || '' // playerSearched is always a string, that is empty if req.query.player is undefined
  playerSearched = playerSearched.trim('')
  if (playerSearched) {
    filter = {
      $or: [{
        player1: playerSearched
      }, {
        player2: playerSearched
      }]
    }
  }
  Match.find(filter)
    .then(matches => {
      res.render('index', {
        matches,
        playerSearched
      })
    })
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const { sport, player1, player2, score1, score2 } = req.body
  Match.create({ sport, player1, player2, score1, score2 })
    .then(match => {
      res.redirect('/')
    })
    .catch(err => next(err))
})

router.get('/matches/:matchId/delete', (req, res) => {
  Match.findByIdAndDelete(req.params.matchId)
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

router.get('/ranking', (req, res) => {
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
