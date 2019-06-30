const express = require("express");
const router = express.Router();

const Match = require("../models/Match");

/* GET home page */
router.get("/", (req, res, next) => {
  let filter = req.query.filterByName;
  if (filter) {
    Match.find({
      $or: [{ "player1.name": filter }, { "player2.name": filter }]
    }).then(matches => {
      console.log(matches);
      res.render("index", {
        matches: matches
      });
    });
  } else {
    Match.find({}).then(matches => {
      console.log(matches);
      res.render("index", {
        matches: matches
      });
    });
  }
});

module.exports = router;

router.post("/add-match", (req, res, next) => {
  let sport = req.body.sport;
  let player1 = req.body.player1;
  let player2 = req.body.player2;
  let scorePlayer1 = req.body.scorePlayer1;
  let scorePlayer2 = req.body.scorePlayer2;
  Match.create({
    sport: sport,
    player1: {
      name: player1,
      score: scorePlayer1
    },
    player2: {
      name: player2,
      score: scorePlayer2
    }
  }).then(match => {
    console.log(match);
    Match.updateOne(
      { _id: match._id },
      { result: match.player1.score + " : " + match.player2.score }
    ).then(updatedMatch => {
      console.log(updatedMatch);
      res.redirect("/");
    });
  });
});
