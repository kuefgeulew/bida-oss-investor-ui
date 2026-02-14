import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  CheckCircle2, 
  Loader2,
  Shield,
  Lock,
  AlertCircle
} from 'lucide-react';
import { API } from '@/app/api/mockAPI';

interface PaymentGatewayProps {
  amount: number;
  description: string;
  investorId: string;
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, enabled: true },
  { id: 'mobile', name: 'Mobile Banking', icon: Smartphone, enabled: true },
  { id: 'internet', name: 'Internet Banking', icon: Building2, enabled: true }
];

const mobileBankingProviders = [
  { id: 'bkash', name: 'bKash', logo: '🅱️' },
  { id: 'nagad', name: 'Nagad', logo: '🅽' },
  { id: 'rocket', name: 'Rocket', logo: '🚀' },
  { id: 'upay', name: 'Upay', logo: '💳' }
];

const banks = [
  'Sonali Bank', 'HSBC Bangladesh', 'Standard Chartered', 
  'Dutch-Bangla Bank', 'Brac Bank', 'City Bank'
];

export function PaymentGateway({ 
  amount, 
  description, 
  investorId, 
  onSuccess, 
  onCancel 
}: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [transactionId, setTransactionId] = useState('');

  // Card payment form
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Mobile banking form
  const [mobileForm, setMobileForm] = useState({
    provider: 'bkash',
    number: '',
    pin: ''
  });

  // Internet banking form
  const [bankingForm, setBankingForm] = useState({
    bank: '',
    username: '',
    password: ''
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardForm({ ...cardForm, number: value });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setCardForm({ ...cardForm, expiry: value });
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Initiate payment
      const initResponse = await API.payment.initiatePayment({
        amount,
        currency: 'BDT',
        description,
        investorId
      });

      if (!initResponse.success || !initResponse.data) {
        throw new Error('Failed to initiate payment');
      }

      const { sessionId } = initResponse.data;

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verify payment
      const verifyResponse = await API.payment.verifyPayment(sessionId);

      if (verifyResponse.success && verifyResponse.data?.status === 'success') {
        setPaymentStatus('success');
        setTransactionId(verifyResponse.data.transactionId || '');
        
        // Create audit log
        await API.audit.createLog({
          actor: `Investor ${investorId}`,
          action: 'Payment Completed',
          entity: `Payment - ${sessionId}`,
          details: `Successfully paid BDT ${amount} for ${description}`
        });

        setTimeout(() => {
          onSuccess(verifyResponse.data!.transactionId || '');
        }, 2000);
      } else {
        throw new Error('Payment verification failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      
      setTimeout(() => {
        setPaymentStatus('idle');
        setIsProcessing(false);
      }, 3000);
    }
  };

  const isFormValid = () => {
    if (selectedMethod === 'card') {
      return cardForm.number.length === 16 && 
             cardForm.name.length > 0 && 
             cardForm.expiry.length === 5 && 
             cardForm.cvv.length === 3;
    } else if (selectedMethod === 'mobile') {
      return mobileForm.number.length === 11 && mobileForm.pin.length === 4;
    } else if (selectedMethod === 'internet') {
      return bankingForm.bank && bankingForm.username && bankingForm.password;
    }
    return false;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold">Payment Center</h3>
      </div>

      {/* PAYMENT FORM - CENTERED */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {paymentStatus === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 rounded-2xl border border-[#e3ebf7] text-center"
            >
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment securely...</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>SSL Encrypted • Secure Payment Gateway</span>
              </div>
            </motion.div>
          )}

          {paymentStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 rounded-2xl border border-[#e3ebf7] text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your payment of <span className="font-semibold">BDT {amount.toLocaleString()}</span> has been processed successfully.
              </p>
              <div className="p-4 bg-gray-50 mb-6">
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono text-lg font-semibold">{transactionId}</p>
              </div>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to your registered email address.
              </p>
            </motion.div>
          )}

          {paymentStatus === 'failed' && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 rounded-2xl border border-[#e3ebf7] text-center"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Payment Failed</h3>
              <p className="text-gray-600">
                Unfortunately, your payment could not be processed. Please try again.
              </p>
            </motion.div>
          )}

          {paymentStatus === 'idle' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Secure Payment</h2>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm font-medium">SSL Secured</span>
                  </div>
                </div>
                <p className="text-gray-600">{description}</p>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Amount to Pay:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ৳ {amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-6">
                <h3 className="font-semibold mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      disabled={!method.enabled}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMethod === method.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      } ${!method.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <method.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">{method.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <div className="p-6">
                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-4">Card Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        value={formatCardNumber(cardForm.number)}
                        onChange={handleCardNumberChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={cardForm.expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="password"
                          value={cardForm.cvv}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 3 && /^\d*$/.test(value)) {
                              setCardForm({ ...cardForm, cvv: value });
                            }
                          }}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'mobile' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-4">Mobile Banking</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Provider</label>
                      <div className="grid grid-cols-4 gap-2">
                        {mobileBankingProviders.map((provider) => (
                          <button
                            key={provider.id}
                            onClick={() => setMobileForm({ ...mobileForm, provider: provider.id })}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              mobileForm.provider === provider.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">{provider.logo}</div>
                            <div className="text-xs font-medium">{provider.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Mobile Number</label>
                      <input
                        type="tel"
                        value={mobileForm.number}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 11 && /^\d*$/.test(value)) {
                            setMobileForm({ ...mobileForm, number: value });
                          }
                        }}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">PIN</label>
                      <input
                        type="password"
                        value={mobileForm.pin}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 4 && /^\d*$/.test(value)) {
                            setMobileForm({ ...mobileForm, pin: value });
                          }
                        }}
                        placeholder="••••"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === 'internet' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-4">Internet Banking</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Bank</label>
                      <select
                        value={bankingForm.bank}
                        onChange={(e) => setBankingForm({ ...bankingForm, bank: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Choose your bank...</option>
                        {banks.map((bank) => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Username</label>
                      <input
                        type="text"
                        value={bankingForm.username}
                        onChange={(e) => setBankingForm({ ...bankingForm, username: e.target.value })}
                        placeholder="Your bank username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        value={bankingForm.password}
                        onChange={(e) => setBankingForm({ ...bankingForm, password: e.target.value })}
                        placeholder="Your bank password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePayment}
                  disabled={!isFormValid() || isProcessing}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Pay ৳ {amount.toLocaleString()}
                </button>
                <button
                  onClick={onCancel}
                  disabled={isProcessing}
                  className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>

              {/* Security Notice */}
              <div className="p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">Secure Payment</p>
                    <p>Your payment information is encrypted and secured by SSLCommerz, the leading payment gateway in Bangladesh. We never store your card details.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}