import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
    name: { type: String, default: 'Webmaster' },
    bio: { type: String },
    avatarUrl: { type: String },
    stats: {
        str: { type: Number, default: 10 },
        dex: { type: Number, default: 10 },
        int: { type: Number, default: 10 },
        lck: { type: Number, default: 10 }
    },
    interests: [{ type: String }],
    links: [{
        label: String,
        url: String
    }]
}, { timestamps: true });

export default mongoose.model('About', AboutSchema);
