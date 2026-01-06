import express from 'express';
import { 
    getApprovedEntries, 
    createEntry, 
    getAllEntries, 
    approveEntry, 
    deleteEntry 
} from '../controllers/guestbookController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.get('/guestbook', getApprovedEntries);
router.post('/guestbook', createEntry);

// Admin Routes
router.get('/admin/guestbook', authMiddleware, getAllEntries);
router.put('/admin/guestbook/:id/approve', authMiddleware, approveEntry);
router.delete('/admin/guestbook/:id', authMiddleware, deleteEntry);

export default router;
