/**
 * 🌐 PUBLIC TRANSPARENCY PORTAL
 * ARCHITECTURE: Now reads from engines instead of static data
 * DEPENDENCY: slaEngine → agencyWorkflowEngine
 */

import { useState } from 'react';
import { SLADashboard } from '@/app/transparency/SLADashboard';
import { SectorDirectory } from '@/app/transparency/SectorHub';
import { getAllAgencyRatings, getRatingStatistics } from '@/app/transparency/ratingEngine';
import { Star, BarChart3, Building2 } from 'lucide-react';

type TransparencyView = 'sla' | 'sectors' | 'ratings';

export function PublicTransparencyPortal() {
  const [view, setView] = useState<TransparencyView>('sla');

  return (
    <div className="min-h-screen bg-white/40 backdrop-blur-xl">
      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex gap-4">
            <TabButton
              active={view === 'sla'}
              onClick={() => setView('sla')}
              icon={<BarChart3 className="w-5 h-5" />}
              label="SLA Performance"
            />
            <TabButton
              active={view === 'sectors'}
              onClick={() => setView('sectors')}
              icon={<Building2 className="w-5 h-5" />}
              label="Sector Intelligence"
            />
            <TabButton
              active={view === 'ratings'}
              onClick={() => setView('ratings')}
              icon={<Star className="w-5 h-5" />}
              label="Service Ratings"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {view === 'sla' && <SLADashboard />}
        {view === 'sectors' && <SectorDirectory />}
        {view === 'ratings' && <RatingsView />}
      </div>
    </div>
  );
}

function TabButton({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string; 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white/50 text-gray-700 hover:bg-white/80'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/**
 * 🌟 RATINGS VIEW
 * Shows agency ratings from ratingEngine
 */
function RatingsView() {
  const agencyRatings = getAllAgencyRatings();
  const stats = getRatingStatistics();

  if (agencyRatings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-16 text-center">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-gray-900 mb-2">No Ratings Yet</h2>
          <p className="text-gray-600">
            Agency ratings will appear here as investors provide feedback
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-2 text-gray-900">Service Ratings</h1>
        <p className="text-gray-600">Investor feedback on government services</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Ratings"
          value={stats.totalRatings}
        />
        <StatCard
          label="Average Rating"
          value={`${stats.averageRating}/5`}
        />
        <StatCard
          label="Satisfaction Rate"
          value={`${stats.satisfactionRate}%`}
        />
      </div>

      {/* Agency Ratings */}
      <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
        <h2 className="text-2xl font-light mb-6">Agency Ratings</h2>
        <div className="space-y-4">
          {agencyRatings.map((rating) => (
            <div key={rating.agencyId} className="p-4 bg-white/50 border border-gray-200/50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{rating.agencyName}</h3>
                  <p className="text-sm text-gray-600">{rating.totalRatings} ratings</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-light">{rating.averageRating}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>
              </div>
              
              {/* Rating Distribution */}
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = rating.ratingDistribution[stars as keyof typeof rating.ratingDistribution];
                  const percentage = rating.totalRatings > 0 
                    ? (count / rating.totalRatings) * 100 
                    : 0;
                  
                  return (
                    <div key={stars} className="flex items-center gap-2 text-sm">
                      <span className="w-12 text-gray-600">{stars} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-gray-600">{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Recent Feedback */}
              {rating.recentFeedback.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recent Feedback:</p>
                  <div className="space-y-2">
                    {rating.recentFeedback.slice(0, 3).map((feedback, idx) => (
                      <p key={idx} className="text-sm text-gray-600 italic">
                        "{feedback}"
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
      <div className="text-3xl font-light mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
