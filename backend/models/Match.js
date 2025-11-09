const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    sport: {
        type: String,
        required: true,
        enum: ['cricket', 'kabaddi', 'basketball', 'throwball', 'football', 'badminton']
    },
    date: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        required: true
    },
    opponent: {
        type: String,
        required: true
    },
    winner: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    tournament: {
        type: String,
        required: true,
        default: 'Inter College Tournament'
    },
    year: {
        type: String,
        required: true,
        default: new Date().getFullYear().toString()
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Match', matchSchema);