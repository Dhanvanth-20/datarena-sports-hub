const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const auth = require('../middleware/auth');

// GET all matches for a sport
router.get('/:sport', async(req, res) => {
    try {
        const { sport } = req.params;
        const { year } = req.query;

        let query = { sport };
        if (year) {
            query.year = year;
        }

        const matches = await Match.find(query).sort({ date: -1 }).maxTimeMS(2000);
        res.json(matches);
    } catch (err) {
        console.error('Error fetching matches:', err);
        res.json([]);
    }
});

// POST create new match
router.post('/', auth, async(req, res) => {
    const match = new Match({
        sport: req.body.sport,
        date: req.body.date,
        captain: req.body.captain,
        opponent: req.body.opponent,
        winner: req.body.winner,
        position: req.body.position,
        tournament: req.body.tournament || 'Inter College Tournament',
        year: req.body.year || new Date().getFullYear().toString()
    });

    try {
        const newMatch = await match.save();
        res.status(201).json(newMatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update match
router.put('/:id', auth, async(req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ message: 'Match not found' });

        if (req.body.sport) match.sport = req.body.sport;
        if (req.body.date) match.date = req.body.date;
        if (req.body.captain) match.captain = req.body.captain;
        if (req.body.opponent) match.opponent = req.body.opponent;
        if (req.body.winner) match.winner = req.body.winner;
        if (req.body.position) match.position = req.body.position;
        if (req.body.tournament) match.tournament = req.body.tournament;
        if (req.body.year) match.year = req.body.year;

        const updatedMatch = await match.save();
        res.json(updatedMatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE match
router.delete('/:id', auth, async(req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ message: 'Match not found' });

        await match.deleteOne();
        res.json({ message: 'Match deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;