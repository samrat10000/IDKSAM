
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from server directory
dotenv.config({ path: path.join(__dirname, 'server', '.env') });

const ScrapbookItemSchema = new mongoose.Schema({
    type: String,
    content: String,
    caption: String,
    x: Number,
    y: Number,
    rotation: Number,
    createdAt: { type: Date, default: Date.now }
});

const ScrapbookItem = mongoose.model('ScrapbookItem', ScrapbookItemSchema);

async function reseed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        console.log('Clearing ScrapbookItem collection...');
        await ScrapbookItem.deleteMany({});
        
        console.log('Seeding new items...');
        await ScrapbookItem.create([
            { 
                type: 'image', 
                content: '/scrapbook/friends.jpg', 
                caption: 'summer vibez with the crew.', 
                x: 50, y: 50, rotation: -5 
            },
            { 
                type: 'image', 
                content: '/scrapbook/kick.jpg', 
                caption: 'perfect form.', 
                x: 400, y: 30, rotation: 8 
            },
            { 
                type: 'image', 
                content: '/scrapbook/dog-1.jpg', 
                caption: 'best boy.', 
                x: 20, y: 320, rotation: -3 
            },
            { 
                type: 'note', 
                content: 'never ending summer', 
                x: 350, y: 450, rotation: 2 
            },
            { 
                type: 'image', 
                content: '/scrapbook/feet-ball.jpg', 
                caption: 'ready for the match.', 
                x: 650, y: 150, rotation: -10 
            },
            {
                type: 'image',
                content: '/scrapbook/dog-2.jpg',
                caption: 'field day.',
                x: 600, y: 400, rotation: 5
            }
        ]);

        console.log('Scrapbook re-seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error during re-seed:', err);
        process.exit(1);
    }
}

reseed();
