const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const multer = require('multer');
const { storage, cloudinary } = require('../config/cloudinary');

// Configure multer for Cloudinary storage
const upload = multer({ 
    storage: storage('gallery')
    // Removed 1MB limit - using Cloudinary auto-compression instead
});

// Get all gallery items with optional category filtering
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== 'All') {
            query.category = category;
        }
        
        const items = await Gallery.find(query).sort({ displayOrder: 1, createdAt: -1 });
        res.json({ success: true, items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Upload new gallery item to Cloudinary
router.post('/', upload.single('media'), async (req, res) => {
    try {
        const { title, description, mediaType, category, displayOrder } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const newItem = new Gallery({
            title,
            description,
            mediaUrl: req.file.path,
            cloudinaryPublicId: req.file.filename,
            mediaType: mediaType || (req.file.mimetype.startsWith('video') ? 'video' : 'image'),
            category: category || 'General',
            displayOrder: displayOrder || 0
        });

        await newItem.save();
        res.status(201).json({ success: true, item: newItem });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update gallery item
router.put('/:id', async (req, res) => {
    try {
        const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete gallery item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

        // Delete from Cloudinary if public ID exists
        if (item.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(item.cloudinaryPublicId);
        }

        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
