const express = require("express");
const router = express.Router();
const Match = require("../models/Match.js");

/* GET home page */
router.get("/", (req, res, next) => {
  let filter = {}
  if (req.query.player) {
    filter = {
      $or: [{ player1: req.query.player }, { player2: req.query.player }]
    }
  }
  Match.find(filter)
    .then(matches => {
      res.render("index", {matches})
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/match/add", (req, res, next) => {
  const { sport, player1, score1, score2, player2 } = req.body;
  const newMatch = new Match({ sport, player1, score1, score2, player2 });
  newMatch
    .save()
    .then(match => {
      console.log("Match added");
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/match/delete/:id", (req, res, next) => {
  Match.findByIdAndDelete(req.params.id)
    .then(match => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/ranking", (req, res, next) => {
  Match.find()
    .then(matches => {
      let players = []
      let ranking = [];
      Object.keys(matches).forEach((i)=>{
        let score1 = 0;
        let score2 = 0;
        if (matches[i].score1-matches[i].score2 > 0) {
          score1 += 2
        } else if (matches[i].score1-matches[i].score2 === 0) {
          score1 +=1
          score2 +=1
        } else { 
          score2 +=2
        }
        players.push({name: matches[i].player1, score: score1})
        players.push({name: matches[i].player2, score: score2})
      })
      let unique = [...new Set(players.map(player => player.name))].sort()
      for (let i=0; i<unique.length; i++){
        let score = 0;
        Object.keys(players).forEach((player)=>{
          if (players[player].name === unique[i]) score += players[player].score
        })
        ranking.push({name: unique[i], score: score})
      }
      return ranking;
    })
    .then(ranking => {
      res.render("ranking", {ranking})
    })
    .catch(error => {
      console.log(error);
    });
})
module.exports = router;
