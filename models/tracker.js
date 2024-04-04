const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    type: String, // 1v1, 2v2, 3v3
    result: String,
    details: String // You can add more details here
});

const playerSchema = new Schema({
    name: String,
    skillGroup: {
        String,
        enum: ['SSL', 'GC', 'C', 'D', 'P', 'G', 'S', 'B']
    },
    ranks: {
        oneVsOne: String,
        twoVsTwo: String,
        threeVsThree: String
    },
    matches: [matchSchema]
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
