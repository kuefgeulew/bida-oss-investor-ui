import { BackButton } from './BackButton';
import { PublicTransparencyPortal } from './PublicTransparencyPortal';
import { SafeImage } from './SafeImage';
import { getHomepageImage, getFeatureImage } from '@/app/config/photoManifest';
import { 
  InstrumentSection,
  InstrumentCard,
  PrimaryButton,
  SecondaryButton,
  PageContainer
} from './ui-primitives';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  Users,
  Briefcase,
  MapPin,
  TrendingUp,
  Zap,
  FileCheck,
  CheckCircle2,
  Eye,
  BarChart3,
  Shield
} from 'lucide-react';

// 📊 PHASE 2.7: FDI MONITOR INTELLIGENCE
import { FDIMonitorPanel } from '../fdi/FDIMonitorPanel';

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  const { t } = useLanguage();
  const [showTransparency, setShowTransparency] = useState(false);

  // If transparency portal is open, show it
  if (showTransparency) {
    return (
      <div className="min-h-screen bg-[#f5f7fb]">
        <PageContainer>
          <BackButton onClick={() => setShowTransparency(false)} label={t('common.backToHome')} />
          <div className="mt-10">
            <PublicTransparencyPortal />
          </div>
        </PageContainer>
      </div>
    );
  }

  const features = [
    {
      icon: Building2,
      title: t('home.unifiedAccess'),
      description: t('home.unifiedAccessDesc'),
    },
    {
      icon: Zap,
      title: t('home.smartGuidance'),
      description: t('home.smartGuidanceDesc'),
    },
    {
      icon: FileCheck,
      title: t('home.streamlinedServices'),
      description: t('home.streamlinedServicesDesc'),
    }
  ];

  const agencies = [
    { name: 'BIDA', full: 'Bangladesh Investment Development Authority' },
    { name: 'BEZA', full: 'Bangladesh Economic Zones Authority' },
    { name: 'BEPZA', full: 'Bangladesh Export Processing Zones Authority' },
    { name: 'BHTPA', full: 'Bangladesh Hi-Tech Park Authority' },
    { name: 'BSCIC', full: 'Bangladesh Small & Cottage Industries Corporation' },
    { name: 'PPPA', full: 'Public Private Partnership Authority' }
  ];

  const stats = [
    { value: '500+', label: t('home.activeInvestors'), icon: Users },
    { value: '$15B+', label: t('home.fdiApproved'), icon: TrendingUp },
    { value: '100+', label: t('home.servicesAvailable'), icon: Briefcase },
    { value: '17', label: t('home.investmentZones'), icon: MapPin }
  ];

  const benefits = [
    t('home.benefit1'),
    t('home.benefit2'),
    t('home.benefit3'),
    t('home.benefit4'),
    t('home.benefit5'),
    t('home.benefit6')
  ];

  const transparencyFeatures = [
    { icon: BarChart3, title: t('home.livePerformanceMetrics'), description: t('home.livePerformanceDesc') },
    { icon: Users, title: t('home.agencyStatistics'), description: t('home.agencyStatisticsDesc') },
    { icon: Shield, title: t('home.openDataStandards'), description: t('home.openDataStandardsDesc') }
  ];

  // PREMIUM HOMEPAGE - GOVERNMENT GRADE
  return (
    <div className="min-h-screen bg-[#f5f7fb] relative after:content-[''] after:fixed after:inset-0 after:pointer-events-none after:opacity-[0.035] after:bg-[url('/grain.png')] after:mix-blend-multiply">
      {/* Hero Section - Two Column Layout with Intentional Image */}
      <section className="py-16 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <div className="p-10 rounded-t-2xl" style={{
              background: '#f5f7fb',
              boxShadow: '6px 6px 14px rgba(15,23,42,0.06), -6px -6px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: '1px solid #e3ebf7',
              borderRadius: '18px'
            }}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Content */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Machined metal nameplate badge */}
                  <div className="inline-block px-7 py-3.5 mb-8" style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #f3f6fb 100%)',
                    border: '1px solid #e3ebf7',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(15,23,42,0.04)',
                    borderRadius: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.3px'
                  }}>
                    <span className="text-[15px] text-[#0f172a]">
                      {t('home.bangladeshInvestment')}
                    </span>
                  </div>

                  <h1 className="text-5xl font-bold tracking-tight text-[#0f172a] mb-5 leading-relaxed">
                    {t('home.welcomeTitle')}
                  </h1>

                  <p className="text-lg text-slate-700 mb-10 leading-relaxed">
                    {t('home.welcomeSubtitle')}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.12, ease: [0.2, 0.9, 0.3, 1] }}>
                      <PrimaryButton onClick={onGetStarted} className="px-10 py-4 inline-flex items-center gap-2">
                        {t('home.getStarted')}
                        <ArrowRight className="w-5 h-5" />
                      </PrimaryButton>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.12, ease: [0.2, 0.9, 0.3, 1] }}>
                      <SecondaryButton className="px-10 py-4 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {t('home.seeHowItWorks')}
                      </SecondaryButton>
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0e7490]" />
                    <span className="text-[15px] text-slate-700">{t('home.governmentVerifiedPlatform')}</span>
                  </div>
                </motion.div>

                {/* Right Column - Hero Image with Intentional Treatment */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative rounded-2xl overflow-hidden" style={{
                    boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(15,23,42,0.04) inset, 0 8px 24px rgba(15,23,42,0.06)'
                  }}>
                    <SafeImage
                      {...getHomepageImage('hero')}
                      className="w-full h-[420px] object-cover"
                    />
                    {/* Subtle vignette for cohesion */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/5 pointer-events-none"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Separator */}
      <div className="max-w-7xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e6edf7] to-transparent" />
      </div>

      {/* 📊 FDI MONITOR - COMPACT VIEW */}
      <section className="py-16 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <div className="p-10 rounded-none" style={{
              background: '#f5f7fb',
              boxShadow: '6px 6px 14px rgba(15,23,42,0.06), -6px -6px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: '1px solid #e3ebf7',
              borderRadius: '18px'
            }}>
              <FDIMonitorPanel compact={true} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Separator */}
      <div className="max-w-7xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e6edf7] to-transparent" />
      </div>

      {/* Why OSS Section */}
      <section className="py-16 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <div className="p-10 rounded-none" style={{
              background: '#f5f7fb',
              boxShadow: '6px 6px 14px rgba(15,23,42,0.06), -6px -6px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: '1px solid #e3ebf7',
              borderRadius: '18px'
            }}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <h3 className="text-sm text-slate-700 mb-3 uppercase tracking-wide font-medium">{t('home.whyBanglaBiz')}</h3>
                  <h2 className="text-5xl font-bold tracking-tight text-[#0f172a] mb-5 leading-relaxed">
                    {t('home.howWillHelp')}
                  </h2>
                  <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.12, ease: [0.2, 0.9, 0.3, 1] }}>
                    <PrimaryButton className="flex items-center gap-2 px-10 py-4">
                      {t('home.showMeHowToApply')}
                      <ArrowRight className="w-4 h-4" />
                    </PrimaryButton>
                  </motion.div>
                </motion.div>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-[#0e7490]" />
                      </div>
                      <p className="text-lg text-slate-700 leading-relaxed">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Separator */}
      <div className="max-w-7xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e6edf7] to-transparent" />
      </div>

      {/* Features Grid */}
      <section className="py-16 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <h2 className="text-5xl font-bold tracking-tight text-[#0f172a] mb-5">
                {t('home.modernFeatures')}
              </h2>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
                {t('home.modernFeaturesDesc')}
              </p>
            </motion.div>

            <div className="p-10 rounded-none" style={{
              background: '#f5f7fb',
              boxShadow: '6px 6px 14px rgba(15,23,42,0.06), -6px -6px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: '1px solid #e3ebf7',
              borderRadius: '18px'
            }}>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{
                      background: 'linear-gradient(to bottom right, #ffffff, #eef3f9)',
                      boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(15,23,42,0.05) inset'
                    }}>
                      <feature.icon className="w-8 h-8 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0f172a] mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-lg text-slate-700 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Separator */}
      <div className="max-w-7xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e6edf7] to-transparent" />
      </div>

      {/* Agencies Section */}
      <section className="py-16 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <h2 className="text-5xl font-bold tracking-tight text-[#0f172a] mb-5">
                {t('home.connectedAgencies')}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t('home.connectedAgenciesDesc')}
              </p>
            </motion.div>

            <div className="p-10 rounded-none" style={{
              background: '#f5f7fb',
              boxShadow: '6px 6px 14px rgba(15,23,42,0.06), -6px -6px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: '1px solid #e3ebf7',
              borderRadius: '18px'
            }}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {agencies.map((agency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                      background: 'linear-gradient(to bottom right, #ffffff, #eef3f9)',
                      boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(15,23,42,0.05) inset'
                    }}>
                      <span className="text-lg font-bold text-[#3b82f6]">{agency.name}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] text-slate-700">{agency.full}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Separator */}
      <div className="max-w-7xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e6edf7] to-transparent" />
      </div>

      {/* Transparency Section */}
      <section className="py-16 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <div className="p-10 rounded-none" style={{
              background: '#f5f7fb',
              boxShadow: '6px 6px 14px rgba(15,23,42,0.06), -6px -6px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: '1px solid #e3ebf7',
              borderRadius: '18px'
            }}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="inline-block px-6 py-3 rounded-2xl" style={{
                    background: 'linear-gradient(to bottom right, #ffffff, #eef3f9)',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(15,23,42,0.05) inset'
                  }}>
                    <span className="text-[15px] font-bold text-[#3b82f6]">{t('home.publicTransparency')}</span>
                  </div>
                  <h2 className="text-5xl font-bold tracking-tight text-[#0f172a] mt-8 mb-5 leading-relaxed">
                    {t('home.transparencyTitle')}
                  </h2>
                  <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                    {t('home.transparencyDesc')}
                  </p>

                  <div className="space-y-6 mb-8">
                    {transparencyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                          background: 'linear-gradient(to bottom right, #ffffff, #eef3f9)',
                          boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(15,23,42,0.05) inset'
                        }}>
                          <feature.icon className="w-7 h-7 text-[#3b82f6]" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#0f172a] mb-2 tracking-tight">{feature.title}</h4>
                          <p className="text-lg text-slate-700 leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.12, ease: [0.2, 0.9, 0.3, 1] }}>
                    <SecondaryButton onClick={() => setShowTransparency(true)} className="flex items-center gap-2 px-10 py-4">
                      <Eye className="w-4 h-4" />
                      {t('home.viewTransparencyPortal')}
                    </SecondaryButton>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  className="relative h-[480px] rounded-2xl overflow-hidden" style={{
                    boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(15,23,42,0.04) inset, 0 8px 24px rgba(15,23,42,0.06)'
                  }}
                >
                  <SafeImage
                    {...getFeatureImage('fallback' as any)}
                    alt="Transparency"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hairline Separator */}
      <div className="max-w-7xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#e6edf7] to-transparent" />
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-[#f5f7fb]">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <div className="p-10 rounded-b-2xl text-center" style={{
              background: '#f5f7fb',
              boxShadow: '6px 6px 14px rgba(15,23,42,0.06), -6px -6px 14px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.7)',
              border: '1px solid #e3ebf7',
              borderRadius: '18px'
            }}>
              <h2 className="text-5xl font-bold tracking-tight text-[#0f172a] mb-5">
                {t('home.readyToStart')}
              </h2>
              <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('home.readyToStartDesc')}
              </p>
              <motion.div 
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
              >
                <PrimaryButton onClick={onGetStarted} className="px-12 py-4 inline-flex items-center gap-2">
                  {t('home.startApplication')}
                  <ArrowRight className="w-5 h-5" />
                </PrimaryButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}