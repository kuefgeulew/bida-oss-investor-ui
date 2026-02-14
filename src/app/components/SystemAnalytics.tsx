import { motion } from 'motion/react';
import {
  TrendingUp,
  Users,
  FileCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  DollarSign,
  Globe,
  Zap,
  Server
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function SystemAnalytics() {
  // Mock data for analytics
  const performanceData = [
    { month: 'Aug', applications: 245, approvals: 189, avgDays: 12.5 },
    { month: 'Sep', applications: 312, approvals: 256, avgDays: 11.8 },
    { month: 'Oct', applications: 389, approvals: 334, avgDays: 10.2 },
    { month: 'Nov', applications: 456, approvals: 398, avgDays: 9.5 },
    { month: 'Dec', applications: 501, approvals: 445, avgDays: 8.9 },
    { month: 'Jan', applications: 612, approvals: 556, avgDays: 8.2 }
  ];

  const agencyPerformance = [
    { name: 'BIDA', applications: 456, approved: 398, pending: 45, rejected: 13, avgTime: 8.2 },
    { name: 'BEZA', applications: 234, approved: 201, pending: 28, rejected: 5, avgTime: 9.1 },
    { name: 'BEPZA', applications: 189, approved: 167, pending: 18, rejected: 4, avgTime: 7.8 },
    { name: 'BHTPA', applications: 145, approved: 128, pending: 14, rejected: 3, avgTime: 8.9 },
    { name: 'BSCIC', applications: 312, approved: 278, pending: 29, rejected: 5, avgTime: 9.5 },
    { name: 'PPPA', applications: 98, approved: 87, pending: 9, rejected: 2, avgTime: 10.3 }
  ];

  const sectorDistribution = [
    { name: 'Textiles & Garments', value: 28, color: '#3b82f6' },
    { name: 'Technology', value: 18, color: '#8b5cf6' },
    { name: 'Pharmaceuticals', value: 15, color: '#10b981' },
    { name: 'Manufacturing', value: 14, color: '#f59e0b' },
    { name: 'Energy', value: 12, color: '#ef4444' },
    { name: 'Infrastructure', value: 8, color: '#ec4899' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const apiUsage = [
    { hour: '00:00', requests: 1240 },
    { hour: '04:00', requests: 890 },
    { hour: '08:00', requests: 3420 },
    { hour: '12:00', requests: 5680 },
    { hour: '16:00', requests: 4230 },
    { hour: '20:00', requests: 2890 }
  ];

  const investmentByCountry = [
    { country: 'China', amount: 4.2, projects: 45 },
    { country: 'India', amount: 3.8, projects: 62 },
    { country: 'Japan', amount: 2.9, projects: 28 },
    { country: 'USA', amount: 2.5, projects: 34 },
    { country: 'UK', amount: 1.8, projects: 21 },
    { country: 'South Korea', amount: 1.6, projects: 19 },
    { country: 'Others', amount: 3.2, projects: 103 }
  ];

  const slaCompliance = [
    { service: 'Company Registration', sla: 3, avgTime: 2.1, compliance: 98 },
    { service: 'Environmental Clearance', sla: 15, avgTime: 12.5, compliance: 87 },
    { service: 'Fire Safety Certificate', sla: 7, avgTime: 6.2, compliance: 93 },
    { service: 'Trade License', sla: 5, avgTime: 4.1, compliance: 95 },
    { service: 'Factory License', sla: 10, avgTime: 8.9, compliance: 89 },
    { service: 'Utility Connection', sla: 14, avgTime: 11.3, compliance: 84 }
  ];

  const systemMetrics = [
    {
      id: 'total-applications',
      title: 'Total Applications',
      value: '1,434',
      change: '+18.2%',
      trend: 'up',
      icon: FileCheck,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'active-investors',
      title: 'Active Investors',
      value: '892',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'avg-processing-time',
      title: 'Avg Processing Time',
      value: '8.2 days',
      change: '-15.8%',
      trend: 'down',
      icon: Clock,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'investment-value',
      title: 'Investment Value',
      value: '$20B',
      change: '+24.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const [selectedMetric, setSelectedMetric] = useState(systemMetrics[0].id);
  const selectedMetricData = systemMetrics.find(metric => metric.id === selectedMetric);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          System Analytics Dashboard
        </h1>
        <p className="text-xl text-gray-600">Cross-Agency Performance & API Usage Statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6"
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600 mb-2">{metric.title}</div>
            <div className={`text-xs flex items-center gap-1 ${
              metric.trend === 'up' ? 'text-green-600' : 'text-emerald-600'
            }`}>
              {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Trends */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-blue-600" />
          Application & Approval Trends
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorApprovals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="applications" 
              stroke="#3b82f6" 
              fillOpacity={1}
              fill="url(#colorApplications)" 
              strokeWidth={2}
              name="Applications Submitted"
            />
            <Area 
              type="monotone" 
              dataKey="approvals" 
              stroke="#10b981" 
              fillOpacity={1}
              fill="url(#colorApprovals)" 
              strokeWidth={2}
              name="Approvals Granted"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Agency Performance & Sector Distribution */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-purple-600" />
            Agency Performance Comparison
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={agencyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="approved" fill="#10b981" name="Approved" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" name="Rejected" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Activity className="w-7 h-7 text-emerald-600" />
            Investment by Sector
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={sectorDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* API Usage */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Server className="w-7 h-7 text-orange-600" />
          API Usage (Last 24 Hours)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={apiUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="hour" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="requests" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 5 }}
              name="API Requests"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Investment by Country */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Globe className="w-7 h-7 text-blue-600" />
          FDI by Source Country
        </h2>
        <div className="space-y-4">
          {investmentByCountry.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              <div className="w-32 text-right font-semibold text-gray-900">{country.country}</div>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(country.amount / 4.2) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-end pr-3"
                  >
                    <span className="text-white font-semibold text-sm">${country.amount}B</span>
                  </motion.div>
                </div>
              </div>
              <div className="w-24 text-right text-sm text-gray-600">{country.projects} projects</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SLA Compliance */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Zap className="w-7 h-7 text-yellow-600" />
          SLA Compliance & Processing Times
        </h2>
        <div className="space-y-4">
          {slaCompliance.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl hover:bg-white/50 transition-all border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{service.service}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>SLA: {service.sla} days</span>
                    <span>Avg: {service.avgTime} days</span>
                    <span className={`font-semibold ${
                      service.compliance >= 95 ? 'text-green-600' :
                      service.compliance >= 85 ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {service.compliance}% compliance
                    </span>
                  </div>
                </div>
                {service.compliance >= 95 ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : service.compliance >= 85 ? (
                  <Clock className="w-6 h-6 text-orange-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${service.compliance}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    service.compliance >= 95 ? 'bg-green-500' :
                    service.compliance >= 85 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Agency Performance Table */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Agency Performance Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Agency</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900">Applications</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900">Approved</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900">Pending</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900">Rejected</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900">Avg Time</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {agencyPerformance.map((agency, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-white/50"
                >
                  <td className="py-4 px-4 font-semibold text-gray-900">{agency.name}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{agency.applications}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {agency.approved}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {agency.pending}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {agency.rejected}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-600">{agency.avgTime} days</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-semibold ${
                      (agency.approved / agency.applications * 100) >= 90 ? 'text-green-600' :
                      (agency.approved / agency.applications * 100) >= 80 ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {Math.round(agency.approved / agency.applications * 100)}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Metric Overview */}
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-6">{selectedMetricData?.name} Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{selectedMetricData?.value}</div>
              <div className="text-sm text-gray-600 mb-2">{selectedMetricData?.title}</div>
              <div className={`text-xs flex items-center gap-1 ${
                selectedMetricData?.trend === 'up' ? 'text-green-600' : 'text-emerald-600'
              }`}>
                {selectedMetricData?.trend === 'up' ? '↑' : '↓'} {selectedMetricData?.change}
              </div>
            </div>
          </div>
          <div className="p-8">
            <h4 className="font-semibold mb-4">Detailed Metrics</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Total Applications</div>
                <div className="text-gray-900">1,434</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Active Investors</div>
                <div className="text-gray-900">892</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Avg Processing Time</div>
                <div className="text-gray-900">8.2 days</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-600">Investment Value</div>
                <div className="text-gray-900">$20B</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}