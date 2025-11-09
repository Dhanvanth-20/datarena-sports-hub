const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rules: {
        type: String,
        default: ''
    },
    equipment: {
        type: String,
        default: ''
    },
    coach: {
        type: String,
        default: ''
    },
    captain: {
        type: String,
        default: ''
    },
    academicYears: {
        type: [String],
        default: ['2024-25']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sport', sportSchema);