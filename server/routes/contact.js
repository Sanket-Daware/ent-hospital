const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

// Create new contact inquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Inquiry received successfully'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get all contact inquiries (Admin only)
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, messages });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Mark inquiry as read/resolved (Admin only)
router.patch('/:id/read', auth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            { read: true }, 
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        res.json({ success: true, contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete inquiry (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        res.json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
