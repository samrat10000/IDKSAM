import mongoose from 'mongoose';

const HomeSchema = new mongoose.Schema({
    title: { type: String, default: 'Welcome!' },
    welcomeText: { type: String, default: 'welcome to my digital room...' },
    introParagraphs: [{ type: String }],
    status: {
        mood: { type: String, default: 'Hazy' },
        listening: { type: String, default: 'Ambience' },
        building: { type: String, default: 'This website' }
    }
}, { timestamps: true });

export default mongoose.model('Home', HomeSchema);
