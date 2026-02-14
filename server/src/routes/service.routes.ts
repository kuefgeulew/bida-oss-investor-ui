import { Router, Request, Response } from 'express';
import prisma from '../utils/db.js';

const router = Router();

// GET /api/services - List all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, agency } = req.query;
    
    const where: any = { isActive: true };
    if (category) where.category = category;
    if (agency) where.agency = agency;

    const services = await prisma.service.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching services' });
  }
});

// GET /api/services/:id - Get service details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id }
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({
      success: true,
      data: { service }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching service' });
  }
});

export default router;
