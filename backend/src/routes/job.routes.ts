import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createJob,
  getMyJobs,
  deleteJob,
  updateJob
} from '../controllers/job.controller';

const router = Router();

router.post('/', authMiddleware, createJob);
router.get('/my', authMiddleware, getMyJobs);
router.delete('/:jobId', authMiddleware, deleteJob);
router.put('/:jobId', authMiddleware, updateJob);

export default router;