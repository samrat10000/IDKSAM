const mongoose = require('mongoose');

const visitCounterSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('VisitCounter', visitCounterSchema);
