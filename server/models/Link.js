const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, default: 'General' },
    buttonUrl: { type: String, default: '' }, // Path to the generated 88x31 button
    description: { type: String }
});

module.exports = mongoose.model('Link', LinkSchema);
