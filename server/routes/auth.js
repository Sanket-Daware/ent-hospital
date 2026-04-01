const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Initial seed function for first admin
const seedAdmin = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const newAdmin = new Admin({
                username: 'admin',
                password: 'admin123',
                role: 'Admin'
            });
            await newAdmin.save();
            console.log('Default admin account created: admin / admin123');
        }
    } catch (err) {
        console.error('Error seeding admin:', err.message);
    }
};

// Seed admin on first load
seedAdmin();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Create JWT
        const payload = {
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token,
                    user: { username: admin.username, role: admin.role }
                });
            }
        );

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
