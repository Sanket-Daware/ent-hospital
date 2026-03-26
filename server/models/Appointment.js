const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    contact: { type: String, required: true },
    reason: { type: String, required: true },
    paymentId: { type: String }, // dummy Razorpay ID
    paymentStatus: { type: String, default: 'pending' }, // 'pending', 'success'
    amount: { type: Number, default: 500 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
