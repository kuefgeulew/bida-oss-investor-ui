import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.js';
import prisma from '../utils/db.js';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// GET /api/notifications - Get user notifications
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user!.userId;
    const { read } = req.query;

    const where: any = { userId };
    if (read !== undefined) {
      where.read = read === 'true';
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, read: false }
    });

    res.json({
      success: true,
      data: { notifications, unreadCount }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notifications' });
  }
});

// PUT /api/notifications/:id/read - Mark as read
router.put('/:id/read', async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user!.userId;

    await prisma.notification.update({
      where: { id: req.params.id, userId },
      data: { read: true, readAt: new Date() }
    });

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating notification' });
  }
});

// DELETE /api/notifications - Clear all notifications
router.delete('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user!.userId;

    await prisma.notification.deleteMany({
      where: { userId, read: true }
    });

    res.json({
      success: true,
      message: 'Read notifications cleared'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error clearing notifications' });
  }
});

export default router;
