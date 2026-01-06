import express from 'express';
import { sendEmail } from '../controllers/contactController.js';

const router = express.Router();

// Define the POST route
// When someone hits 'http://.../api/contact/send', it runs the sendEmail function
router.post('/send', sendEmail);

export default router;
