import express from 'express';
import { getVisits, incrementVisits } from '../controllers/visitController.js';

const router = express.Router();

router.get('/visits', getVisits);
router.post('/visits/increment', incrementVisits);

export default router;
