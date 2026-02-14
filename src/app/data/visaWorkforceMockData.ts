/**
 * 📊 VISA & WORKFORCE MOCK DATA
 * Extensive mock data for visa applications and foreign workers
 */

export interface VisaApplication {
  id: string;
  applicantName: string;
  applicantCountry: string;
  visaType: 'investor' | 'work-permit' | 'employment' | 'business';
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  appliedDate: Date;
  estimatedCompletionDate: Date;
  documents: {
    name: string;
    uploaded: boolean;
  }[];
}

export interface ForeignWorker {
  id: string;
  name: string;
  country: string;
  position: string;
  qualification: string;
  visaStatus: 'active' | 'expired' | 'pending' | 'renewal';
  visaExpiryDate: Date;
}

export const visaApplications: VisaApplication[] = [
  {
    id: 'visa-001',
    applicantName: 'John Smith',
    applicantCountry: 'United States',
    visaType: 'investor',
    status: 'under-review',
    appliedDate: new Date('2026-01-15'),
    estimatedCompletionDate: new Date('2026-02-05'),
    documents: [
      { name: 'Passport Copy', uploaded: true },
      { name: 'Investment Proof', uploaded: true },
      { name: 'BIDA Approval', uploaded: false },
    ]
  },
  {
    id: 'visa-002',
    applicantName: 'Maria Garcia',
    applicantCountry: 'Spain',
    visaType: 'work-permit',
    status: 'pending',
    appliedDate: new Date('2026-01-20'),
    estimatedCompletionDate: new Date('2026-02-20'),
    documents: [
      { name: 'Passport Copy', uploaded: true },
      { name: 'Employment Letter', uploaded: true },
      { name: 'Qualifications', uploaded: true },
    ]
  },
  {
    id: 'visa-003',
    applicantName: 'Wei Zhang',
    applicantCountry: 'China',
    visaType: 'employment',
    status: 'approved',
    appliedDate: new Date('2026-01-05'),
    estimatedCompletionDate: new Date('2026-01-25'),
    documents: [
      { name: 'Passport Copy', uploaded: true },
      { name: 'Employment Letter', uploaded: true },
      { name: 'Qualifications', uploaded: true },
      { name: 'Medical Certificate', uploaded: true },
    ]
  },
];

