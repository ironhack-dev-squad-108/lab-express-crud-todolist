const express = require("express");
const Match = require("../models/Match.js");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  Match.find()
    .then(docs => {
      res.render("index", {
        matches: docs
      });
    })
    .catch(console.log);
});

router.post("/", (req, res, next) => {
  console.log("TCL: req.body", req.body);
  const { player1, score1, score2, player2 } = req.body;
  const newMatch = new Match({ player1, score1, score2, player2 });
  newMatch
    .save()
    .then(match => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
});

router.get("/:id", (req, res) => {
  Match.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch(console.log);
});

module.exports = router;
