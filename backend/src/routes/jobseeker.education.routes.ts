import { Router } from 'express';
import { upsertEducation } from '../controllers/jobseeker.education.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, upsertEducation);

export default router;