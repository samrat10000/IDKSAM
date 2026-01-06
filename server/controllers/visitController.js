import VisitCounter from '../models/VisitCounter.js';

export const getVisits = async (req, res) => {
    try {
        let counter = await VisitCounter.findOne();
        if (!counter) counter = await VisitCounter.create({ count: 0 });
        res.json({ count: counter.count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const incrementVisits = async (req, res) => {
    try {
        let counter = await VisitCounter.findOne();
        if (!counter) {
            counter = await VisitCounter.create({ count: 1 });
        } else {
            counter.count += 1;
            counter.lastUpdated = new Date();
            await counter.save();
        }
        res.json({ count: counter.count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
