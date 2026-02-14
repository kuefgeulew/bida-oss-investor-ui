import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// TODO: Implement user routes
router.get('/me', (req, res) => {
  res.json({ success: true, message: 'User routes coming soon' });
});

export default router;
