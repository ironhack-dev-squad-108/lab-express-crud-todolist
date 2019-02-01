const mongoose = require('mongoose'); // Don't forget to type $ npm install mongoose
const Schema   = mongoose.Schema;

const matchSchema = new Schema({
  sport : String,
  player1: String,
  player2: String,
  score1: Number,
  score2: Number,
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;