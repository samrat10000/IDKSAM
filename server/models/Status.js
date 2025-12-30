const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    mood: { type: String, default: '' },
    current_work: { type: String, default: '' },
    listening: { type: String, default: '' },
    thinking_about: { type: String, default: '' },
    note: { type: String, default: '' },
    last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Status', statusSchema);
