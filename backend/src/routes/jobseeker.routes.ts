import { Router } from 'express';
import { upsertJobseekerProfile } from '../controllers/jobseeker.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/profile', authMiddleware, upsertJobseekerProfile);

export default router;