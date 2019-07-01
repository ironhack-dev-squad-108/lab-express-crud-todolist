const express = require("express");
const router = express.Router();

const Match = require("../models/Match");

const checkForResult = require("../functions/checkForResult");
const getPlayers = require("../functions/getPlayers");
const calculateScores = require("../functions/calculateScores");
const buildRanking = require("../functions/buildRanking");
const sortByScore = require("../functions/sortByScore");

const Disciplines = require("../enums/Disciplines");

/* GET home page */
router.get("/", (req, res, next) => {
  let filter = req.query.filterByName;
  if (filter) {
    Match.find({
      $or: [
        { "player1.name": { $regex: new RegExp("^" + filter + "$", "i") } },
        { "player2.name": { $regex: new RegExp("^" + filter + "$", "i") } }
      ]
    }).then(matches => {
      // console.info(matches);
      res.render("index", {
        matches: matches,
        disciplines: Disciplines
      });
    });
  } else {
    Match.find({}).then(matches => {
      // console.log(matches);
      res.render("index", {
        matches: matches,
        discipline: Disciplines
      });
    });
  }
});

router.post("/add-match", (req, res, next) => {
  let sport = req.body.sport;
  let player1 = req.body.player1.toLowerCase();
  let player2 = req.body.player2.toLowerCase();
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
    console.table(match);
    Match.updateOne(
      { _id: match._id },
      {
        result: match.player1.score + " : " + match.player2.score,
        "player1.result": checkForResult(
          match.player1.score,
          match.player2.score
        ),
        "player2.result": checkForResult(
          match.player2.score,
          match.player1.score
        )
      }
    ).then(updatedMatch => {
      // console.log(updatedMatch);
      res.redirect("/");
    });
  });
});

router.get("/ranking", (req, res, next) => {
  Match.find({}).then(matches => {
    let ranking = sortByScore(
      buildRanking(
        getPlayers(matches),
        calculateScores(getPlayers(matches), matches)
      )
    );
    res
      .render("ranking", {
        ranking: ranking
      })
      .then({});
  });
});

// Delete Matches

router.get("/delete-match/:matchId", (req, res, next) => {
  let matchId = req.params.matchId;
  
  Match.findById(matchId).then(match => {
    console.log('TO DELETE:' ,match)
    res.render("delete-match", { match: match });
  });
});

router.post("/delete-match/:matchId", (req, res, next) => {
  let matchId = req.params.matchId;
  Match.findByIdAndDelete(matchId)
      .then(match => {
        console.log('TO DELETE:' ,match)
        res.redirect("/");
      })
      .catch(err => {
        console.log("ERR:  POST: /match-delete: ", err);
      });
  });

module.exports = router;
