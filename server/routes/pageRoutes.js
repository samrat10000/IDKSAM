import express from 'express';
import { getHome, getAbout, getLinks, getStatus, getScrapbook } from '../controllers/pageController.js';

const router = express.Router();

router.get('/home', getHome);
router.get('/about', getAbout);
router.get('/links', getLinks);
router.get('/status', getStatus);
router.get('/scrapbook', getScrapbook);

export default router;
