const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  sport: String,
  player1: String,
  player2: String,
  score1: Number,
  score2: Number
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;