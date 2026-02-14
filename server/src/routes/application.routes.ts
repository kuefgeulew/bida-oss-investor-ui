import { Router } from 'express';
import { body } from 'express-validator';
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus
} from '../controllers/application.controller.js';
import { authenticate, isOfficer } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/applications - List applications (investor: own, officer: all)
router.get('/', getApplications);

// GET /api/applications/:id - Get application details
router.get('/:id', getApplicationById);

// POST /api/applications - Create new application
router.post(
  '/',
  [
    body('type').trim().notEmpty(),
    body('agency').isIn(['BIDA', 'BEZA', 'BEPZA', 'BHTPA', 'BSCIC', 'PPPA']),
    body('title').trim().notEmpty(),
    body('description').optional().trim()
  ],
  createApplication
);

// PUT /api/applications/:id - Update application
router.put('/:id', updateApplication);

// PUT /api/applications/:id/status - Update status (officer only)
router.put('/:id/status', isOfficer, updateApplicationStatus);

export default router;
