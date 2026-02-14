import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  CheckCircle,
  Shield,
  Zap,
  Globe2,
  HeadphonesIcon,
  UserCircle,
  Target,
  BarChart3,
  Rocket,
  Phone,
  Mail,
  ArrowLeft,
  LogOut,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ProfileCreation } from './ProfileCreation';
import { OnboardingWizard } from './OnboardingWizard';
import { InvestorDashboard } from './InvestorDashboard_OPTIMIZED';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';
import { 
  InstrumentCard,
  InstrumentSection,
  PageContainer, 
  SectionContainer, 
  Card, 
  PrimaryButton, 
  SecondaryButton, 
  IconWrap,
  Typography 
} from './ui-primitives';
import { SafeImage } from './SafeImage';
import { StarterPackageWizard } from '@/app/starter/StarterPackageWizard';
import { IntelligenceLauncher } from '@/app/intelligence/IntelligenceLauncher';

export function InvestorPortal() {
  const [view, setView] = useState<'welcome' | 'profile' | 'onboarding' | 'dashboard' | 'starter'>('starter');
  const [hasProfile, setHasProfile] = useState(false);
  const [hasCompletedStarter, setHasCompletedStarter] = useState(false);
  const [bbid, setBbid] = useState<string>('');
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  
  // 🔴 FIX 3: Query engines to determine demo investor state
  // Demo detection must be based on engine validation, not just ID matching
  useEffect(() => {
    const initializeDemoInvestor = async () => {
      // Only check if user is the demo investor
      if (user?.investorId === 'INV-DEMO-001' && user?.email === 'demo@investor.bd') {
        try {
          // Small delay to ensure seed completes first
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Query BBID engine to validate profile exists
          const { searchBBID } = await import('@/app/bbid/bbidEngine');
          const bbidRecords = searchBBID({ investorId: user.investorId });
          
          console.log('🔍 [InvestorPortal] Checking demo investor state:', {
            investorId: user.investorId,
            bbidRecordsFound: bbidRecords.length,
            bbidRecords: bbidRecords
          });
          
          // Query workflow engine to check completion status
          const { getPipeline } = await import('@/app/gov-agencies/agencyWorkflowEngine');
          const pipeline = getPipeline(user.investorId);
          
          console.log('🔍 [InvestorPortal] Pipeline state:', {
            pipelineExists: !!pipeline,
            completedSteps: pipeline?.completedSteps,
            totalSteps: pipeline?.totalSteps
          });
          
          // ✅ Demo routing is now based on ENGINE STATE, not hardcoded conditions
          if (bbidRecords.length > 0 && pipeline && pipeline.completedSteps >= 5) {
            // Engine confirms: profile exists + starter package completed
            console.log('✅ [InvestorPortal] Demo investor verified via engines:', {
              bbid: bbidRecords[0].bbid,
              completedSteps: pipeline.completedSteps,
              totalSteps: pipeline.totalSteps
            });
            
            setHasProfile(true);
            setHasCompletedStarter(true);
            setBbid(bbidRecords[0].bbid); // From engine, not cache
            setView('dashboard');
          } else {
            // Engine says incomplete - force wizard (safety fallback)
            setView('welcome');
          }
        } catch (error) {
          // On error, default to welcome screen
          setView('welcome');
        }
      }
    };
    
    initializeDemoInvestor();
  }, [user]);
  
  // 🚀 PRIORITY 1: NEW INVESTOR GOES DIRECTLY TO STARTER WIZARD
  // This must be checked FIRST to prevent ProfileCreation from rendering
  if (view === 'starter') {
    return (
      <StarterPackageWizard 
        investorId={user?.investorId || user?.id || 'temp-investor-id'}
        investorName={user?.name || user?.companyName || 'New Investor'}
        onComplete={(generatedBbid) => {
          setBbid(generatedBbid);
          setHasCompletedStarter(true);
          setHasProfile(true);
          setView('dashboard');
        }}
        onSkip={() => {
          setHasProfile(true);
          setView('dashboard');
        }}
      />
    );
  }
  
  // 🚀 FIX 1: MOUNT STARTER PACKAGE AS ENTRY POINT
  // Show StarterPackageWizard if user has profile but hasn't completed starter flow
  if (hasProfile && !hasCompletedStarter && view === 'dashboard') {
    return (
      <StarterPackageWizard 
        investorId={user?.investorId || user?.id || 'temp-investor-id'}
        investorName={user?.name || 'New Investor'}
        onComplete={(generatedBbid) => {
          setBbid(generatedBbid);
          setHasCompletedStarter(true);
          // Stay on dashboard after completion
        }}
        onSkip={() => {
          setHasCompletedStarter(true);
          // Allow skip but mark as completed
        }}
      />
    );
  }

  // Legacy profile creation - only for manual navigation, NOT default flow
  if (!hasProfile && view === 'profile') {
    return (
      <InstrumentSection>
        <div className="p-8">
          <ProfileCreation 
          onComplete={() => {
            setHasProfile(true);
            setView('dashboard');
          }}
          onBack={() => setView('welcome')}
        />
        </div>
      </InstrumentSection>
    );
  }

  if (view === 'onboarding') {
    return (
      <InstrumentSection>
        <div className="p-8">
          <OnboardingWizard 
          onComplete={() => setView('dashboard')}
          onBack={() => setView('welcome')}
        />
        </div>
      </InstrumentSection>
    );
  }

  if (view === 'dashboard') {
    return (
      <>
        <InvestorDashboard onStartOnboarding={() => setView('onboarding')} />
        <IntelligenceLauncher userProfile={{ name: user?.name || 'Investor', role: 'investor' }} />
      </>
    );
  }

  // PREMIUM GLASS CONTROL LOBBY - GOVERNMENT GRADE
  return (
    <InstrumentSection>
      <div className="min-h-screen bg-[#f5f7fb]">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/60">
        <div className="w-full px-8 xl:px-16 2xl:px-24 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-[#0f172a]">
                {t('portal.bangladeshAuthority')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <SecondaryButton className="flex items-center gap-2">
                  <HeadphonesIcon className="w-4 h-4" />
                  {t('portal.needHelp')}
                </SecondaryButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <PrimaryButton onClick={logout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  {t('portal.logout')}
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1 — Two-Column Hero: Welcome + Primary Actions */}
      <section className="py-16 bg-[#f5f7fb] relative">
        {/* Atmospheric depth */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(1200px 600px at 80% -10%, rgba(59,130,246,0.08), transparent 60%)' }}></div>
        
        <div className="w-full px-8 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN — Welcome Message & Trust */}
            <InstrumentSection>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="p-8"
              >
                {/* Badge */}
                <div className="inline-block px-6 py-3 mb-6 rounded-2xl">
                  <span className="text-[15px] font-medium text-[#475569]">
                    {t('portal.oneStopService')}
                  </span>
                </div>

                <h1 className="text-5xl font-semibold tracking-tight text-[#0f172a] mb-4 leading-relaxed">
                  {t('portal.welcomeTo')}<br />
                  {t('portal.bidaOss')}
                </h1>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {t('portal.gatewayExcellence')}
                </p>

                {/* Trust Badges Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <InstrumentCard>
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <span className="text-[15px] text-slate-600 font-medium">{t('portal.governmentVerified')}</span>
                    </div>
                  </InstrumentCard>
                  <InstrumentCard>
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <span className="text-[15px] text-slate-600 font-medium">{t('portal.secureTransparent')}</span>
                    </div>
                  </InstrumentCard>
                  <InstrumentCard>
                    <div className="p-4 flex items-center gap-3 col-span-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <span className="text-[15px] text-slate-600 font-medium">{t('portal.daysAverage')}</span>
                    </div>
                  </InstrumentCard>
                </div>

                {/* Primary CTA */}
                <div className="flex flex-col gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                    <PrimaryButton onClick={() => setView('profile')} className="w-full py-4 inline-flex items-center justify-center gap-2">
                      <Rocket className="w-5 h-5" />
                      {t('portal.startJourney')}
                      <ArrowRight className="w-5 h-5" />
                    </PrimaryButton>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                    <SecondaryButton onClick={() => setView('onboarding')} className="w-full py-4">
                      {t('portal.exploreFeatures')}
                    </SecondaryButton>
                  </motion.div>
                </div>
              </motion.div>
            </InstrumentSection>

            {/* RIGHT COLUMN — Primary Action Cards */}
            <div className="space-y-6">
              {/* Create Investor Profile */}
              <InstrumentCard onClick={() => setView('profile')}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-6 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center flex-shrink-0">
                      <UserCircle className="w-7 h-7 text-[#3b82f6]" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-lg mb-2">
                        <span className="text-xs font-semibold text-[#3b82f6] uppercase tracking-wide">{t('portal.step1')}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-[#0f172a] mb-2 tracking-tight">
                        {t('portal.createProfile')}
                      </h3>
                      <p className="text-[15px] text-slate-600 leading-relaxed">
                        {t('portal.createProfileDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span className="text-sm text-slate-600">{t('portal.singleSignOn')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span className="text-sm text-slate-600">{t('portal.autoFillForms')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span className="text-sm text-slate-600">{t('portal.saveResume')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm">
                    <span>{t('portal.getStarted')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </InstrumentCard>

              {/* Business Setup Wizard */}
              <InstrumentCard onClick={() => setView('onboarding')}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-6 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-7 h-7 text-[#3b82f6]" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-lg mb-2">
                        <span className="text-xs font-semibold text-[#3b82f6] uppercase tracking-wide">{t('portal.step2')}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-[#0f172a] mb-2 tracking-tight">
                        {t('portal.businessSetup')}
                      </h3>
                      <p className="text-[15px] text-slate-600 leading-relaxed">
                        {t('portal.businessSetupDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span className="text-sm text-slate-600">{t('portal.smartSector')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span className="text-sm text-slate-600">{t('portal.predictTimeline')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span className="text-sm text-slate-600">{t('portal.documentChecklist')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm">
                    <span>{t('portal.startApplication')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </InstrumentCard>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Thin Horizontal Authority Strip (Statistics) */}
      <section className="py-12 bg-[#f5f7fb]">
        <div className="w-full px-8 xl:px-16 2xl:px-24">
          <InstrumentSection>
            <div className="flex flex-wrap items-center justify-between gap-6 px-8 py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <div>
                  <div className="text-4xl font-semibold text-[#0f172a] tracking-tight">2,500+</div>
                  <div className="text-sm text-slate-400">{t('portal.activeInvestors')}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <div>
                  <div className="text-4xl font-semibold text-[#0f172a] tracking-tight">$1.7B+</div> {/* ✅ Realistic: Bangladesh FY2024 FDI */}
                  <div className="text-sm text-slate-400">{t('portal.fdiApproved')}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <div>
                  <div className="text-4xl font-semibold text-[#0f172a] tracking-tight">100+</div>
                  <div className="text-sm text-slate-400">{t('portal.servicesAvailable')}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <div>
                  <div className="text-4xl font-semibold text-[#0f172a] tracking-tight">17</div>
                  <div className="text-sm text-slate-400">{t('portal.investmentZones')}</div>
                </div>
              </motion.div>
            </div>
          </InstrumentSection>
        </div>
      </section>

      {/* SECTION 3 — Compact Inline Footer (Support) */}
      <section className="py-12 bg-[#f0f4fa]">
        <div className="w-full px-8 xl:px-16 2xl:px-24">
          <InstrumentSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-2xl font-semibold text-[#0f172a] mb-2">
                  {t('portal.needHelp')}?
                </h3>
                <p className="text-slate-600">{t('portal.teamReady')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0f172a]">{t('portal.hotline')}</div>
                    <div className="text-sm text-slate-600">{t('portal.hotlineNumber')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0f172a]">{t('portal.email')}</div>
                    <div className="text-sm text-slate-600">{t('portal.supportEmail')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#eef4ff] shadow-inner flex items-center justify-center">
                    <HeadphonesIcon className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0f172a]">{t('portal.liveChat')}</div>
                    <div className="text-sm text-slate-600">{t('portal.available247')}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </InstrumentSection>
        </div>
      </section>
    </div>
    </InstrumentSection>
  );
}