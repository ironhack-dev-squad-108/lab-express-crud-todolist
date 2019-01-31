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
  const { player1, score1, score2, player2 } = req.body;
  const newMatch = new Match({ player1, score1, score2, player2 });
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

module.exports = router;
