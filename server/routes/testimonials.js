const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// Get testimonials — public gets only approved, admin gets all
router.get('/', async (req, res) => {
    try {
        const { approvedOnly } = req.query;
        const filter = approvedOnly === 'true' ? { isApproved: true } : {};
        const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, testimonials });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Public: Patient submits a review (pending approval)
router.post('/submit', async (req, res) => {
    try {
        const { patientName, rating, content } = req.body;
        if (!patientName || !rating || !content) {
            return res.status(400).json({ success: false, message: 'Name, rating, and review are required.' });
        }
        const newTestimonial = new Testimonial({
            patientName,
            rating: Number(rating),
            content,
            isApproved: false,
            source: 'patient'
        });
        await newTestimonial.save();
        res.status(201).json({ success: true, message: 'Review submitted! It will appear after admin approval.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Admin: Create testimonial (auto-approved)
router.post('/', auth, async (req, res) => {
    try {
        const { patientName, treatment, rating, content, patientImageUrl } = req.body;
        const newTestimonial = new Testimonial({
            patientName,
            treatment,
            rating,
            content,
            patientImageUrl,
            isApproved: true,   // Admin-created are auto-approved
            source: 'admin'
        });
        await newTestimonial.save();
        res.status(201).json({ success: true, testimonial: newTestimonial });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Admin: Approve a testimonial
router.patch('/:id/approve', auth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
        res.json({ success: true, testimonial });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Admin: Reject a testimonial (unapprove)
router.patch('/:id/reject', auth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { isApproved: false },
            { new: true }
        );
        if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
        res.json({ success: true, testimonial });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Admin: Update testimonial
router.put('/:id', auth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
        res.json({ success: true, testimonial });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Admin: Delete testimonial
router.delete('/:id', auth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
        res.json({ success: true, message: 'Testimonial deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
