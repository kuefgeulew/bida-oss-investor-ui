// Special Cases Tab - VIP Mode, Problem Escalation, Emergency Fast Track
import { useState } from 'react';
import { Card, SectionContainer, IconWrap, Typography, PrimaryButton, SecondaryButton } from '@/app/components/ui-primitives';
import { Badge } from '@/app/components/ui/badge';
import { Star, AlertOctagon, Zap, Crown, Flag, Rocket } from 'lucide-react';
import { getSpecialCases } from '@/app/officer-core/officerDataEngine';

export function SpecialCases() {
  const [selectedMode, setSelectedMode] = useState<'vip' | 'problem' | 'emergency' | null>(null);

  // Get special cases from data engine
  const { vip: vipCases, problem: problemCases, emergency: emergencyCases } = getSpecialCases();
  
  const specialCases = [
    ...vipCases.map(app => ({
      id: app.id,
      type: 'vip' as const,
      companyName: app.companyName,
      priority: 'Critical',
      reason: `Strategic investment - $${(app.investmentAmount/1000000).toFixed(1)}M ${app.sector}`,
      assignedTo: app.assignedOfficer,
      slaOverride: 'Fast-tracked - 15 days instead of 60',
    })),
    ...problemCases.map(app => ({
      id: app.id,
      type: 'problem' as const,
      companyName: app.companyName,
      priority: 'High',
      reason: app.problemReason || 'Application stuck - requires intervention',
      escalatedTo: 'Deputy Secretary',
      actions: 'Weekly review meetings initiated',
    })),
    ...emergencyCases.map(app => ({
      id: app.id,
      type: 'emergency' as const,
      companyName: app.companyName,
      priority: 'Urgent',
      reason: app.emergencyReason || 'Emergency approval required',
      fastTrackStatus: 'Priority processing - 48 hour target',
      specialApproval: 'Director directive',
    })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionContainer>
        <div className="flex items-center gap-4 mb-4">
          <IconWrap>
            <Star className="w-6 h-6" />
          </IconWrap>
          <div>
            <h2 className={Typography.sectionTitle}>Special Cases Management</h2>
            <p className={Typography.body}>VIP, Problem Escalation & Emergency Fast Track</p>
          </div>
        </div>
        
        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <SecondaryButton
            onClick={() => setSelectedMode('vip')}
            className={`p-4 ${
              selectedMode === 'vip' ? 'ring-2 ring-gray-900' : ''
            }`}
          >
            <div className="text-center">
              <Crown className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="font-semibold text-sm">VIP Mode</p>
              <p className={Typography.muted}>High-priority investors</p>
            </div>
          </SecondaryButton>
          <SecondaryButton
            onClick={() => setSelectedMode('problem')}
            className={`p-4 ${
              selectedMode === 'problem' ? 'ring-2 ring-gray-900' : ''
            }`}
          >
            <div className="text-center">
              <AlertOctagon className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="font-semibold text-sm">Problem Escalation</p>
              <p className={Typography.muted}>Stuck applications</p>
            </div>
          </SecondaryButton>
          <SecondaryButton
            onClick={() => setSelectedMode('emergency')}
            className={`p-4 ${
              selectedMode === 'emergency' ? 'ring-2 ring-gray-900' : ''
            }`}
          >
            <div className="text-center">
              <Zap className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="font-semibold text-sm">Emergency Fast Track</p>
              <p className={Typography.muted}>Urgent approvals</p>
            </div>
          </SecondaryButton>
        </div>
      </SectionContainer>

      {/* Special Cases List */}
      <div className="grid gap-4">
        {specialCases
          .filter((c) => !selectedMode || c.type === selectedMode)
          .map((specialCase) => (
            <Card key={specialCase.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {specialCase.type === 'vip' && <Crown className="w-6 h-6 text-gray-700" />}
                  {specialCase.type === 'problem' && <Flag className="w-6 h-6 text-gray-700" />}
                  {specialCase.type === 'emergency' && <Rocket className="w-6 h-6 text-gray-700" />}
                  <div>
                    <h3 className={Typography.cardTitle}>{specialCase.companyName}</h3>
                    <p className={Typography.muted}>Case ID: {specialCase.id}</p>
                  </div>
                </div>
                <Badge
                  className={`${
                    specialCase.priority === 'Critical'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : specialCase.priority === 'Urgent'
                      ? 'bg-orange-100 text-orange-800 border-orange-300'
                      : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                  } border`}
                >
                  {specialCase.priority}
                </Badge>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Reason:</p>
                  <p className={Typography.body}>{specialCase.reason}</p>
                </div>
                {specialCase.type === 'vip' && (
                  <>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Assigned To:</p>
                      <p className={Typography.body}>{specialCase.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">SLA Override:</p>
                      <p className="text-sm text-gray-900">{specialCase.slaOverride}</p>
                    </div>
                  </>
                )}
                {specialCase.type === 'problem' && (
                  <>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Escalated To:</p>
                      <p className={Typography.body}>{specialCase.escalatedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Actions Taken:</p>
                      <p className="text-sm text-gray-900">{specialCase.actions}</p>
                    </div>
                  </>
                )}
                {specialCase.type === 'emergency' && (
                  <>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Fast Track Status:</p>
                      <p className="text-sm text-gray-900">{specialCase.fastTrackStatus}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Special Approval:</p>
                      <p className="text-sm text-gray-900">{specialCase.specialApproval}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <PrimaryButton>
                  View Full Details
                </PrimaryButton>
                <SecondaryButton>
                  Update Status
                </SecondaryButton>
              </div>
            </Card>
          ))}
      </div>

      {specialCases.filter((c) => !selectedMode || c.type === selectedMode).length === 0 && (
        <Card className="text-center">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className={Typography.body}>No special cases found</p>
        </Card>
      )}
    </div>
  );
}