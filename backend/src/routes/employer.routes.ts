import { Router } from 'express';
import { upsertEmployerProfile } from '../controllers/employer.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/profile', authMiddleware, upsertEmployerProfile);

export default router;