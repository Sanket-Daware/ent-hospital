const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    treatment: {
        type: String,
        trim: true,
        default: ''
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    patientImageUrl: {
        type: String,
        default: ''
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    source: {
        type: String,
        enum: ['admin', 'patient'],
        default: 'admin'
    }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
