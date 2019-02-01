const express = require('express');
const router  = express.Router();
const Match = require('../models/Match.js');

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.query.search) {
    Match.find(
      {$or: [{ player1: { $eq: req.query.search } }, { player2: { $eq: req.query.search } }]}
    )
    .then(matches => {
      res.render("index", {matches: matches});
    })
    .catch(error => {
      console.log(error)
    });
  } else {
    Match.find()
    .then(matches => {
      res.render("index", {matches: matches});
    })
    .catch(error => {
      console.log(error)
    });
  }
});

// POST NEW MATCH
router.post('/', (req, res, next) => {
  const { player1, score1, score2, player2 } = req.body;
  const newMatch = new Match({ player1, score1, score2, player2});
  newMatch.save()
  .then(match => {
    res.redirect("/");
    console.log(matches);
  })
  .catch(error => {
    console.log(error)
  });
});

// DELETE MATCH
router.get('/delete/:id', (req, res, next) => {
  Match.remove({_id: req.params.id})
  .then(match => {
    res.redirect("/");
    console.log(matches);
  })
  .catch(error => {
    res.redirect("back");
    console.log(error);
  });
});

router.get('/ranking', (req, res, next) => {
  Match.find()
    .then(matches => {
      let winnerArr = [];
      matches.forEach((item) => {
        // EUQAL 
        if (item.score1 === item.score2){
          if (winnerArr.filter(obj => obj.name === item.player1).length === 0) {
            let newObj = {
              name: item.player1,
              score: 1
            };
            winnerArr.push(newObj)
           } else {
            winnerArr.filter(obj => obj.name === item.player1)[0].score += 1;
           }
          if (winnerArr.filter(obj => obj.name === item.player2).length === 0) {
          let newObj = {
            name: item.player2,
            score: 1
          };
          winnerArr.push(newObj)
          } else {
          winnerArr.filter(obj => obj.name === item.player2)[0].score += 1;
          }

        //PLAYER 1 won  
        } else if (item.score1 > item.score2) {

           if (winnerArr.filter(obj => obj.name === item.player1).length === 0) {
            let newObj = {
              name: item.player1,
              score: 2
            };
            winnerArr.push(newObj);
           } else {
            winnerArr.filter(obj => obj.name === item.player1)[0].score += 2;
           }

        // PLAYER 2 won
        } else {

          if (winnerArr.filter(obj => obj.name === item.player2).length === 0) {
            winnerArr.push(
              {"name": item.player2, "score": 2}
            );
          } else {
           winnerArr.filter(obj => obj.name === item.player2)[0].score += 2;
          }

        }
      }); // end of for Each
      winnerArr.sort((a,b) => {
        return b.score - a.score;
      });

      res.render("ranking", {winnerArr: winnerArr});
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
