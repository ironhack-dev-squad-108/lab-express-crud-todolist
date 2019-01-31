const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

function capitalize (val) {
    if (typeof val !== 'string') {
        val = '';
    }
    return val.charAt(0).toUpperCase() + val.substring(1);
  }

const matchSchema = new Schema({
    player1: {
        type: String,
        set: capitalize
    },
    player2: {
        type: String,
        set: capitalize
    },
    score1: Number,
    score2: Number
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;