const express = require('express');
const router  = express.Router();

const Match = require('../models/Match.js')
/* GET home page */
router.get('/', (req, res, next) => {
  Match.find()
  .then((matches) => {
    res.render('index', {
      results: matches
    })
  })
});

router.post('/', (req,res,next) => {
  const { player1, score1, score2, player2 } = req.body
  const newMatch = new Match({ player1, score1, score2, player2 })
  newMatch.save()
  .then((match) => {
    res.redirect('/')
  })
})
router.get('/delete/:id', (req,res,next) => {
  Match.findByIdAndDelete(req.params.id)
  .then((match) => {
    res.redirect('/')
  })
})

module.exports = router;