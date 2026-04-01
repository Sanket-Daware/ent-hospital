const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get all settings (admins should only have one global settings record)
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({ closedDates: [], shopStatus: 'Open' });
            await settings.save();
        }
        res.json({ success: true, settings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update closed dates
router.post('/closed-dates', async (req, res) => {
    try {
        const { date, reason } = req.body;
        let settings = await Settings.findOne();
        if (!settings) settings = new Settings();
        
        settings.closedDates.push({ date: new Date(date), reason });
        await settings.save();
        res.json({ success: true, settings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Remove a closed date
router.delete('/closed-dates/:id', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (settings) {
            settings.closedDates = settings.closedDates.filter(d => d._id.toString() !== req.params.id);
            await settings.save();
        }
        res.json({ success: true, settings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
