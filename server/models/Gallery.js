const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    mediaUrl: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    },
    cloudinaryPublicId: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['Facilities', 'Equipment', 'Staff', 'Events', 'Procedures', 'Before & After', 'General'],
        default: 'General'
    },
    displayOrder: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
