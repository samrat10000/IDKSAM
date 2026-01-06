import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import models (still needed for seeding)
import Home from './models/Home.js';
import About from './models/About.js';
import Link from './models/Link.js';
import Status from './models/Status.js';
import ScrapbookItem from './models/ScrapbookItem.js';
import GuestbookEntry from './models/GuestbookEntry.js';
import VisitCounter from './models/VisitCounter.js';
import BlogPost from './models/BlogPost.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import visitRoutes from './routes/visitRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import guestbookRoutes from './routes/guestbookRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/indie-world')
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Mount Routes
app.use('/api', authRoutes);      // /api/admin/login
app.use('/api', pageRoutes);      // /api/home, /api/about, etc.
app.use('/api', visitRoutes);     // /api/visits
app.use('/api', blogRoutes);      // /api/blog, /api/admin/blog
app.use('/api', guestbookRoutes); // /api/guestbook, /api/admin/guestbook
app.use('/api/contact', contactRoutes); // /api/contact/send

// Seeding function (Kept in server.js for now as it's a startup task)
const seedDatabase = async () => {
    try {
        const homeCount = await Home.countDocuments();
        if (homeCount === 0) {
            await Home.create({
                title: "welcome to my digital home",
                welcomeText: "welcome to my digital room...",
                content: "this is a small corner of the internet where i share my thoughts, projects, and fragments of life.",
                updatedAt: new Date()
            });
            console.log('Home content seeded.');
        } else {
            // Force update welcome text if it exists but is old/missing
            const homeDoc = await Home.findOne();
            if (homeDoc) {
                homeDoc.welcomeText = "welcome to my digital room...";
                homeDoc.title = "welcome to my digital home";
                await homeDoc.save();
                console.log('Home content updated.');
            }
        }

        // Force reset visits for deployment
        let counter = await VisitCounter.findOne();
        if (counter) {
            counter.count = 0;
            counter.lastUpdated = new Date();
            await counter.save();
            console.log('Visit counter reset to 0.');
        } else {
            await VisitCounter.create({ count: 0 });
            console.log('Visit counter initialized to 0.');
        }

        const aboutCount = await About.countDocuments();
        if (aboutCount === 0) {
            await About.create({
                content: "i'm a digital nomad, a collector of pixels, and a fan of everything retro.",
                interests: ["pixel art", "stranger things", "indie games", "retro tech"]
            });
            console.log('About content seeded.');
        }

        const linkCount = await Link.countDocuments();
        if (linkCount === 0) {
            await Link.create([
                { name: "github", url: "https://github.com", icon: "🐙" },
                { name: "twitter", url: "https://twitter.com", icon: "🐦" }
            ]);
            console.log('Links seeded.');
        }

        const statusCount = await Status.countDocuments();
        if (statusCount === 0) {
            await Status.create({
                text: "listening to synthwave and building things.",
                mood: "chill"
            });
            console.log('Status seeded.');
        }

        // Seed Scrapbook Items - Force refresh if old data exists
        const scrapbookCount = await ScrapbookItem.countDocuments();
        const hasFriendsImage = await ScrapbookItem.findOne({ content: '/scrapbook/friends.jpg' });
        
        if (scrapbookCount < 5 || hasFriendsImage) {
            await ScrapbookItem.deleteMany({}); // Clear to ensure fresh indie layout
            await ScrapbookItem.create([
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
            console.log('Scrapbook seeded.');
        }

        // Seed Blog Posts
        const blogCount = await BlogPost.countDocuments();
        if (blogCount === 0) {
            await BlogPost.create([
                {
                    title: "welcome to the void",
                    content: "this is the first entry in my digital journal. a place for thoughts, code snippets, and late-night fragments. i hope you find something interesting here.\n\nthe journey of a thousand nodes begins with a single commit.",
                    excerpt: "a digital welcome to my corner of the web.",
                    tags: ["web", "indie", "journal"],
                    published: true
                },
                {
                    title: "finding peace in the pixels",
                    content: "there's something therapeutic about pixel art. the constraints of a small grid force you to be intentional with every single square. it's like coding—finding the most efficient way to represent a complex idea with limited resources.\n\nworking on the sticker collection today was a remind of that.",
                    excerpt: "reflections on pixel art and the beauty of constraints.",
                    tags: ["pixelart", "philosophy"],
                    published: true
                },
                {
                    title: "the evolution of retro aesthetics",
                    content: "why are we so obsessed with the aesthetics of the 90s? is it nostalgia for a time we didn't fully experience (or at least, didn't understand the tech of)? or is it a rebellion against the clean, sterile, corporate design of modern apps?\n\ni choose the latter. give me glitchy gradients and pixel fonts any day.",
                    excerpt: "diving into why retro-indie design feels so good.",
                    tags: ["design", "retro", "thoughts"],
                    published: true
                },
                {
                    title: "why steve harrington is the best character",
                    content: "can we talk about stranger things for a second? more specifically, steve harrington. joe keery's acting is so incredibly natural that you forget you're watching a show. his transition from the 'king steve' jerk to the world's best babysitter with a nail-bat is arguably the best character arc in television history.\n\nthe atmosphere of hawkins, the synth-wave soundtrack, and the genuine chemistry between the cast... it's more than a series, it's a life i want to be part of. i never want this transmission to end.",
                    excerpt: "a tribute to the best babysitter in hawkins.",
                    tags: ["strangerthings", "steveharrington", "tv-shows"],
                    published: true
                }
            ]);
            console.log('Blog posts seeded.');
        }

    } catch (err) {
        console.error('Error seeding database:', err);
    }
};

app.get('/', (req, res) => {
    res.send('Indie World API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
