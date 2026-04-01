const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// Helper to generate slots
const getAvailableSlotsForDay = (dateStr) => {
    const day = new Date(dateStr).getDay();
    if (day === 0) return []; // Sunday Closed

    // Based on user image: 11am-4pm and 7-9pm. 
    return [
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'
    ];
};

// Get available slots for a date
router.get('/available-slots', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ success: false, message: 'Date is required' });

        // Check if date is blocked in settings
        const settings = await Settings.findOne();
        const isBlocked = settings?.closedDates?.some(d => 
            new Date(d.date).toISOString().split('T')[0] === date
        );

        if (isBlocked) {
            return res.json({ success: true, slots: [], message: 'Hospital is closed on this date' });
        }

        const allSlots = getAvailableSlotsForDay(date);
        
        // Find booked appointments for this date (excluding cancelled)
        const bookedAppointments = await Appointment.find({
            appointmentDate: new Date(date),
            status: { $ne: 'cancelled' }
        });

        const bookedSlots = bookedAppointments.map(a => a.timeSlot);
        let availableSlots = allSlots.filter(s => !bookedSlots.includes(s));

        // Filter out past time slots if booking is for today
        const today = new Date();
        const selectedDateStr = new Date(date).toDateString();
        
        if (today.toDateString() === selectedDateStr) {
            availableSlots = availableSlots.filter(slot => {
                const [time, modifier] = slot.split(' ');
                let [hours, minutes] = time.split(':').map(Number);
                
                if (modifier === 'PM' && hours < 12) hours += 12;
                if (modifier === 'AM' && hours === 12) hours = 0;
                
                const slotTime = new Date(today);
                slotTime.setHours(hours, minutes, 0, 0);
                
                // Add a small buffer (e.g., 30 mins) or just compare with current time
                // Using current time for strictness
                return slotTime > today;
            });
        }

        res.json({ success: true, slots: availableSlots });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get all appointments (Admin only)
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ appointmentDate: -1, timeSlot: 1 });
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Create new appointment (Public)
router.post('/', async (req, res) => {
    try {
        const { name, surname, contact, reason, appointmentDate, timeSlot } = req.body;

        if (!appointmentDate || !timeSlot) {
            return res.status(400).json({ success: false, message: 'Date and time slot are required' });
        }

        // Check if slot is already booked (Security/Race condition check)
        const existing = await Appointment.findOne({
            appointmentDate: new Date(appointmentDate),
            timeSlot,
            status: { $ne: 'cancelled' }
        });

        if (existing) {
            return res.status(400).json({ success: false, message: 'This slot has just been booked. Please choose another time.' });
        }

        const newAppointment = new Appointment({
            name,
            surname,
            contact,
            reason,
            appointmentDate: new Date(appointmentDate),
            timeSlot,
            status: 'pending'
        });

        await newAppointment.save();

        res.status(201).json({
            success: true,
            appointment: newAppointment
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update appointment status (Admin only)
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.json({ success: true, appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete appointment (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        res.json({ success: true, message: 'Appointment record deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
