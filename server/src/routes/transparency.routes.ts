import { Router, Request, Response } from 'express';
import prisma from '../utils/db.js';

const router = Router();

// Public routes - no authentication required

// GET /api/transparency/stats - Public statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { status: 'APPROVED' } }),
      prisma.user.count({ where: { role: 'INVESTOR' } }),
      prisma.investorProfile.aggregate({
        _sum: { investmentAmount: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalApplications: stats[0],
        approvedApplications: stats[1],
        totalInvestors: stats[2],
        totalInvestmentAmount: stats[3]._sum.investmentAmount || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
});

// GET /api/transparency/agencies - Agency performance
router.get('/agencies', async (req: Request, res: Response) => {
  try {
    const agencies = ['BIDA', 'BEZA', 'BEPZA', 'BHTPA', 'BSCIC', 'PPPA'];
    
    const agencyStats = await Promise.all(
      agencies.map(async (agency) => {
        const total = await prisma.application.count({ where: { agency: agency as any } });
        const approved = await prisma.application.count({
          where: { agency: agency as any, status: 'APPROVED' }
        });
        
        return {
          agency,
          totalApplications: total,
          approvedApplications: approved,
          approvalRate: total > 0 ? (approved / total) * 100 : 0
        };
      })
    );

    res.json({
      success: true,
      data: { agencies: agencyStats }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching agency stats' });
  }
});

export default router;
