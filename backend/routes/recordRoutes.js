const express = require('express');
const router = express.Router();
const Record = require('../models/recordModel'); 

// ✅ GET All Records (Sorted by Latest Entry)
router.get('/', async (req, res) => {
    try {
        const records = await Record.find({}).sort({ entryTime: -1 });
        console.log('🟢 All Records Fetched:', records);
        res.status(200).json(records);
    } catch (error) {
        console.error('🔴 Error fetching records:', error);
        res.status(500).json({ message: 'Error fetching records', error });
    }
});

// ✅ POST: Add New Record
// ✅ POST: Add New Record (Prevent Overwriting)
router.post('/entry', async (req, res) => {
    const { userId } = req.body;

    console.log('🟠 Received Entry Request for User ID:', userId);

    if (!userId) {
        console.error('🔴 Entry Error: User ID is required');
        return res.status(400).json({ message: 'User ID is required' });
    }

    // ❗️ Check if there's already an ongoing record without exitTime
    const existingRecord = await Record.findOne({
        userId,
        exitTime: { $exists: false }
    });

    if (existingRecord) {
        console.warn('🟡 Active entry record already exists for this user.');
        return res.status(400).json({ message: 'Active entry record already exists' });
    }

    const newRecord = new Record({
        userId: userId,
        entryTime: Date.now()
    });

    try {
        const savedRecord = await newRecord.save();
        console.log('🟢 Entry Recorded Successfully:', savedRecord);
        res.status(201).json({ message: 'Entry recorded successfully', savedRecord });
    } catch (error) {
        console.error('🔴 Error saving entry:', error);
        res.status(500).json({ message: 'Error saving entry', error });
    }
});

// ✅ POST Exit Record
// ✅ POST Exit Record
router.post('/exit', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // ✅ Latest Entry Record ko Dhoondho
        const existingRecord = await Record.findOne({ userId }).sort({ entryTime: -1 });

        if (!existingRecord) {
            return res.status(404).json({ message: 'No entry record found for this user' });
        }

        // ✅ Exit Time Already Present Hai Toh Update Nahi Karna
        if (existingRecord.exitTime) {
            return res.status(400).json({ message: 'Exit already recorded for this entry' });
        }

        // ✅ Exit Time Add Karna
        existingRecord.exitTime = new Date();

        // ✅ Save Updated Record
        const updatedRecord = await existingRecord.save();
        console.log('✅ Exit Recorded:', updatedRecord);

        res.status(200).json({ message: 'Exit recorded successfully', updatedRecord });
    } catch (error) {
        console.error('❌ Error saving exit record:', error);
        res.status(500).json({ message: 'Error recording exit', error });
    }
});

// ✅ Export Router
module.exports = router;
