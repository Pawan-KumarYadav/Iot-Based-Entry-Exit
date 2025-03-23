const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ User Entry Route
router.post('/entry', async (req, res) => {
    const { userId } = req.body;
    try {
        const newUser = new User({ userId });
        await newUser.save();
        res.status(201).json({ message: 'User Entry Recorded ✅', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error Recording Entry ❌', error });
    }
});

// ✅ User Exit Route
router.post('/exit', async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found ❌' });
        }
        user.exitTime = new Date();
        await user.save();
        res.status(200).json({ message: 'User Exit Recorded ✅', user });
    } catch (error) {
        res.status(500).json({ message: 'Error Recording Exit ❌', error });
    }
});

module.exports = router;
