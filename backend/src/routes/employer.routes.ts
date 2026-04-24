import { Router } from 'express';
import { upsertEmployerProfile } from '../controllers/employer.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { getEmployerProfile } from "../controllers/employer.controller";

const router = Router();

router.get("/profile", authMiddleware, getEmployerProfile);
router.post('/profile', authMiddleware, upsertEmployerProfile);

export default router;