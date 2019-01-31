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
  Match.deleteOne({"_id": req.params.id})
  .then(() => res.redirect("/"))
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