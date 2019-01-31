const express = require("express");
const router = express.Router();

const Match = require("../models/Match.js");

/* GET home page */
router.get("/", (req, res, next) => {
  Match.find()
    .then(matches => {
      res.render("index", {
        matches
      });
      console.log(matches);
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/add-match", (req, res, next) => {
  const { sport, player1, player2, score1, score2 } = req.body;
  console.log(req.body);

  const newMatch = new Match({
    sport,
    player1,
    player2,
    score1,
    score2
  });
  newMatch
    .save()
    .then(match => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
      res.redirect("/");
    });
});

router.get("/delete/:id", (req, res) => {
  Match.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch(err => {
      console.log("An error happened", err);
      res.render("error");
    });
});

router.get("/ranking", (req, res) => {
  Match.find()
    .then(matches => {
      let ranking = [];
      matches.forEach(match => {
        if (ranking.map(x => x[0]).indexOf(match.player1) === -1) {
          ranking.push([match.player1, 0]);
        }
        if (ranking.map(x => x[0]).indexOf(match.player2) === -1) {
          ranking.push([match.player2, 0]);
        }
        if (match.score1 > match.score2) {
          ranking = ranking.map(player => {
            if (player[0] === match.player1) {
              return [player[0], player[1] + 2];
            } else {
              return player;
            }
          });
        } else if (match.score1 < match.score2) {
          ranking = ranking.map(player => {
            if (player[0] === match.player2) {
              return [player[0], player[1] + 2];
            } else {
              return player;
            }
          });
        } else {
          ranking = ranking.map(player => {
            if (player[0] === match.player2 || player[0] === match.player1) {
              return [player[0], player[1] + 1];
            } else {
              return player;
            }
          });
        }
      });
      ranking=ranking.sort((a,b)=>b[1]-a[1])
      res.render('ranking',{ranking:ranking})
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
