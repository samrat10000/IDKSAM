const mongoose = require('mongoose');

const scrapbookItemSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['note', 'image', 'sticker'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    },
    rotation: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ScrapbookItem', scrapbookItemSchema);
