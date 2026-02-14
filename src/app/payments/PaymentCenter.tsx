// 💰 PAYMENT CENTER — Compact investor-facing payment management interface
// ARCHITECTURE: READ-ONLY panel that projects paymentEngine state
// MOUNT: Investor Dashboard (if needed)

import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Clock,
  Building2,
  Receipt,
  ArrowRight,
  DollarSign,
  PieChart,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { getAllPayments, getPendingPayments, type Payment } from './paymentEngine';
import { GOVERNMENT_AGENCIES } from '@/app/gov-agencies/agencyRegistry';

interface PaymentCenterProps {
  bbid: string; // ✅ Identity prop only - engine will be queried
  investorId?: string;
}

export function PaymentCenter({ bbid, investorId }: PaymentCenterProps) {
  const [view, setView] = useState<'pending' | 'history' | 'receipts'>('pending');

  // ✅ READ FROM REAL PAYMENT ENGINE - NO MOCK DATA
  const allPayments = useMemo(() => getAllPayments(bbid), [bbid]);
  const pendingPaymentsData = useMemo(() => getPendingPayments(bbid), [bbid]);
  
  // ✅ DERIVE UI STATE FROM ENGINE DATA
  const pendingPayments = useMemo(() => 
    allPayments
      .filter(p => p.status === 'pending' || p.status === 'processing')
      .map(p => ({
        invoiceId: p.invoiceId,
        serviceName: p.description,
        payableAgency: p.paidTo || 'Government Agency',
        feeAmount: p.amount,
        status: 'pending' as const,
        generatedDate: p.createdAt || new Date().toISOString().split('T')[0],
        dueDate: p.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      })),
    [allPayments]
  );
  
  const paidPayments = useMemo(() => 
    allPayments
      .filter(p => p.status === 'completed' || p.status === 'confirmed')
      .map(p => ({
        invoiceId: p.invoiceId,
        serviceName: p.description,
        payableAgency: p.paidTo || 'Government Agency',
        feeAmount: p.amount,
        status: 'paid' as const,
        generatedDate: p.createdAt || new Date().toISOString().split('T')[0],
        dueDate: p.dueDate || '',
        paidDate: p.paidAt || p.confirmedAt || new Date().toISOString().split('T')[0],
        receiptId: `RCP-${p.invoiceId.split('-')[1]}`,
        transactionId: p.transactionId || `TXN-${p.invoiceId.split('-')[1]}`,
        paymentMethod: p.paymentMethod || 'bank_transfer'
      })),
    [allPayments]
  );
  
  const totalPaid = useMemo(() => 
    paidPayments.reduce((sum, p) => sum + p.feeAmount, 0),
    [paidPayments]
  );
  
  const totalPending = useMemo(() => 
    pendingPayments.reduce((sum, p) => sum + p.feeAmount, 0),
    [pendingPayments]
  );
  
  // ✅ DERIVE FEE BREAKDOWN FROM GOVERNMENT AGENCIES + PAYMENTS
  const feeBreakdown = useMemo(() => {
    // Group payments by agency
    const agencyGroups = new Map<string, { name: string, fees: { name: string, amount: number }[] }>();
    
    allPayments.forEach(payment => {
      const agencyName = payment.paidTo || 'Other Agencies';
      
      if (!agencyGroups.has(agencyName)) {
        agencyGroups.set(agencyName, {
          name: agencyName,
          fees: []
        });
      }
      
      agencyGroups.get(agencyName)!.fees.push({
        name: payment.description,
        amount: payment.amount
      });
    });
    
    // Convert to array and add totals
    const breakdown = Array.from(agencyGroups.values()).map((agency, index) => ({
      agency: agency.name,
      fees: agency.fees,
      total: agency.fees.reduce((sum, fee) => sum + fee.amount, 0),
      color: ['blue', 'green', 'red', 'purple', 'orange', 'cyan'][index % 6] as const
    }));
    
    return breakdown;
  }, [allPayments]);
  
  // ✅ EMPTY STATE HANDLING - If no payments exist
  if (allPayments.length === 0) {
    return null; // Don't show anything when no payments
  }

  return (
    <div className="space-y-3">
      {/* Compact Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 rounded-xl p-3 border border-orange-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] text-orange-700 mb-1 font-semibold">Pending Payments</div>
              <div className="text-2xl font-bold text-orange-600">৳{totalPending.toLocaleString()}</div>
              <div className="text-[10px] text-orange-600/70 mt-0.5">{pendingPayments.length} invoices</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-xl p-3 border border-green-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] text-green-700 mb-1 font-semibold">Total Paid</div>
              <div className="text-2xl font-bold text-green-600">৳{totalPaid.toLocaleString()}</div>
              <div className="text-[10px] text-green-600/70 mt-0.5">{paidPayments.length} receipts</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 rounded-xl p-3 border border-blue-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] text-blue-700 mb-1 font-semibold">All Transactions</div>
              <div className="text-2xl font-bold text-blue-600">{allPayments.length}</div>
              <div className="text-[10px] text-blue-600/70 mt-0.5">Lifetime total</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
              <Receipt className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Compact Tab Navigation */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e3ebf7] shadow-md p-1 flex gap-1">
        <button
          onClick={() => setView('pending')}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            view === 'pending'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-white/50'
          }`}
        >
          <AlertCircle className="w-3 h-3" />
          Pending ({pendingPayments.length})
        </button>
        <button
          onClick={() => setView('history')}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            view === 'history'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-white/50'
          }`}
        >
          <Clock className="w-3 h-3" />
          Payment History
        </button>
        <button
          onClick={() => setView('receipts')}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
            view === 'receipts'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-white/50'
          }`}
        >
          <Receipt className="w-3 h-3" />
          Receipts ({paidPayments.length})
        </button>
      </div>

      {/* Content Area with Payments */}
      <div className="space-y-2">
        {view === 'pending' && (
          <>
            {pendingPayments.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e3ebf7] shadow-md p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <div className="text-base font-bold text-slate-700">No Pending Payments</div>
                <div className="text-xs text-slate-600 mt-1">All your invoices are paid!</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {pendingPayments.map((invoice, index) => (
                  <motion.div 
                    key={invoice.invoiceId}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e3ebf7] shadow-md p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#0f172a]">
                            {invoice.serviceName}
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 inline-block mt-1">
                            PENDING
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-600 space-y-1 mb-4">
                      <div className="flex items-start justify-between">
                        <span>Agency:</span>
                        <span className="font-medium text-right">{invoice.payableAgency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Invoice:</span>
                        <span className="font-mono text-[10px]">{invoice.invoiceId}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Due Date:</span>
                        <span className="font-medium">{new Date(invoice.dueDate).toLocaleDateString('en-BD')}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <div className="text-2xl font-bold text-orange-600">
                        ৳{invoice.feeAmount.toLocaleString()}
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all shadow-md text-xs font-semibold flex items-center gap-1">
                        Pay Now <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'history' && (
          <div className="grid grid-cols-2 gap-3">
            {allPayments.map((payment, index) => {
              const isPaid = payment.status === 'completed' || payment.status === 'confirmed';
              return (
                <motion.div 
                  key={payment.invoiceId}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e3ebf7] shadow-md p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="text-sm font-bold text-[#0f172a] truncate">{payment.description}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ml-2 ${
                      isPaid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {isPaid ? 'PAID' : 'PENDING'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mb-3">
                    {payment.paidTo || 'Government Agency'} • {new Date(payment.createdAt || '').toLocaleDateString('en-BD')}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="text-xl font-bold text-slate-800">
                      ৳{payment.amount.toLocaleString()}
                    </div>
                    {isPaid && payment.paidAt && (
                      <div className="text-xs text-green-600 font-semibold">
                        ✓ Paid {new Date(payment.paidAt).toLocaleDateString('en-BD')}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {view === 'receipts' && (
          <div className="grid grid-cols-2 gap-3">
            {paidPayments.map((payment, index) => (
              <motion.div 
                key={payment.receiptId}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e3ebf7] shadow-md p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#0f172a] truncate">{payment.serviceName}</div>
                    <div className="text-[10px] text-green-600 font-semibold">✓ PAID</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Receipt ID:</span>
                    <span className="font-mono text-[10px]">{payment.receiptId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Transaction:</span>
                    <span className="font-mono text-[10px]">{payment.transactionId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Method:</span>
                    <span className="font-medium text-[10px]">{payment.paymentMethod?.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <div className="text-2xl font-bold text-green-600">
                    ৳{payment.feeAmount.toLocaleString()}
                  </div>
                  <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all shadow-md text-xs font-semibold flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* GOVERNMENT FEE BREAKDOWN - Now from real data */}
      {feeBreakdown.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e3ebf7] shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0f172a]">Government Fee Breakdown</h3>
              <p className="text-xs text-slate-600">100% transparency: See exactly where every taka goes</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {feeBreakdown.map((agency, index) => (
              <motion.div
                key={agency.agency}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all"
              >
                <h4 className="text-sm font-bold text-[#0f172a] mb-3">{agency.agency}</h4>
                <div className="space-y-2 mb-3">
                  {agency.fees.map((fee, feeIndex) => (
                    <div key={feeIndex} className="flex items-start justify-between text-xs">
                      <span className="text-slate-600 flex-1 mr-2">{fee.name}</span>
                      <span className="text-slate-800 font-semibold whitespace-nowrap">৳{fee.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0f172a]">Total:</span>
                  <span className={`text-lg font-bold ${
                    agency.color === 'blue' ? 'text-blue-600' :
                    agency.color === 'green' ? 'text-green-600' :
                    agency.color === 'red' ? 'text-red-600' :
                    agency.color === 'purple' ? 'text-purple-600' :
                    agency.color === 'orange' ? 'text-orange-600' :
                    'text-cyan-600'
                  }`}>৳{agency.total.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ANTI-CORRUPTION SECTION */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-xl border-2 border-green-300 shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[#0f172a] mb-1 flex items-center gap-2">
              ✅ No Unofficial Payments Required
            </h3>
            <p className="text-xs text-slate-700 mb-3">
              BIDA OSS is a <span className="font-bold text-green-700">corruption-free zone</span>. All fees are official, regulated, 
              and paid directly to government accounts through digital banking.
            </p>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-green-200">
                <div className="text-xs font-bold text-[#0f172a] mb-1">✓ Fixed Fees</div>
                <div className="text-[10px] text-slate-600">All fees set by law. No negotiations, no "speed money"</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-green-200">
                <div className="text-xs font-bold text-[#0f172a] mb-1">✓ Digital Receipts</div>
                <div className="text-[10px] text-slate-600">Every payment generates a government-verified receipt</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-green-200">
                <div className="text-xs font-bold text-[#0f172a] mb-1">✓ Traceable Transactions</div>
                <div className="text-[10px] text-slate-600">All payments tracked in blockchain-style audit trail</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-green-200">
                <div className="text-xs font-bold text-[#0f172a] mb-1">✓ Report Corruption</div>
                <div className="text-[10px] text-slate-600">Hotline: 106 | Email: anticorruption@bida.gov.bd</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-2 text-white text-center">
          <div className="text-xs font-bold">
            👮 BIDA Guarantee: If any official asks for unofficial payment, report immediately. We will fast-track your application.
          </div>
        </div>
      </div>
    </div>
  );
}