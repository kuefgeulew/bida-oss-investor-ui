import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, User, Building2, Shield, CheckCircle2, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_INVESTOR } from '@/app/devtools/demoInvestorSeed';
import type { User as AuthUser } from '@/contexts/AuthContext';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'investor' | 'bida_officer' | 'bank_officer' | 'utility_officer' | 'agency_officer';
  agency?: string;
  permissions: string[];
}

interface AuthSystemProps {
  onLogin?: () => void; // Optional now - pure React state
}

export function AuthSystem({ onLogin }: AuthSystemProps = {}) {
  const { login, register, setUser } = useAuth(); // ⚡ EXPOSE setUser for direct injection
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const demoAccounts = [
    { email: DEMO_INVESTOR.email, label: '🎯 Demo Investor (Completed)', icon: User, color: 'from-blue-500 to-blue-600', isDemo: true },
    { 
      email: 'newdemo@investor.bd', 
      label: '⚡ New Investor (Auto-Fill Demo)', 
      icon: UserPlus, 
      color: 'from-emerald-500 to-emerald-600',
      isAutoFillDemo: true,
      description: 'Registration form pre-filled - just click Continue'
    },
    { email: 'officer@bida.gov.bd', label: 'BIDA Officer', icon: Shield, color: 'from-purple-500 to-purple-600' },
    { email: 'admin@bida.gov.bd', label: 'Admin', icon: Building2, color: 'from-emerald-500 to-emerald-600' },
    { email: 'superadmin@bida.gov.bd', label: 'Super Admin', icon: Shield, color: 'from-red-500 to-red-600' }
  ];

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      onLogin?.();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');
    setIsLoading(true);
    
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      await register({ email, password, name, phone });
      onLogin?.();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, isDemoCompleted: boolean = false) => {
    setError('');
    setIsLoading(true);
    
    try {
      // ⚡ INSTANT DEMO INVESTOR INJECTION
      // Direct React state mutation - NO login flow, NO redirect
      if (demoEmail === DEMO_INVESTOR.email && isDemoCompleted) {
        console.log('🎯 [AuthSystem] Demo button clicked - seeding and fetching engine data...');
        console.log('🔍 [AuthSystem] Looking for investorId:', DEMO_INVESTOR.investorId);
        
        // Ensure demo investor is seeded (safe to call multiple times)
        const { seedDemoInvestor } = await import('@/app/devtools/demoInvestorSeed');
        seedDemoInvestor();
        
        // Fetch engine data to build complete user object
        const { searchBBID, getAllBBIDs } = await import('@/app/bbid/bbidEngine');
        const bbidRecords = searchBBID({ investorId: DEMO_INVESTOR.investorId });
        
        console.log('🔍 [AuthSystem] BBID search results:', {
          investorId: DEMO_INVESTOR.investorId,
          found: bbidRecords.length,
          records: bbidRecords
        });
        
        // Also check all BBIDs to see what's in the engine
        const allBBIDs = getAllBBIDs();
        console.log('🔍 [AuthSystem] All BBIDs in engine:', {
          total: allBBIDs.length,
          records: allBBIDs
        });
        
        const bbidRecord = bbidRecords.length > 0 ? bbidRecords[0] : null;
        
        if (!bbidRecord?.bbid) {
          throw new Error('Demo investor not seeded properly');
        }
        
        console.log('✅ [AuthSystem] Demo investor found:', {
          bbid: bbidRecord.bbid,
          name: bbidRecord.companyName
        });
        
        // Build complete authenticated user
        const demoUser: AuthUser = {
          id: DEMO_INVESTOR.investorId,
          email: DEMO_INVESTOR.email,
          name: DEMO_INVESTOR.name,
          phone: '+880-1700-123456',
          role: 'investor',
          companyName: DEMO_INVESTOR.name,
          investorId: DEMO_INVESTOR.investorId,
          bbid: bbidRecord.bbid
        };
        
        console.log('⚡ [AuthSystem] Injecting demo user into React state:', demoUser);
        
        // ⚡ DIRECT STATE INJECTION - This is the magic
        // React instantly re-renders InvestorDashboard because user exists
        // NO window.location, NO redirect, NO reload
        setUser(demoUser);
        setIsLoading(false);
        return;
      }
      
      // Normal login flow for other accounts
      setEmail(demoEmail);
      const demoPassword = demoEmail === DEMO_INVESTOR.email ? DEMO_INVESTOR.password : 'password123';
      setPassword(demoPassword);
      await login(demoEmail, demoPassword);
      onLogin?.();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-5xl font-semibold tracking-tight text-[#0f172a] mb-4">
              Bangladesh OSS <br />
              <span className="text-[#3b82f6]">
                Investment Platform
              </span>
            </h1>
            <p className="text-xl text-[#475569] mb-8">
              Government-grade One-Stop Service system for seamless investment approvals
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-[#475569]">Unified access to all 6 IPAs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-[#475569]">Real-time tracking & notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-[#475569]">Integrated services & payments</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#3b82f6]" />
                <span className="text-[#475569]">AI-powered advisory</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-2xl border border-[#e3ebf7]"
          >
            <div className="flex items-center gap-3 mb-6">
              <LogIn className="w-8 h-8 text-[#3b82f6]" />
              <h2 className="text-2xl font-semibold text-[#0f172a]">Sign In</h2>
            </div>

            {/* Login Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full"
                  placeholder="your.email@example.com"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#475569] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field w-full pr-12"
                    placeholder="Enter your password"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded-xl text-[#dc2626] text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-medium text-[15px] hover:bg-[#2563eb] transition-all disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            {/* Quick Access Buttons */}
            <div className="border-t border-[#e3ebf7] pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[#94a3b8]">Quick Access:</p>
                <p className="text-xs text-[#94a3b8]">password: demo123 or password123</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {demoAccounts.map((account, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleDemoLogin(account.email, account.isDemo)}
                    disabled={isLoading}
                    className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                      selectedDemo === account.email
                        ? 'bg-[#eef4ff] border-[#3b82f6]'
                        : account.isDemo
                        ? 'bg-gradient-to-r from-blue-50 to-green-50 border-[#3b82f6] hover:from-blue-100 hover:to-green-100'
                        : 'bg-white/50 border-[#e3ebf7] hover:bg-[#eef4ff]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${account.isDemo ? 'bg-gradient-to-br from-blue-500 to-green-500' : 'bg-[#3b82f6]'}`}>
                      <account.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-[#0f172a]">{account.label}</div>
                      <div className="text-xs text-[#94a3b8]">{account.email}</div>
                    </div>
                    {account.isDemo && (
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        READY
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] mt-6 text-center">
              Government-grade investment facilitation platform
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}