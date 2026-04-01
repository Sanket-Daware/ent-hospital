const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const { storage, cloudinary } = require('../config/cloudinary');

// Configure multer for Cloudinary storage
const upload = multer({ 
    storage: storage('blogs')
    // Removed 1MB limit - using Cloudinary auto-compression instead
});

// Get all blogs with optional category filtering
router.get('/', async (req, res) => {
    try {
        const { category, publishedOnly } = req.query;
        let query = {};
        if (category && category !== 'All') {
            query.category = category;
        }
        if (publishedOnly === 'true') {
            query.isPublished = true;
        }
        
        const blogs = await Blog.find(query).sort({ publishedDate: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get single blog
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Create blog with Cloudinary image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, content, author, category, excerpt, isPublished } = req.body;
        
        let imageUrl = '';
        let cloudinaryPublicId = '';
        
        if (req.file) {
            imageUrl = req.file.path;
            cloudinaryPublicId = req.file.filename;
        }

        const newBlog = new Blog({ 
            title, 
            content, 
            author, 
            imageUrl, 
            cloudinaryPublicId,
            category,
            excerpt,
            isPublished: isPublished === 'false' ? false : true
        });

        await newBlog.save();
        res.status(201).json({ success: true, blog: newBlog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update blog with optional image replacement
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        const updateData = { ...req.body };
        
        if (req.file) {
            // Delete old image if it exists
            if (blog.cloudinaryPublicId) {
                await cloudinary.uploader.destroy(blog.cloudinaryPublicId);
            }
            updateData.imageUrl = req.file.path;
            updateData.cloudinaryPublicId = req.file.filename;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json({ success: true, blog: updatedBlog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete blog
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        // Delete from Cloudinary if public ID exists
        if (blog.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(blog.cloudinaryPublicId);
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
