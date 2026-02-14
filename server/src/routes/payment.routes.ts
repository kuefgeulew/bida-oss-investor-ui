import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// TODO: Implement payment routes with bKash in Step 10
router.post('/initiate', (req, res) => {
  res.json({ success: true, message: 'Payment integration coming in Step 10' });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Payment routes coming soon' });
});

export default router;
