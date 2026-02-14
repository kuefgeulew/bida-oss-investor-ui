import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const investor = await prisma.user.upsert({
    where: { email: 'investor@example.com' },
    update: {},
    create: {
      email: 'investor@example.com',
      phone: '+8801712345678',
      password: hashedPassword,
      name: 'John Doe',
      role: 'INVESTOR',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const officer = await prisma.user.upsert({
    where: { email: 'officer@bida.gov.bd' },
    update: {},
    create: {
      email: 'officer@bida.gov.bd',
      phone: '+8801812345678',
      password: hashedPassword,
      name: 'Sarah Rahman',
      role: 'OFFICER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@bida.gov.bd' },
    update: {},
    create: {
      email: 'admin@bida.gov.bd',
      phone: '+8801912345678',
      password: hashedPassword,
      name: 'Dr. Ahmed Hassan',
      role: 'ADMIN',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@bida.gov.bd' },
    update: {},
    create: {
      email: 'superadmin@bida.gov.bd',
      phone: '+8801612345678',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'SUPER_ADMIN',
      emailVerified: true,
      phoneVerified: true
    }
  });

  console.log('✅ Test users created');

  // Create investor profile
  const profile = await prisma.investorProfile.upsert({
    where: { userId: investor.id },
    update: {},
    create: {
      userId: investor.id,
      businessName: 'Global Tech Solutions Ltd.',
      businessType: 'FOREIGN',
      sector: 'Information Technology',
      investmentAmount: 5000000,
      numberOfEmployees: 50,
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Tejgaon',
      address: 'House 123, Road 45, Gulshan-2, Dhaka-1212',
      contactPerson: 'John Doe',
      contactEmail: 'john@globaltechbd.com',
      contactPhone: '+8801712345678',
      website: 'https://globaltechbd.com',
      status: 'APPROVED',
      completionPercent: 100
    }
  });

  console.log('✅ Investor profile created');

  // Create services
  const services = [
    {
      name: 'Company Registration',
      description: 'Register your company with RJSC',
      agency: 'RJSC',
      category: 'Registration',
      fee: 5000,
      processingTime: '5-7 working days',
      sla: 7,
      requirements: 'Passport copy, NID, Business plan',
      documents: ['PASSPORT', 'NID', 'INCORPORATION']
    },
    {
      name: 'Trade License',
      description: 'Obtain trade license from City Corporation',
      agency: 'City Corporation',
      category: 'Licensing',
      fee: 3000,
      processingTime: '3-5 working days',
      sla: 5,
      requirements: 'Company registration certificate, Tin certificate',
      documents: ['CERTIFICATE', 'TAX']
    },
    {
      name: 'Environmental Clearance',
      description: 'Get environmental clearance certificate from DOE',
      agency: 'DOE',
      category: 'Compliance',
      fee: 15000,
      processingTime: '14-21 working days',
      sla: 21,
      requirements: 'EIA report, Site plan',
      documents: ['CERTIFICATE', 'OTHER']
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { 
        id: service.name.toLowerCase().replace(/\s+/g, '-') 
      },
      update: {},
      create: {
        id: service.name.toLowerCase().replace(/\s+/g, '-'),
        ...service
      }
    });
  }

  console.log('✅ Services created');

  // Create sample application
  const application = await prisma.application.create({
    data: {
      applicationNo: 'APP-2026-0001',
      investorId: investor.id,
      profileId: profile.id,
      type: 'Company Registration',
      agency: 'BIDA',
      title: 'New IT Company Setup',
      description: 'Registration of Global Tech Solutions Ltd.',
      status: 'IN_PROGRESS',
      currentStep: 2,
      totalSteps: 5,
      slaDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      assignedOfficerId: officer.id,
      priority: 'HIGH',
      approvalSteps: {
        create: [
          {
            stepNumber: 1,
            name: 'Document Verification',
            agency: 'BIDA',
            department: 'Registration',
            status: 'COMPLETED',
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            slaDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          },
          {
            stepNumber: 2,
            name: 'Trade License',
            agency: 'City Corporation',
            status: 'IN_PROGRESS',
            startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            slaDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
          },
          {
            stepNumber: 3,
            name: 'Environmental Clearance',
            agency: 'DOE',
            status: 'PENDING',
            slaDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
          },
          {
            stepNumber: 4,
            name: 'Fire Safety Certificate',
            agency: 'Fire Service',
            status: 'PENDING',
            slaDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
          },
          {
            stepNumber: 5,
            name: 'Final Approval',
            agency: 'BIDA',
            department: 'Approval',
            status: 'PENDING',
            slaDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
          }
        ]
      }
    }
  });

  console.log('✅ Sample application created');

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: investor.id,
      type: 'APPLICATION_STATUS',
      title: 'Application Progress Update',
      message: 'Your application APP-2026-0001 is now in progress',
      applicationId: application.id
    }
  });

  console.log('✅ Notifications created');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('Investor: investor@example.com / password123');
  console.log('Officer: officer@bida.gov.bd / password123');
  console.log('Admin: admin@bida.gov.bd / password123');
  console.log('Super Admin: superadmin@bida.gov.bd / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
