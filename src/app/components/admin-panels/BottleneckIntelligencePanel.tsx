// Feature 2: Bottleneck Intelligence - Delay analysis and impact tracking
import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { analyzeBottlenecks, type BottleneckData } from '@/app/admin-intelligence/bottleneckAnalyzer';
import { formatCurrency } from '@/app/admin-intelligence/nationalPulseEngine';

interface BottleneckIntelligencePanelProps {
  applications: any[];
}

export function BottleneckIntelligencePanel({ applications }: BottleneckIntelligencePanelProps) {
  const [bottleneckData, setBottleneckData] = useState<BottleneckData | null>(null);

  useEffect(() => {
    setBottleneckData(analyzeBottlenecks(applications));
  }, [applications]);

  if (!bottleneckData) {
    return <div className="p-8 text-center">Loading Bottleneck Intelligence...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          🔍 Bottleneck Intelligence
        </h1>
        <p className="text-gray-600">Delay analysis and impact tracking</p>
      </div>

      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-red-50">
          <p className="text-sm text-gray-600 mb-2">Total Days Lost to Delays</p>
          <p className="text-3xl font-bold text-red-900">{bottleneckData.impactAnalysis.totalDaysLost}</p>
        </Card>
        <Card className="p-6 bg-orange-50">
          <p className="text-sm text-gray-600 mb-2">Estimated FDI at Risk</p>
          <p className="text-3xl font-bold text-orange-900">
            {formatCurrency(bottleneckData.impactAnalysis.estimatedFDILost)}
          </p>
        </Card>
        <Card className="p-6 bg-green-50">
          <p className="text-sm text-gray-600 mb-2">Potential Savings (if fixed)</p>
          <p className="text-3xl font-bold text-green-900">
            {formatCurrency(
              bottleneckData.impactAnalysis.potentialSavings.reduce((sum, s) => sum + s.fdiValue, 0)
            )}
          </p>
        </Card>
      </div>

      {/* Agency Heatmap */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">🔥 Agency Performance Heatmap</h3>
        <div className="space-y-3">
          {bottleneckData.agencyHeatmap.map((agency, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-lg">{agency.agency}</p>
                  <p className="text-sm text-gray-600">{agency.cases} active cases</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-orange-600">{agency.avgDelay} days</p>
                    <Badge
                      variant="outline"
                      className={
                        agency.slaCompliance >= 80 ? 'bg-green-100 text-green-800' :
                        agency.slaCompliance >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {agency.slaCompliance}% SLA
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">avg processing time</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {agency.stages.slice(0, 3).map((stage, sIdx) => (
                  <div key={sIdx} className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-600">{stage.stage}</p>
                    <p className="font-bold text-sm">{stage.avgDays} days</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Delay Stages */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">📊 Top 5 Delay Stages This Week</h3>
        <div className="space-y-3">
          {bottleneckData.topDelayStages.map((stage, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium">{stage.stage}</p>
                <p className="text-sm text-gray-600">{stage.agency} • {stage.cases} cases</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-orange-600">{stage.avgDelay} days</p>
                <Badge
                  variant="outline"
                  className={
                    stage.trend === 'improving' ? 'bg-green-100 text-green-800' :
                    stage.trend === 'worsening' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-600'
                  }
                >
                  {stage.trend === 'improving' && <TrendingDown className="w-3 h-3 inline mr-1" />}
                  {stage.trend === 'worsening' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                  {stage.trend}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Fix Impact Analysis */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <h3 className="font-semibold mb-4">💡 If These Bottlenecks Were Fixed...</h3>
        <div className="space-y-3">
          {bottleneckData.impactAnalysis.potentialSavings.map((saving, idx) => (
            <div key={idx} className="p-3 bg-white rounded border-l-4 border-green-500">
              <p className="font-medium">{saving.stage}</p>
              <p className="text-sm text-gray-600 mt-1">
                Save {saving.days} days → Retain {formatCurrency(saving.fdiValue)} FDI value
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
