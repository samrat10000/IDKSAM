import GuestbookEntry from '../models/GuestbookEntry.js';

// Public Routes
export const getApprovedEntries = async (req, res) => {
    try {
        const entries = await GuestbookEntry.find({ approved: true }).sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createEntry = async (req, res) => {
    try {
        const entry = await GuestbookEntry.create({
            name: req.body.name,
            message: req.body.message,
            website: req.body.website || '',
            stamp: req.body.stamp,
            approved: false
        });
        res.status(201).json({ success: true, message: 'Submitted for approval!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin Routes
export const getAllEntries = async (req, res) => {
    try {
        const entries = await GuestbookEntry.find().sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const approveEntry = async (req, res) => {
    try {
        const entry = await GuestbookEntry.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteEntry = async (req, res) => {
    try {
        await GuestbookEntry.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
