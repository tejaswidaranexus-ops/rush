import { Router } from 'express';
import { sendOtpController, verifyOtpController } from '../controllers/auth.controller';

import { getMe, selectRole } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);

router.get('/me', authMiddleware, getMe);
router.post('/select-role', authMiddleware, selectRole);

export default router;