import Home from '../models/Home.js';
import About from '../models/About.js';
import Link from '../models/Link.js';
import Status from '../models/Status.js';
import ScrapbookItem from '../models/ScrapbookItem.js';

export const getHome = async (req, res) => {
    try {
        const data = await Home.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAbout = async (req, res) => {
    try {
        const data = await About.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getLinks = async (req, res) => {
    try {
        const data = await Link.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getStatus = async (req, res) => {
    try {
        const data = await Status.findOne();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getScrapbook = async (req, res) => {
    try {
        const data = await ScrapbookItem.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
