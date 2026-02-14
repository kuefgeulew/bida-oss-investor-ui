import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/db.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

// Generate application number
const generateApplicationNo = async () => {
  const year = new Date().getFullYear();
  const count = await prisma.application.count();
  return `APP-${year}-${String(count + 1).padStart(4, '0')}`;
};

// GET /api/applications
export const getApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as AuthRequest).user!;
    const { status, agency, page = 1, limit = 10 } = req.query;

    const where: any = {};

    // Investors see only their applications
    if (user.role === 'INVESTOR') {
      where.investorId = user.userId;
    }

    // Add filters
    if (status) where.status = status;
    if (agency) where.agency = agency;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          investor: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          profile: {
            select: {
              businessName: true,
              sector: true
            }
          },
          assignedOfficer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          approvalSteps: {
            select: {
              id: true,
              stepNumber: true,
              name: true,
              status: true,
              slaDeadline: true
            },
            orderBy: { stepNumber: 'asc' }
          }
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { submittedAt: 'desc' }
      }),
      prisma.application.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/applications/:id
export const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as AuthRequest).user!;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        investor: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        profile: {
          select: {
            businessName: true,
            businessType: true,
            sector: true,
            investmentAmount: true,
            division: true,
            district: true,
            upazila: true
          }
        },
        assignedOfficer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        approvalSteps: {
          orderBy: { stepNumber: 'asc' }
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
        },
        payments: {
          select: {
            id: true,
            transactionId: true,
            amount: true,
            status: true,
            paidAt: true
          }
        }
      }
    });

    if (!application) {
      throw new AppError('Application not found', 404);
    }

    // Check authorization (investors can only see their own)
    if (user.role === 'INVESTOR' && application.investorId !== user.userId) {
      throw new AppError('Unauthorized', 403);
    }

    res.json({
      success: true,
      data: { application }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/applications
export const createApplication = async (
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
    const { type, agency, title, description, totalSteps = 5 } = req.body;

    // Get user's profile
    const profile = await prisma.investorProfile.findUnique({
      where: { userId }
    });

    if (!profile) {
      throw new AppError('Please complete your profile first', 400);
    }

    // Generate application number
    const applicationNo = await generateApplicationNo();

    // Calculate SLA deadline (default 30 days)
    const slaDeadline = new Date();
    slaDeadline.setDate(slaDeadline.getDate() + 30);

    // Create application with approval steps
    const application = await prisma.application.create({
      data: {
        applicationNo,
        investorId: userId,
        profileId: profile.id,
        type,
        agency,
        title,
        description,
        status: 'PENDING',
        currentStep: 1,
        totalSteps,
        slaDeadline,
        approvalSteps: {
          create: [
            {
              stepNumber: 1,
              name: 'Document Verification',
              agency,
              status: 'IN_PROGRESS',
              slaDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            },
            {
              stepNumber: 2,
              name: 'Preliminary Review',
              agency,
              status: 'PENDING',
              slaDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
            },
            {
              stepNumber: 3,
              name: 'Technical Assessment',
              agency,
              status: 'PENDING',
              slaDeadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)
            },
            {
              stepNumber: 4,
              name: 'Final Review',
              agency,
              status: 'PENDING',
              slaDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
            },
            {
              stepNumber: 5,
              name: 'Approval & Issuance',
              agency,
              status: 'PENDING',
              slaDeadline
            }
          ]
        }
      },
      include: {
        approvalSteps: {
          orderBy: { stepNumber: 'asc' }
        }
      }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        type: 'APPLICATION_STATUS',
        title: 'Application Submitted',
        message: `Your application ${applicationNo} has been submitted successfully`,
        applicationId: application.id
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'CREATE',
        entity: 'Application',
        entityId: application.id,
        changes: req.body
      }
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { application }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/applications/:id
export const updateApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as AuthRequest).user!;

    const application = await prisma.application.findUnique({
      where: { id }
    });

    if (!application) {
      throw new AppError('Application not found', 404);
    }

    // Only application owner can update
    if (application.investorId !== user.userId) {
      throw new AppError('Unauthorized', 403);
    }

    // Can only update if status is PENDING
    if (application.status !== 'PENDING') {
      throw new AppError('Cannot update application in current status', 400);
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: req.body
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.userId,
        action: 'UPDATE',
        entity: 'Application',
        entityId: id,
        changes: req.body
      }
    });

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: { application: updatedApplication }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/applications/:id/status (Officer only)
export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status, notes, assignedOfficerId } = req.body;
    const user = (req as AuthRequest).user!;

    const application = await prisma.application.findUnique({
      where: { id },
      include: { investor: true }
    });

    if (!application) {
      throw new AppError('Application not found', 404);
    }

    // Update application
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: {
        status,
        assignedOfficerId: assignedOfficerId || application.assignedOfficerId,
        ...(status === 'APPROVED' && { completedAt: new Date() })
      }
    });

    // Create notification for investor
    await prisma.notification.create({
      data: {
        userId: application.investorId,
        type: 'APPLICATION_STATUS',
        title: `Application ${status}`,
        message: `Your application ${application.applicationNo} status has been updated to ${status}`,
        applicationId: id
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.userId,
        action: 'UPDATE_STATUS',
        entity: 'Application',
        entityId: id,
        changes: { status, notes }
      }
    });

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: { application: updatedApplication }
    });
  } catch (error) {
    next(error);
  }
};
