import { Router } from 'express';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);
router.use(isAdmin);

// TODO: Implement analytics routes
router.get('/overview', (req, res) => {
  res.json({ success: true, message: 'Analytics coming soon' });
});

export default router;
