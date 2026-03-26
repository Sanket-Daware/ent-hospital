const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create new appointment (pre-payment)
router.post('/', async (req, res) => {
    try {
        const { name, surname, contact, reason } = req.body;

        const newAppointment = new Appointment({
            name,
            surname,
            contact,
            reason,
            paymentStatus: 'pending'
        });

        await newAppointment.save();

        // Simulate Razorpay order creation
        const dummyOrderId = 'order_' + Math.random().toString(36).substr(2, 9);

        res.status(201).json({
            success: true,
            appointment: newAppointment,
            dummyOrderId
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Verify payment (simulated)
router.post('/verify-payment', async (req, res) => {
    try {
        const { appointmentId, paymentId } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        appointment.paymentStatus = 'success';
        appointment.paymentId = paymentId || 'pay_' + Math.random().toString(36).substr(2, 9);
        await appointment.save();

        res.json({ success: true, message: 'Payment verified and appointment confirmed' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