export const foreignWorkers: ForeignWorker[] = [
  {
    id: 'worker-001',
    name: 'Michael Chen',
    country: 'China',
    position: 'Production Manager',
    qualification: 'MBA Manufacturing',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-12-31'),
  },
  {
    id: 'worker-002',
    name: 'Hans Mueller',
    country: 'Germany',
    position: 'Technical Director',
    qualification: 'PhD Engineering',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-08-15'),
  },
  {
    id: 'worker-003',
    name: 'Yuki Sato',
    country: 'Japan',
    position: 'Quality Control Manager',
    qualification: 'MSc Industrial Engineering',
    visaStatus: 'active',
    visaExpiryDate: new Date('2027-03-20'),
  },
  {
    id: 'worker-004',
    name: 'Sophie Dubois',
    country: 'France',
    position: 'R&D Specialist',
    qualification: 'PhD Chemistry',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-11-10'),
  },
  {
    id: 'worker-005',
    name: 'Raj Kumar',
    country: 'India',
    position: 'IT Systems Administrator',
    qualification: 'BTech Computer Science',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-09-25'),
  },
  {
    id: 'worker-006',
    name: 'Emma Wilson',
    country: 'United Kingdom',
    position: 'HR Manager',
    qualification: 'MBA Human Resources',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-10-30'),
  },
  {
    id: 'worker-007',
    name: 'Carlos Rodriguez',
    country: 'Spain',
    position: 'Safety Engineer',
    qualification: 'MSc Occupational Safety',
    visaStatus: 'renewal',
    visaExpiryDate: new Date('2026-03-15'),
  },
  {
    id: 'worker-008',
    name: 'Ahmed Al-Sayed',
    country: 'Egypt',
    position: 'Mechanical Engineer',
    qualification: 'BSc Mechanical Engineering',
    visaStatus: 'active',
    visaExpiryDate: new Date('2027-01-20'),
  },
  {
    id: 'worker-009',
    name: 'Priya Patel',
    country: 'India',
    position: 'Finance Controller',
    qualification: 'CA (Chartered Accountant)',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-07-18'),
  },
  {
    id: 'worker-010',
    name: 'Lars Andersson',
    country: 'Sweden',
    position: 'Supply Chain Manager',
    qualification: 'MSc Logistics',
    visaStatus: 'active',
    visaExpiryDate: new Date('2027-02-28'),
  },
  {
    id: 'worker-011',
    name: 'Fatima Hassan',
    country: 'UAE',
    position: 'Marketing Director',
    qualification: 'MBA Marketing',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-06-12'),
  },
  {
    id: 'worker-012',
    name: 'Kim Ji-woo',
    country: 'South Korea',
    position: 'Electronics Engineer',
    qualification: 'MSc Electronics',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-11-25'),
  },
  {
    id: 'worker-013',
    name: 'Oliver Schmidt',
    country: 'Germany',
    position: 'Plant Manager',
    qualification: 'MBA Operations',
    visaStatus: 'active',
    visaExpiryDate: new Date('2027-01-10'),
  },
  {
    id: 'worker-014',
    name: 'Isabella Costa',
    country: 'Italy',
    position: 'Design Lead',
    qualification: 'MA Industrial Design',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-08-30'),
  },
  {
    id: 'worker-015',
    name: 'Jack Morrison',
    country: 'Australia',
    position: 'Maintenance Manager',
    qualification: 'BSc Mechanical Engineering',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-10-15'),
  },
  {
    id: 'worker-016',
    name: 'Chen Wei',
    country: 'China',
    position: 'Production Supervisor',
    qualification: 'BSc Industrial Management',
    visaStatus: 'renewal',
    visaExpiryDate: new Date('2026-04-05'),
  },
  {
    id: 'worker-017',
    name: 'Anna Kowalski',
    country: 'Poland',
    position: 'Lab Technician',
    qualification: 'MSc Chemistry',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-09-08'),
  },
  {
    id: 'worker-018',
    name: 'Mohammed Karim',
    country: 'Pakistan',
    position: 'Textile Specialist',
    qualification: 'BSc Textile Engineering',
    visaStatus: 'active',
    visaExpiryDate: new Date('2027-03-12'),
  },
  {
    id: 'worker-019',
    name: 'Sarah Thompson',
    country: 'Canada',
    position: 'Training Coordinator',
    qualification: 'MSc Organizational Development',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-12-20'),
  },
  {
    id: 'worker-020',
    name: 'Pierre Laurent',
    country: 'France',
    position: 'Process Engineer',
    qualification: 'MSc Chemical Engineering',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-11-05'),
  },
  {
    id: 'worker-021',
    name: 'Mei Lin',
    country: 'Singapore',
    position: 'Business Analyst',
    qualification: 'MBA Business Analytics',
    visaStatus: 'active',
    visaExpiryDate: new Date('2027-02-14'),
  },
  {
    id: 'worker-022',
    name: 'Diego Martinez',
    country: 'Mexico',
    position: 'Procurement Manager',
    qualification: 'MBA Supply Chain',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-07-22'),
  },
  {
    id: 'worker-023',
    name: 'Svetlana Ivanova',
    country: 'Russia',
    position: 'Export Coordinator',
    qualification: 'MA International Business',
    visaStatus: 'renewal',
    visaExpiryDate: new Date('2026-03-28'),
  },
  {
    id: 'worker-024',
    name: 'Antonio Silva',
    country: 'Brazil',
    position: 'Environmental Engineer',
    qualification: 'MSc Environmental Engineering',
    visaStatus: 'active',
    visaExpiryDate: new Date('2026-10-08'),
  },
  {
    id: 'worker-025',
    name: 'Nadia Ahmed',
    country: 'Bangladesh',
    position: 'Compliance Officer',
    qualification: 'LLB Law',
    visaStatus: 'active',
    visaExpiryDate: new Date('2027-01-30'),
  },
];