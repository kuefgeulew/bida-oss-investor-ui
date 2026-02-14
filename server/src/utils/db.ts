import { PrismaClient } from '@prisma/client';
import logger from './logger.js';

// Singleton pattern for Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Test database connection
export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect();
  logger.info('Database disconnected');
}

// Handle shutdown
process.on('beforeExit', async () => {
  await disconnectDatabase();
});

export default prisma;
