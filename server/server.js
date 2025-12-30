const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import models
const Home = require('./models/Home');
const About = require('./models/About');
const Link = require('./models/Link');
const Status = require('./models/Status');
const ScrapbookItemSchema = new mongoose.Schema({
    type: { type: String, enum: ['image', 'note'], required: true },
    content: { type: String, required: true }, // URL for image, text for note
    caption: String,
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    rotation: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
const ScrapbookItem = mongoose.model('ScrapbookItem', ScrapbookItemSchema);

const GuestbookEntrySchema = new mongoose.Schema({
    name: String,
    message: String,
    stamp: String,
    approved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
const GuestbookEntry = mongoose.model('GuestbookEntry', GuestbookEntrySchema);

const VisitCounterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});
const VisitCounter = mongoose.model('VisitCounter', VisitCounterSchema);
const BlogPost = require('./models/BlogPost');


// Import auth middleware
const authMiddleware = require('./middleware/auth');

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/indie-world')
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// --- Guestbook Routes ---
app.get('/api/guestbook', async (req, res) => {
    try {
        const entries = await GuestbookEntry.find({ approved: true }).sort('-createdAt');
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/guestbook', async (req, res) => {
    try {
        const { name, message, stamp } = req.body;
        const entry = await GuestbookEntry.create({ name, message, stamp });
        res.json({ message: 'entry sent for approval!', entry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Moderation
app.get('/api/admin/guestbook', authMiddleware, async (req, res) => {
    try {
        const entries = await GuestbookEntry.find().sort('-createdAt');
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/guestbook/:id/approve', authMiddleware, async (req, res) => {
    try {
        await GuestbookEntry.findByIdAndUpdate(req.params.id, { approved: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/guestbook/:id', authMiddleware, async (req, res) => {
    try {
        await GuestbookEntry.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Visit Counter Routes ---
app.get('/api/visits', async (req, res) => {
    try {
        let counter = await VisitCounter.findOne();
        if (!counter) counter = await VisitCounter.create({ count: 0 });
        res.json({ count: counter.count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/visits/increment', async (req, res) => {
    try {
        let counter = await VisitCounter.findOne();
        if (!counter) counter = await VisitCounter.create({ count: 1 });
        else {
            counter.count += 1;
            counter.lastUpdated = Date.now();
            await counter.save();
        }
        res.json({ count: counter.count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seeding function
const seedDatabase = async () => {
    try {
        const homeCount = await Home.countDocuments();
        if (homeCount === 0) {
            await Home.create({
                title: "welcome to my digital home",
                content: "this is a small corner of the internet where i share my thoughts, projects, and fragments of life.",
                updatedAt: new Date()
            });
            console.log('Home content seeded.');
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

// ============ API ROUTES ============

// Original Routes
app.get('/api/home', async (req, res) => {
    try {
        const data = await Home.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/about', async (req, res) => {
    try {
        const data = await About.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/links', async (req, res) => {
    try {
        const data = await Link.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/status', async (req, res) => {
    try {
        const data = await Status.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/scrapbook', async (req, res) => {
    try {
        const data = await ScrapbookItem.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============ NEW DYNAMIC CONTENT ROUTES ============

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
        res.json({ success: true, token: adminPassword });
    } else {
        res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

// ===== BLOG ROUTES =====

app.get('/api/blog', async (req, res) => {
    try {
        const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/blog/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/blog', authMiddleware, async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/blog', authMiddleware, async (req, res) => {
    try {
        const post = await BlogPost.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/blog/:id', authMiddleware, async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/blog/:id', authMiddleware, async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== GUESTBOOK ROUTES =====

app.get('/api/guestbook', async (req, res) => {
    try {
        const entries = await GuestbookEntry.find({ approved: true }).sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/guestbook', async (req, res) => {
    try {
        const entry = await GuestbookEntry.create({
            name: req.body.name,
            message: req.body.message,
            website: req.body.website || '',
            approved: false
        });
        res.status(201).json({ success: true, message: 'Submitted for approval!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/guestbook', authMiddleware, async (req, res) => {
    try {
        const entries = await GuestbookEntry.find().sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/guestbook/:id/approve', authMiddleware, async (req, res) => {
    try {
        const entry = await GuestbookEntry.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/guestbook/:id', authMiddleware, async (req, res) => {
    try {
        await GuestbookEntry.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== VISIT COUNTER ROUTES =====

app.get('/api/visits', async (req, res) => {
    try {
        let counter = await VisitCounter.findOne();
        if (!counter) counter = await VisitCounter.create({ count: 0 });
        res.json({ count: counter.count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/visits/increment', async (req, res) => {
    try {
        let counter = await VisitCounter.findOne();
        if (!counter) {
            counter = await VisitCounter.create({ count: 1 });
        } else {
            counter.count += 1;
            counter.lastUpdated = new Date();
            await counter.save();
        }
        res.json({ count: counter.count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Indie World API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
