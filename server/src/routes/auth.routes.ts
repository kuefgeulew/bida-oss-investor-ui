import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().notEmpty(),
    body('phone').optional().trim(),
    body('role').optional().isIn(['INVESTOR', 'OFFICER', 'ADMIN'])
  ],
  register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  login
);

// POST /api/auth/logout
router.post('/logout', authenticate, logout);

// POST /api/auth/refresh
router.post('/refresh', refreshToken);

// GET /api/auth/me
router.get('/me', authenticate, getCurrentUser);

export default router;
