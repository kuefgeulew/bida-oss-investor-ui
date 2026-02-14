import { Router } from 'express';
import { body } from 'express-validator';
import {
  getMyProfile,
  createProfile,
  updateProfile,
  getProfileById
} from '../controllers/profile.controller.js';
import { authenticate, isOfficer } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/profiles/me - Get current user's profile
router.get('/me', getMyProfile);

// POST /api/profiles - Create profile
router.post(
  '/',
  [
    body('businessName').trim().notEmpty(),
    body('businessType').isIn(['LOCAL', 'FOREIGN', 'JOINT_VENTURE']),
    body('sector').trim().notEmpty(),
    body('investmentAmount').isNumeric(),
    body('division').trim().notEmpty(),
    body('district').trim().notEmpty(),
    body('upazila').trim().notEmpty()
  ],
  createProfile
);

// PUT /api/profiles/me - Update profile
router.put('/me', updateProfile);

// GET /api/profiles/:id - Get profile by ID (officer only)
router.get('/:id', isOfficer, getProfileById);

export default router;
