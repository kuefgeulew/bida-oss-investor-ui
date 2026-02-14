import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/db.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

// GET /api/profiles/me
export const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as AuthRequest).user!.userId;

    const profile = await prisma.investorProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            avatar: true
          }
        },
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            category: true,
            url: true,
            uploadedAt: true
          }
        }
      }
    });

    if (!profile) {
      return res.json({
        success: true,
        data: { profile: null }
      });
    }

    res.json({
      success: true,
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/profiles
export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = (req as AuthRequest).user!.userId;

    // Check if profile already exists
    const existingProfile = await prisma.investorProfile.findUnique({
      where: { userId }
    });

    if (existingProfile) {
      throw new AppError('Profile already exists', 400);
    }

    // Create profile
    const profile = await prisma.investorProfile.create({
      data: {
        userId,
        ...req.body,
        status: 'DRAFT',
        completionPercent: 50
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CREATE',
        entity: 'InvestorProfile',
        entityId: profile.id,
        changes: req.body
      }
    });

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/profiles/me
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as AuthRequest).user!.userId;

    const profile = await prisma.investorProfile.findUnique({
      where: { userId }
    });

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    // Calculate completion percentage
    const fields = [
      'businessName', 'businessType', 'sector', 'investmentAmount',
      'division', 'district', 'upazila', 'address',
      'contactPerson', 'contactEmail', 'contactPhone'
    ];
    
    const completedFields = fields.filter(
      field => req.body[field] || (profile as any)[field]
    ).length;
    
    const completionPercent = Math.round((completedFields / fields.length) * 100);

    // Update profile
    const updatedProfile = await prisma.investorProfile.update({
      where: { userId },
      data: {
        ...req.body,
        completionPercent
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'UPDATE',
        entity: 'InvestorProfile',
        entityId: profile.id,
        changes: req.body
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { profile: updatedProfile }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/profiles/:id (Officer only)
export const getProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const profile = await prisma.investorProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            avatar: true,
            createdAt: true
          }
        },
        documents: true,
        applications: {
          select: {
            id: true,
            applicationNo: true,
            type: true,
            status: true,
            submittedAt: true
          }
        }
      }
    });

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    res.json({
      success: true,
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};
