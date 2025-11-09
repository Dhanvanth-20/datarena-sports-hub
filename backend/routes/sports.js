const express = require('express');
const router = express.Router();
const Sport = require('../models/Sport');
const auth = require('../middleware/auth');

// GET all sports
router.get('/', async(req, res) => {
    try {
        // Return empty array if MongoDB is not available
        const sports = await Sport.find().maxTimeMS(2000);
        res.json(sports);
    } catch (err) {
        console.error('Error fetching sports:', err);
        // Return empty array instead of error for frontend compatibility
        res.json([]);
    }
});

// GET single sport by ID
router.get('/:id', async(req, res) => {
    try {
        const sport = await Sport.findById(req.params.id);
        if (!sport) return res.status(404).json({ message: 'Sport not found' });
        res.json(sport);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create new sport
router.post('/', auth, async(req, res) => {
    const sport = new Sport({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        rules: req.body.rules,
        equipment: req.body.equipment,
        coach: req.body.coach,
        captain: req.body.captain,
        academicYears: req.body.academicYears
    });

    try {
        const newSport = await sport.save();
        res.status(201).json(newSport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update sport
router.put('/:id', auth, async(req, res) => {
    try {
        const sport = await Sport.findById(req.params.id);
        if (!sport) return res.status(404).json({ message: 'Sport not found' });

        if (req.body.name) sport.name = req.body.name;
        if (req.body.description) sport.description = req.body.description;
        if (req.body.image) sport.image = req.body.image;
        if (req.body.rules) sport.rules = req.body.rules;
        if (req.body.equipment) sport.equipment = req.body.equipment;
        if (req.body.coach !== undefined) sport.coach = req.body.coach;
        if (req.body.captain !== undefined) sport.captain = req.body.captain;
        if (req.body.academicYears) sport.academicYears = req.body.academicYears;

        const updatedSport = await sport.save();
        res.json(updatedSport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE sport
router.delete('/:id', auth, async(req, res) => {
    try {
        const sport = await Sport.findById(req.params.id);
        if (!sport) return res.status(404).json({ message: 'Sport not found' });

        await sport.deleteOne();
        res.json({ message: 'Sport deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;