const express = require('express');
const router = express.Router();
const Match = require("../models/Match")

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.query.search != undefined) {
    Match.find({
        $or: [{
          player1: req.query.search
        }, {
          player2: req.query.search
        }]
      })
      .then(data => res.render('index', {
        matches: data
      }))
      .catch((err) => console.log("An error has occured: " + err))
  } else {
    Match.find()
      .then(data => res.render('index', {
        matches: data
      }))
      .catch((err) => console.log("An error has occured: " + err))
  }
});

router.get('/delete/:id', (req, res, next) => {
  Match.deleteOne({
      "_id": req.params.id
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log("An error has occured: " + err))
})

router.get('/ranking', (req, res, next) => {
  Match.find()
    .then(data => {
      let players = [];
      let scores = [];
      for (var i of data) {
        players.push(i.player1);
        players.push(i.player2);
        scores.push(i.score1);
        scores.push(i.score2)
      }
      let results = scores.map((v) => {
        if (v === 0) {
          return "Lose"
        } else if (v === 1) {
          return "Draw"
        } else {
          return "Win"
        }
      })
      let playersScores = []
      for (let i = 0; i<players.length; i++) {
        var temp = {
          player: players[i],
          score: scores[i],
          result: results[i],
        }
        playersScores.push(temp)
      }
      playersScores = playersScores.sort((a,b) => b.score - a.score);
      res.render('ranking', { playersScores })
    })
    .catch((err) => console.log("An error has occured: " + err))
})

router.post("/addmatch", (req, res, next) => {
  const {
    sport,
    player1,
    player2,
    score1,
    score2
  } = req.body
  const newMatch = new Match({
    sport,
    player1,
    player2,
    score1,
    score2
  })
  newMatch.save()
    .then(() => res.redirect("/"))
    .catch((err) => res.send("An error has occured: " + err))
})

module.exports = router;