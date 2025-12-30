const mongoose = require('mongoose');

const guestbookEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        trim: true,
        default: ''
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('GuestbookEntry', guestbookEntrySchema);
