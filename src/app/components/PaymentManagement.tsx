import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle,
  FileText,
  Calendar,
  TrendingUp,
  Wallet,
  AlertCircle
} from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  transactionId?: string;
  category: string;
}

interface PendingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock payment history data
const mockPaymentHistory: Payment[] = [
  {
    id: 'PAY-001',
    date: '2026-02-10',
    description: 'RJSC Company Registration Fee',
    amount: 7500,
    status: 'completed',
    transactionId: 'TXN-BD-20260210-001',
    category: 'Registration'
  },
  {
    id: 'PAY-002',
    date: '2026-02-08',
    description: 'DOE Environmental Clearance',
    amount: 75000,
    status: 'completed',
    transactionId: 'TXN-BD-20260208-002',
    category: 'Compliance'
  },
  {
    id: 'PAY-003',
    date: '2026-02-05',
    description: 'Fire Service Inspection Fee',
    amount: 11000,
    status: 'completed',
    transactionId: 'TXN-BD-20260205-003',
    category: 'Permits'
  },
  {
    id: 'PAY-004',
    date: '2026-01-28',
    description: 'BIDA OSS Service Bundle',
    amount: 50000,
    status: 'completed',
    transactionId: 'TXN-BD-20260128-004',
    category: 'Services'
  }
];

const mockPendingPayments: PendingPayment[] = [
  {
    id: 'PEND-001',
    description: 'DIFE Factory License Annual Fee',
    amount: 25000,
    dueDate: '2026-02-20',
    category: 'License',
    priority: 'high'
  },
  {
    id: 'PEND-002',
    description: 'Trade License Renewal',
    amount: 5000,
    dueDate: '2026-03-01',
    category: 'License',
    priority: 'medium'
  }
];

export function PaymentHistory() {
  const [payments] = useState<Payment[]>(mockPaymentHistory);

  const handleDownloadReceipt = (paymentId: string) => {
    // Simulate receipt download
    console.log(`Downloading receipt for payment: ${paymentId}`);
    // In real implementation, this would trigger PDF download
    setTimeout(() => {
      alert(`Receipt for ${paymentId} downloaded successfully!`);
    }, 500);
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Payment['status']) => {
    const styles = {
      completed: 'bg-emerald-100 text-emerald-800',
      pending: 'bg-amber-100 text-amber-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold">Payment History</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Paid</p>
          <p className="text-2xl font-bold text-emerald-600">৳{totalPaid.toLocaleString()}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No payment history yet</p>
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                      {payment.transactionId && (
                        <p className="text-xs text-gray-500 font-mono mt-1">{payment.transactionId}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {payment.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-semibold text-gray-900">
                    ৳{payment.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(payment.status)}
                      {getStatusBadge(payment.status)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {payment.status === 'completed' && (
                      <button
                        onClick={() => handleDownloadReceipt(payment.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PendingPayments() {
  const [payments] = useState<PendingPayment[]>(mockPendingPayments);

  const getPriorityStyle = (priority: PendingPayment['priority']) => {
    const styles = {
      high: 'border-l-4 border-red-500 bg-red-50',
      medium: 'border-l-4 border-amber-500 bg-amber-50',
      low: 'border-l-4 border-blue-500 bg-blue-50'
    };
    return styles[priority];
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalPending = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold">Pending Payments</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Due</p>
          <p className="text-2xl font-bold text-amber-600">৳{totalPending.toLocaleString()}</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-300" />
          <p className="font-medium">All payments up to date!</p>
          <p className="text-sm mt-1">No pending payments at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment, index) => {
            const daysUntilDue = getDaysUntilDue(payment.dueDate);
            const isOverdue = daysUntilDue < 0;
            const isUrgent = daysUntilDue <= 7 && daysUntilDue >= 0;

            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-5 rounded-lg ${getPriorityStyle(payment.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{payment.description}</h4>
                      <span className="text-xs px-2 py-1 bg-white/70 text-gray-700 rounded">
                        {payment.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(payment.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className={`flex items-center gap-1 font-medium ${
                        isOverdue ? 'text-red-700' : isUrgent ? 'text-amber-700' : 'text-gray-600'
                      }`}>
                        {isOverdue ? (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            <span>Overdue by {Math.abs(daysUntilDue)} days</span>
                          </>
                        ) : (
                          <span>{daysUntilDue} days remaining</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-gray-900">৳{payment.amount.toLocaleString()}</p>
                    <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                      Pay Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function InstallmentPlanner() {
  const totalAmount = 118500;
  const installmentOptions = [
    { months: 3, monthlyAmount: Math.ceil(totalAmount / 3), interestRate: 0 },
    { months: 6, monthlyAmount: Math.ceil(totalAmount / 6), interestRate: 2 },
    { months: 12, monthlyAmount: Math.ceil(totalAmount / 12), interestRate: 5 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold">Installment Plans</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Split your payments into manageable installments. Interest-free option available for 3-month plan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {installmentOptions.map((option, index) => (
          <motion.div
            key={option.months}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border-2 hover:border-purple-500 transition-all cursor-pointer ${
              option.interestRate === 0 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
            }`}
          >
            {option.interestRate === 0 && (
              <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full mb-3">
                RECOMMENDED
              </div>
            )}
            <h4 className="text-lg font-bold text-gray-900 mb-2">{option.months} Months</h4>
            <p className="text-3xl font-bold text-purple-600 mb-1">
              ৳{option.monthlyAmount.toLocaleString()}
              <span className="text-sm font-normal text-gray-600">/month</span>
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-semibold">{option.interestRate}%</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">
                  ৳{Math.ceil(totalAmount * (1 + option.interestRate / 100)).toLocaleString()}
                </span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
              Select Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function EscrowBalance() {
  const escrowBalance = 500000;
  const escrowReserved = 118500;
  const escrowAvailable = escrowBalance - escrowReserved;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl shadow-sm p-8 border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Escrow Account Balance</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Balance</p>
          <p className="text-3xl font-bold text-gray-900">৳{escrowBalance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Reserved for Fees</p>
          <p className="text-3xl font-bold text-gray-900">৳{escrowReserved.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Available</p>
          <p className="text-3xl font-bold text-emerald-600">৳{escrowAvailable.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-indigo-200">
        <p className="text-sm text-gray-700 font-semibold mb-2">📌 Escrow Status</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Account Status:</span>
            <span className="font-semibold text-gray-900">✅ Active</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Auto-debit:</span>
            <span className="font-semibold text-gray-900">Enabled</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Next Payment:</span>
            <span className="font-semibold text-gray-900">Feb 20, 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}