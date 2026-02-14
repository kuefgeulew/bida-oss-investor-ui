// 💰 ADMIN REVENUE PANEL — Financial intelligence dashboard
// ARCHITECTURE: UI layer. Reads paymentEngine to display revenue analytics.

import React, { useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { DollarSign, TrendingUp, Building2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { getAllPaymentsAcrossAllBBIDs } from '@/app/payments/paymentEngine';
import { PaymentInvoice } from '@/app/payments/paymentEngine';

interface AdminRevenuePanelProps {
  // No props needed - reads directly from engine
}

export function AdminRevenuePanel({}: AdminRevenuePanelProps = {}) {
  // 💰 GAP 4 FIX: READ FROM REAL PAYMENT ENGINE
  const allPayments = useMemo(() => getAllPaymentsAcrossAllBBIDs(), []);
  
  const paidPayments = allPayments.filter(p => p.status === 'paid');
  const unpaidPayments = allPayments.filter(p => p.status !== 'paid');
  
  const totalRevenue = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const paidCount = paidPayments.length;
  const unpaidCount = unpaidPayments.length;
  const unpaidRevenue = unpaidPayments.reduce((sum, p) => sum + p.amount, 0);
  
  // Group by agency (using serviceId as proxy)
  const agencyBreakdown = useMemo(() => {
    const grouped = new Map<string, { amount: number; count: number }>();
    
    paidPayments.forEach(payment => {
      const agency = payment.description.split(' ')[0] || 'Other'; // Extract agency from description
      const current = grouped.get(agency) || { amount: 0, count: 0 };
      grouped.set(agency, {
        amount: current.amount + payment.amount,
        count: current.count + 1
      });
    });
    
    return Array.from(grouped.entries())
      .map(([agency, data]) => ({ agency, ...data }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [paidPayments]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  const totalTransactions = paidCount + unpaidCount;
  const collectionRate = totalTransactions > 0 ? Math.round((paidCount / totalTransactions) * 100) : 0;
  const paidRevenue = totalRevenue;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">💰 Revenue Intelligence</h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time financial analytics from payment engine
          </p>
        </div>
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
          {collectionRate}% Collection Rate
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-blue-900">
                ৳{(paidRevenue / 1000000).toFixed(2)}M
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {paidCount} paid transactions
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium mb-1">Paid Services</p>
              <p className="text-3xl font-bold text-green-900">{paidCount}</p>
              <p className="text-xs text-green-600 mt-1">
                Services completed
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium mb-1">Pending Revenue</p>
              <p className="text-3xl font-bold text-yellow-900">
                ৳{(unpaidRevenue / 1000000).toFixed(2)}M
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                {unpaidCount} unpaid invoices
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium mb-1">Avg Transaction</p>
              <p className="text-3xl font-bold text-purple-900">
                ৳{Math.round(paidRevenue / paidCount / 1000)}K
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Per service fee
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agency Revenue Breakdown - Bar Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Revenue by Agency
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agencyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="agency" 
                tick={{ fontSize: 12 }} 
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value: any) => [`৳${(value / 1000).toFixed(0)}K`, 'Revenue']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Status - Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Payment Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Paid', value: paidCount, color: '#10b981' },
                  { name: 'Pending', value: unpaidCount, color: '#f59e0b' }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { name: 'Paid', value: paidCount, color: '#10b981' },
                  { name: 'Pending', value: unpaidCount, color: '#f59e0b' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Agency Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Agency-wise Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Agency</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Transactions</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Fee</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {agencyBreakdown.map((agency, idx) => {
                const avgFee = agency.amount / agency.count;
                const percentOfTotal = (agency.amount / totalRevenue) * 100;
                
                return (
                  <tr key={agency.agency} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <span className="font-medium text-gray-900">{agency.agency}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-gray-900">
                      ৳{(agency.amount / 1000).toFixed(0)}K
                    </td>
                    <td className="text-right py-3 px-4 text-gray-600">
                      {agency.count}
                    </td>
                    <td className="text-right py-3 px-4 text-gray-600">
                      ৳{(avgFee / 1000).toFixed(1)}K
                    </td>
                    <td className="text-right py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${percentOfTotal}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-12 text-right">
                          {percentOfTotal.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 bg-gray-50">
                <td className="py-3 px-4 font-bold text-gray-900">Total</td>
                <td className="text-right py-3 px-4 font-bold text-gray-900">
                  ৳{(totalRevenue / 1000000).toFixed(2)}M
                </td>
                <td className="text-right py-3 px-4 font-bold text-gray-900">
                  {agencyBreakdown.reduce((sum, a) => sum + a.count, 0)}
                </td>
                <td className="text-right py-3 px-4 font-bold text-gray-900">
                  ৳{(totalRevenue / agencyBreakdown.reduce((sum, a) => sum + a.count, 0) / 1000).toFixed(1)}K
                </td>
                <td className="text-right py-3 px-4 font-bold text-gray-900">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* System Notes */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">📊 Revenue Intelligence Notes</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Data sourced from <code className="bg-blue-100 px-1 py-0.5 rounded">paymentEngine.ts</code></li>
              <li>Real-time collection rate: {collectionRate}% (Industry benchmark: 85%)</li>
              <li>{unpaidCount} invoices pending follow-up</li>
              <li>Top revenue agency: {agencyBreakdown[0].agency} (৳{(agencyBreakdown[0].amount / 1000000).toFixed(2)}M)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}