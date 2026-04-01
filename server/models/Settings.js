const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    closedDates: [{
        date: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            default: 'Closed'
        }
    }],
    shopStatus: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
