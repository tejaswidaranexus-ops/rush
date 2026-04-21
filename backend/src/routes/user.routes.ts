import { Router } from 'express';
import { getMe, selectRole } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';


const router = Router();

router.get('/me', authMiddleware, getMe);
router.post('/select-role', authMiddleware, selectRole);


export default router;