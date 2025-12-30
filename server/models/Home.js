const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    title: { type: String, default: 'Welcome!' },
    welcomeText: { type: String, default: 'welcome to my digital bedroom...' },
    introParagraphs: [{ type: String }],
    status: {
        mood: { type: String, default: 'Hazy' },
        listening: { type: String, default: 'Ambience' },
        building: { type: String, default: 'This website' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Home', HomeSchema);
