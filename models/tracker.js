const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchesSchema = new mongoose.Schema({
    result: {
        type: String,
        enum: ['Win', 'Loss'],
        default: 'Win'
    },
    score1: { 
        type: Number,
        min: 0,
        max: 25,
    },
    score2: { 
        type: Number,
        min: 0,
        max: 25,
    },
    playerScore: {
        type: Number,
        min: 0,
        max: 2500,
    },
    playerGoals: {
        type: Number,
        min: 0,
        max: 25,
    },
    
});

const playerSchema = new mongoose.Schema({
    name: String,
    skillGroup: {
        type: String,
        enum: ['SSL', 'GC', 'C', 'D', 'P', 'G', 'S', 'B'],
    },
    matches: [matchesSchema],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});



module.exports = mongoose.model('Player', playerSchema);
