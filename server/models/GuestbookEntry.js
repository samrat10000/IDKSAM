import mongoose from 'mongoose';

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
    stamp: {
        type: String,
        default: ''
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('GuestbookEntry', guestbookEntrySchema);
