import { useEffect } from 'react';
import { InvestorPortal } from '@/app/components/InvestorPortal';
import { OfficerLayout } from '@/app/officer/OfficerLayout';
import { LanguageProvider } from '@/app/components/LanguageContext';
import { LanguageSelector } from '@/app/components/LanguageSelector';
import { AuthSystem } from '@/app/components/AuthSystem';
import { AdminPortalShell } from '@/app/admin/AdminPortalShell';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { NotificationPanel } from '@/app/components/NotificationPanel';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { seedDemoInvestor } from '@/app/devtools/demoInvestorSeed';
import { IntelligenceLauncher } from '@/app/intelligence/IntelligenceLauncher';
import { getNotificationEngine } from '@/app/intelligence/NotificationEngine'; // 🔔 FIX 1: NOTIFICATION ENGINE
import 'leaflet/dist/leaflet.css'; // 🗺️ LEAFLET GIS MAP INTEGRATION
import 'maplibre-gl/dist/maplibre-gl.css'; // 🗺️ MAPLIBRE GL - OPEN SOURCE GIS ENGINE (NO TOKEN REQUIRED)

function AppContent() {
  // ⚡ SAFETY: Prevent HMR errors during React Refresh
  let user, isLoading, fastLogout;
  
  try {
    const auth = useAuth();
    user = auth.user;
    isLoading = auth.isLoading;
    fastLogout = auth.fastLogout;
  } catch (error) {
    // During HMR, context might not be ready - show loading
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto mb-4"></div>
          <p className="text-[#0f172a]">Initializing...</p>
        </div>
      </div>
    );
  }

  // Set document title and seed demo investor
  useEffect(() => {
    document.title = 'BIDA OSS Investment System';
    
    // 🔔 INITIALIZE NOTIFICATION ENGINE ONLY WHEN USER IS LOGGED IN
    // This starts the automated monitoring for compliance, SLA, and incentive triggers
    if (user) {
      getNotificationEngine();
    }
    
    // Seed demo investor data for presentations/demos (DEVELOPMENT ONLY)
    if (import.meta.env.DEV) {
      seedDemoInvestor();
    }
  }, [user]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto mb-4"></div>
          <p className="text-[#0f172a]">Loading...</p>
        </div>
      </div>
    );
  }

  // THIS IS THE MISSING SWITCH - Pure React state decision
  // No user? Show auth
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f6f8fb]">
        <AuthSystem />
      </div>
    );
  }

  // Admin/SuperAdmin Views - National Command Center
  if (user.role === 'admin' || user.role === 'superadmin') {
    return (
      <>
        <AdminPortalShell role={user.role} />
        <IntelligenceLauncher userProfile={{ name: user?.name || 'Admin', role: user.role }} />
      </>
    );
  }

  // Officer View
  if (user.role === 'officer') {
    return (
      <>
        <div className="min-h-screen bg-[#f5f7fb]">
          {/* Officer Navigation Bar - Glass Design */}
          <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="glass-card px-6 py-3">
                    <h1 className="text-xl font-semibold text-[#0f172a]">
                      BIDA Officer CRM
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <LanguageSelector />
                  <NotificationPanel />
                  <div className="text-sm text-[#0f172a] glass-card px-3 py-1">
                    {user?.name} ({user?.role})
                  </div>
                  <button
                    onClick={fastLogout}
                    className="glass-button px-4 py-2 hover:bg-red-50/50 hover:border-red-200/50 transition-all group"
                  >
                    <span className="text-sm font-medium text-[#475569] group-hover:text-red-600 transition-colors">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Officer View Content */}
          <div className="p-6">
            <OfficerLayout />
          </div>
        </div>
        <IntelligenceLauncher userProfile={{ name: user?.name || 'Officer', role: user.role }} />
      </>
    );
  }

  // Investor View
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <InvestorPortal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
            <Toaster position="top-right" richColors />
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}