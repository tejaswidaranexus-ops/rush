import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { upsertPreferences } from '../controllers/jobseeker.preferences.controller';

const router = Router();

router.post('/', authMiddleware, upsertPreferences);

export default router;