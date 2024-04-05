const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    type: String,
    result: String,
    score1: String,
    score2: String,
    playerScore: String,
    playerGoals: String
});

const playerSchema = new Schema({
    name: String,
    skillGroup: {
        String,
        enum: ['SSL', 'GC', 'C', 'D', 'P', 'G', 'S', 'B']
    },
    matchType: {
        String,
        enum: ['1v1', '2v2', '3v3']
    },
    matches: [matchSchema]
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
