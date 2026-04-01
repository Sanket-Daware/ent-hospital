const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Admin'
    },
    imageUrl: {
        type: String,
        default: ''
    },
    cloudinaryPublicId: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['Ear', 'Nose & Sinus', 'Throat & Voice', 'Head & Neck', 'Pediatric ENT', 'Sleep & Snoring', 'General'],
        default: 'General'
    },
    excerpt: {
        type: String,
        default: ''
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
