import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, Filter, Clock, CheckCircle2, AlertTriangle, 
  FileText, Loader2, Eye, Edit, Users
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Mock Application type (NO BACKEND)
interface Application {
  id: string;
  applicationNo: string;
  type: string;
  agency: string;
  status: 'pending' | 'in-progress' | 'approved' | 'rejected' | 'completed';
  title: string;
  description: string;
  submittedAt: string;
  updatedAt: string;
  currentStep?: number;
  totalSteps?: number;
}

// Mock data
const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    applicationNo: 'APP-2026-001',
    type: 'Manufacturing Plant',
    agency: 'BIDA',
    status: 'in-progress',
    title: 'Garments Factory Setup',
    description: 'New garments manufacturing facility in Ashulia',
    submittedAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-28T15:30:00Z',
    currentStep: 4,
    totalSteps: 9
  },
  {
    id: '2',
    applicationNo: 'APP-2026-002',
    type: 'Trading Company',
    agency: 'RJSC',
    status: 'completed',
    title: 'Import-Export Business Registration',
    description: 'Electronics import and distribution company',
    submittedAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-01-20T14:00:00Z',
    currentStep: 5,
    totalSteps: 5
  },
  {
    id: '3',
    applicationNo: 'APP-2026-003',
    type: 'Pharmaceutical Company',
    agency: 'DGDA',
    status: 'pending',
    title: 'Drug Manufacturing License',
    description: 'Generic medicine production facility',
    submittedAt: '2026-01-28T11:00:00Z',
    updatedAt: '2026-01-28T11:00:00Z',
    currentStep: 1,
    totalSteps: 7
  },
  {
    id: '4',
    applicationNo: 'APP-2026-004',
    type: 'Real Estate Development',
    agency: 'RAJUK',
    status: 'in-progress',
    title: 'Residential Complex Approval',
    description: '15-storey residential building in Bashundhara',
    submittedAt: '2026-01-05T08:00:00Z',
    updatedAt: '2026-01-25T16:00:00Z',
    currentStep: 2,
    totalSteps: 6
  },
  {
    id: '5',
    applicationNo: 'APP-2026-005',
    type: 'IT Company',
    agency: 'BHTPA',
    status: 'approved',
    title: 'Software Development Company',
    description: 'AI/ML software development services',
    submittedAt: '2026-01-12T10:30:00Z',
    updatedAt: '2026-01-22T12:00:00Z',
    currentStep: 4,
    totalSteps: 4
  }
];

export function ApplicationsList() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [updating, setUpdating] = useState(false);

  // Load applications from localStorage or mock data (NO BACKEND)
  useEffect(() => {
    loadApplications();
  }, [filterStatus]);

  const loadApplications = () => {
    try {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Try to load from localStorage
        const stored = localStorage.getItem('bida_applications');
        let apps = stored ? JSON.parse(stored) : MOCK_APPLICATIONS;
        
        // Apply filter
        if (filterStatus !== 'all') {
          apps = apps.filter((app: Application) => app.status === filterStatus);
        }
        
        setApplications(apps);
        setLoading(false);
      }, 500);
    } catch (error: any) {
      toast.error('Failed to load applications');
      setApplications(MOCK_APPLICATIONS);
      setLoading(false);
    }
  };

  const handleStatusUpdate = (appId: string, newStatus: string) => {
    try {
      setUpdating(true);
      
      // Simulate API delay
      setTimeout(() => {
        const stored = localStorage.getItem('bida_applications');
        const apps = stored ? JSON.parse(stored) : MOCK_APPLICATIONS;
        
        const updated = apps.map((app: Application) => 
          app.id === appId 
            ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
            : app
        );
        
        localStorage.setItem('bida_applications', JSON.stringify(updated));
        toast.success('Application status updated!');
        loadApplications();
        setSelectedApp(null);
        setUpdating(false);
      }, 800);
    } catch (error: any) {
      toast.error('Failed to update status');
      setUpdating(false);
    }
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'completed':
        return 'status-badge status-completed';
      case 'approved':
        return 'status-badge status-completed';
      case 'in-progress':
        return 'status-badge status-pending';
      case 'pending':
        return 'status-badge bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'rejected':
        return 'status-badge status-delayed';
    }
  };

  const filteredApplications = applications.filter(app =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Applications Management</h2>
          <p className="text-gray-600">Track and manage all investment applications</p>
        </div>

        {/* Filters */}
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No applications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:shadow-lg transition-all"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Icon and Info */}
                  <div className="flex gap-4 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(app.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl mb-1">{app.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{app.description}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {app.applicationNo}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {app.agency}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Submitted {new Date(app.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {app.currentStep && app.totalSteps && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span>Progress: Step {app.currentStep} of {app.totalSteps}</span>
                            <span>{Math.round((app.currentStep / app.totalSteps) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                              style={{ width: `${(app.currentStep / app.totalSteps) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Status Badge and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <span className={getStatusBadge(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1).replace('-', ' ')}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </button>
                      {user?.role === 'officer' || user?.role === 'admin' ? (
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-2 rounded-lg hover:bg-purple-50"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Update Status Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl mb-4">Update Status</h3>
              <p className="text-gray-600 mb-6">{selectedApp.title}</p>
              
              <div className="space-y-3 mb-6">
                {['pending', 'in-progress', 'approved', 'rejected', 'completed'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(selectedApp.id, status)}
                    disabled={updating}
                    className="w-full p-3 rounded-xl hover:bg-blue-50 text-left disabled:opacity-50"
                    disabled={selectedApp?.status !== 'SUBMITTED'}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="w-full p-3 rounded-xl hover:bg-gray-100"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}