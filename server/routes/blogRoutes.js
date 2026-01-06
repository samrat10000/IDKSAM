import express from 'express';
import { 
    getPublicPosts, 
    getPostById, 
    getAllPosts, 
    createPost, 
    updatePost, 
    deletePost 
} from '../controllers/blogController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.get('/blog', getPublicPosts);
router.get('/blog/:id', getPostById);

// Admin Routes
router.get('/admin/blog', authMiddleware, getAllPosts);
router.post('/admin/blog', authMiddleware, createPost);
router.put('/admin/blog/:id', authMiddleware, updatePost);
router.delete('/admin/blog/:id', authMiddleware, deletePost);

export default router;
