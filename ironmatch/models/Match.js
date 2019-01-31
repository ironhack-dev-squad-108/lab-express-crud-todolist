const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    sport: String,
    player1: String,
    player2: String,
    score1: Number,
    score2: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
