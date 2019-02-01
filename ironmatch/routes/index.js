const express = require("express");
const Match = require("../models/Match.js");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("TCL: req.query.search", req.query.search);
  if (req.query.search) {
    Match.find({
      $or: [{ player1: { $eq: req.query.search } }, { player2: { $eq: req.query.search } }]
    })
      .then(docs => {
        res.render("index", {
          matches: docs
        });
      })
      .catch(console.log);
  }
  Match.find()
    .then(docs => {
      res.render("index", {
        matches: docs
      });
    })
    .catch(console.log);
});

// add new match to database
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

// delete match
router.get("/delete/:id", (req, res) => {
  Match.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch(console.log);
});

router.get("/ranking", (req, res) => {
  Match.find()
    .then(docs => {
      let ranking = {};
      for (let i = 0; i < docs.length; i++) {
        if (!ranking.hasOwnProperty(docs[i].player1)) {
          ranking[docs[i].player1] = 0;
        }
        if (!ranking.hasOwnProperty(docs[i].player2)) {
          ranking[docs[i].player2] = 0;
        }
        if (docs[i].score1 > docs[i].score2) {
          ranking[docs[i].player1] += 2;
        } else if (docs[i].score1 < docs[i].score2) {
          ranking[docs[i].player2] += 2;
        } else {
          ranking[docs[i].player1] += 1;
          ranking[docs[i].player2] += 1;
        }
      }
      // res.send(ranking);
      let keys = Object.keys(ranking);
      let values = Object.values(ranking);
      let arr = [];
      for (let i = 0; i < keys.length; i++) {
        arr.push([keys[i], values[i]]);
      }
      arr.sort((a, b) => b[1] - a[1]);
      // res.send(arr);
      res.render("ranking", {
        ranking: arr
      });
    })
    .catch(console.log);
});

module.exports = router;
