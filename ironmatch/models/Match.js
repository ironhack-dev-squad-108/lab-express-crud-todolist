const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  sport: {
    type: String,
    required: true
  },
  player1: {
    name: { type: String, required: true },
    score: { type: Number, default: 0 }
  },
  player2: {
    name: { type: String, required: true },
    score: { type: Number, default: 0 }
  },
  result: { type: String }
});

const Match = mongoose.model("Match", modelSchema);

module.exports = Match;
