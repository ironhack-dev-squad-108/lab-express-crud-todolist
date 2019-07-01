const mongoose = require("mongoose");
const Disciplines = require("../enums/Disciplines");

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  sport: {
    type: String,
    required: true,
    enum: Disciplines.map(discipline => discipline.value)
  },
  player1: {
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    result: { type: String, enum: ["win", "draw", "loose"], default: "draw" }
  },
  player2: {
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    result: { type: String, enum: ["win", "draw", "loose"], default: "draw" }
  },
  result: { type: String }
});

const Match = mongoose.model("Match", modelSchema);

module.exports = Match;
