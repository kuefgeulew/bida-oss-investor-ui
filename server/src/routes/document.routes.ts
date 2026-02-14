import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// TODO: Implement document routes with file upload
router.post('/upload', (req, res) => {
  res.json({ success: true, message: 'Document upload coming in Step 3' });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Document routes coming soon' });
});

export default router;
