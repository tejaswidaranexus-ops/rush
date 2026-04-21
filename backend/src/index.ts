import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import { authMiddleware } from './middleware/auth.middleware';
import userRoutes from './routes/user.routes';
import jobseekerRoutes from './routes/jobseeker.routes';
import educationRoutes from './routes/jobseeker.education.routes';
import preferencesRoutes from './routes/jobseeker.preferences.routes';

import employerRoutes from './routes/employer.routes';
import jobRoutes from './routes/job.routes';




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/user', userRoutes);
app.use('/jobseeker', jobseekerRoutes);
app.use('/jobseeker/education', educationRoutes);
app.use('/jobseeker/preferences', preferencesRoutes);

app.use('/employer', employerRoutes);
app.use('/jobs', jobRoutes);



// Health check
app.get('/', (req, res) => {
  res.send('RUSH Backend Running 🚀');
});

// Routes

app.get('/protected', authMiddleware, (req: any, res) => {
  res.json({
    message: 'Protected route working',
    user: req.user
  });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(5000, "0.0.0.0",() => {
  console.log(`Server running on port ${PORT}`);
});