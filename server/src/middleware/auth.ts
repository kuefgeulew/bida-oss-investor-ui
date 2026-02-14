import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';
import prisma from '../utils/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

// Authenticate JWT token
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };

    // Check if user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, isActive: true, role: true }
    });

    if (!user || !user.isActive) {
      throw new AppError('User not found or inactive', 401);
    }

    // Attach user to request
    (req as AuthRequest).user = {
      userId: user.id,
      role: user.role
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else {
      next(error);
    }
  }
};

// Role-based authorization middleware
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;

    if (!user) {
      return next(new AppError('Unauthorized', 401));
    }

    if (!roles.includes(user.role)) {
      return next(
        new AppError('Insufficient permissions', 403)
      );
    }

    next();
  };
};

// Check if user is investor
export const isInvestor = requireRole('INVESTOR');

// Check if user is officer or higher
export const isOfficer = requireRole('OFFICER', 'ADMIN', 'SUPER_ADMIN');

// Check if user is admin or higher
export const isAdmin = requireRole('ADMIN', 'SUPER_ADMIN');

// Check if user is super admin
export const isSuperAdmin = requireRole('SUPER_ADMIN');
