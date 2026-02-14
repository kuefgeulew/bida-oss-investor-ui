import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  TrendingDown,
  TrendingUp,
  Clock,
  Users,
  FileCheck,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Slider } from '@/app/components/ui/slider';
import { Badge } from '@/app/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Policy {
  id: string;
  name: string;
  currentValue: number;
  unit: string;
  min: number;
  max: number;
  impact: 'high' | 'medium' | 'low';
}

interface Impact {
  metric: string;
  current: number;
  projected: number;
  change: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}

export function PolicySimulation() {
  // Initial policy configuration
  const [policies, setPolicies] = useState<Policy[]>([
    { id: 'bida-sla', name: 'BIDA Processing SLA', currentValue: 30, unit: 'days', min: 10, max: 90, impact: 'high' },
    { id: 'rjsc-sla', name: 'RJSC Registration SLA', currentValue: 7, unit: 'days', min: 1, max: 30, impact: 'high' },
    { id: 'doe-sla', name: 'DoE Environmental Clearance SLA', currentValue: 14, unit: 'days', min: 3, max: 60, impact: 'high' },
    { id: 'fee-registration', name: 'Company Registration Fee', currentValue: 5000, unit: 'BDT', min: 1000, max: 20000, impact: 'medium' },
    { id: 'incentive-fdi', name: 'FDI Tax Holiday', currentValue: 5, unit: 'years', min: 0, max: 10, impact: 'high' }
  ]);

  // Simulation impact metrics (updated with realistic FDI baseline)
  const [impacts, setImpacts] = useState<Impact[]>([
    { metric: 'Total Investment Time', current: 45, projected: 45, change: 0, unit: 'days', trend: 'neutral' },
    { metric: 'Investor Drop-off Rate', current: 35, projected: 35, change: 0, unit: '%', trend: 'neutral' },
    { metric: 'Annual FDI Inflow', current: 1.7, projected: 1.7, change: 0, unit: 'billion USD', trend: 'neutral' }, // ✅ Updated: $1.7B baseline
    { metric: 'Agency Workload', current: 85, projected: 85, change: 0, unit: '%', trend: 'neutral' },
    { metric: 'Investor Satisfaction', current: 68, projected: 68, change: 0, unit: '%', trend: 'neutral' }
  ]);

  const [simulationRun, setSimulationRun] = useState(false);

  function handlePolicyChange(policyId: string, newValue: number) {
    setPolicies(prev => 
      prev.map(p => p.id === policyId ? { ...p, currentValue: newValue } : p)
    );
  }

  function runSimulation() {
    setSimulationRun(true);

    // Calculate impacts based on policy changes
    const totalSLA = policies
      .filter(p => p.id.endsWith('-sla'))
      .reduce((sum, p) => sum + p.currentValue, 0);

    const fdiIncentive = policies.find(p => p.id === 'incentive-fdi')?.currentValue || 5;
    const registrationFee = policies.find(p => p.id === 'fee-registration')?.currentValue || 5000;

    // Simulate impact calculations
    const newImpacts: Impact[] = [
      {
        metric: 'Total Investment Time',
        current: 45,
        projected: totalSLA + 8,
        change: totalSLA + 8 - 45,
        unit: 'days',
        trend: (totalSLA + 8) < 45 ? 'down' : (totalSLA + 8) > 45 ? 'up' : 'neutral'
      },
      {
        metric: 'Investor Drop-off Rate',
        current: 35,
        projected: Math.max(10, 35 - (45 - (totalSLA + 8)) * 0.8),
        change: Math.max(10, 35 - (45 - (totalSLA + 8)) * 0.8) - 35,
        unit: '%',
        trend: (Math.max(10, 35 - (45 - (totalSLA + 8)) * 0.8)) < 35 ? 'down' : 'up'
      },
      {
        metric: 'Annual FDI Inflow',
        current: 1.7,
        projected: 1.7 + (fdiIncentive - 5) * 0.3 + (5000 - registrationFee) / 5000,
        change: 1.7 + (fdiIncentive - 5) * 0.3 + (5000 - registrationFee) / 5000 - 1.7,
        unit: 'billion USD',
        trend: (1.7 + (fdiIncentive - 5) * 0.3) > 1.7 ? 'up' : 'down'
      },
      {
        metric: 'Agency Workload',
        current: 85,
        projected: Math.min(100, 85 - (45 - (totalSLA + 8)) * 0.5),
        change: Math.min(100, 85 - (45 - (totalSLA + 8)) * 0.5) - 85,
        unit: '%',
        trend: (Math.min(100, 85 - (45 - (totalSLA + 8)) * 0.5)) < 85 ? 'down' : 'up'
      },
      {
        metric: 'Investor Satisfaction',
        current: 68,
        projected: Math.min(95, 68 + (45 - (totalSLA + 8)) * 0.8),
        change: Math.min(95, 68 + (45 - (totalSLA + 8)) * 0.8) - 68,
        unit: '%',
        trend: (Math.min(95, 68 + (45 - (totalSLA + 8)) * 0.8)) > 68 ? 'up' : 'down'
      }
    ];

    setImpacts(newImpacts);
  }

  function resetPolicies() {
    setPolicies([
      { id: 'bida-sla', name: 'BIDA Processing SLA', currentValue: 30, unit: 'days', min: 10, max: 90, impact: 'high' },
      { id: 'rjsc-sla', name: 'RJSC Registration SLA', currentValue: 7, unit: 'days', min: 1, max: 30, impact: 'high' },
      { id: 'doe-sla', name: 'DoE Environmental Clearance SLA', currentValue: 14, unit: 'days', min: 3, max: 60, impact: 'high' },
      { id: 'fee-registration', name: 'Company Registration Fee', currentValue: 5000, unit: 'BDT', min: 1000, max: 20000, impact: 'medium' },
      { id: 'incentive-fdi', name: 'FDI Tax Holiday', currentValue: 5, unit: 'years', min: 0, max: 10, impact: 'high' }
    ]);
    setSimulationRun(false);
    setImpacts([
      { metric: 'Total Investment Time', current: 45, projected: 45, change: 0, unit: 'days', trend: 'neutral' },
      { metric: 'Investor Drop-off Rate', current: 35, projected: 35, change: 0, unit: '%', trend: 'neutral' },
      { metric: 'Annual FDI Inflow', current: 1.7, projected: 1.7, change: 0, unit: 'billion USD', trend: 'neutral' }, // ✅ Updated: $1.7B baseline
      { metric: 'Agency Workload', current: 85, projected: 85, change: 0, unit: '%', trend: 'neutral' },
      { metric: 'Investor Satisfaction', current: 68, projected: 68, change: 0, unit: '%', trend: 'neutral' }
    ]);
  }

  const comparisonData = impacts.map(impact => ({
    name: impact.metric,
    Current: impact.current,
    Projected: impact.projected
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Policy Simulation Dashboard</h1>
                <p className="text-gray-600">For BIDA leadership to model regulatory changes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={resetPolicies}
                variant="outline"
                size="lg"
              >
                Reset to Baseline
              </Button>
              <Button
                onClick={runSimulation}
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600"
              >
                Run Simulation
              </Button>
            </div>
          </div>

          <Card className="border-l-4 border-l-orange-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <p className="text-gray-700">
                  <strong>Policy Design Instrument:</strong> Adjust parameters below to see projected impact on investment climate, agency workload, and investor satisfaction. Based on World Bank digital governance models.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Policy Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="w-5 h-5" />
                Policy Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {policies.map((policy) => (
                <div key={policy.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm font-semibold">{policy.name}</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={
                          policy.impact === 'high' ? 'destructive' :
                          policy.impact === 'medium' ? 'secondary' :
                          'outline'
                        } className="text-xs">
                          {policy.impact} impact
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {policy.currentValue}
                      </div>
                      <div className="text-xs text-gray-600">{policy.unit}</div>
                    </div>
                  </div>
                  <Slider
                    value={[policy.currentValue]}
                    onValueChange={([value]) => handlePolicyChange(policy.id, value)}
                    min={policy.min}
                    max={policy.max}
                    step={policy.unit === 'BDT' ? 100 : 1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{policy.min} {policy.unit}</span>
                    <span>{policy.max} {policy.unit}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Projected Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {impacts.map((impact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{impact.metric}</span>
                    {simulationRun && impact.change !== 0 && (
                      <Badge
                        variant={
                          (impact.trend === 'up' && (impact.metric.includes('FDI') || impact.metric.includes('Satisfaction'))) ||
                          (impact.trend === 'down' && (impact.metric.includes('Time') || impact.metric.includes('Drop-off') || impact.metric.includes('Workload')))
                            ? 'default'
                            : 'destructive'
                        }
                        className="flex items-center gap-1"
                      >
                        {((impact.trend === 'up' && (impact.metric.includes('FDI') || impact.metric.includes('Satisfaction'))) ||
                          (impact.trend === 'down' && (impact.metric.includes('Time') || impact.metric.includes('Drop-off') || impact.metric.includes('Workload')))) ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {Math.abs(impact.change).toFixed(1)} {impact.unit}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Current</div>
                      <div className="text-2xl font-bold text-gray-600">
                        {impact.current} <span className="text-sm">{impact.unit}</span>
                      </div>
                    </div>
                    {simulationRun && (
                      <>
                        <div className="text-gray-400">→</div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Projected</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {impact.projected.toFixed(1)} <span className="text-sm">{impact.unit}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        {simulationRun && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Current vs. Projected Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-15} textAnchor="end" height={100} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Current" fill="#9CA3AF" name="Current" />
                    <Bar dataKey="Projected" fill="#3B82F6" name="Projected" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recommendations */}
        {simulationRun && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  AI-Generated Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {impacts[0].projected < impacts[0].current && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Reducing total processing time will decrease investor drop-off by approximately {Math.abs(impacts[1].change).toFixed(1)}%</span>
                    </li>
                  )}
                  {impacts[2].projected > impacts[2].current && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Increased tax incentives could attract an additional ${Math.abs(impacts[2].change).toFixed(2)} billion in FDI annually</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Consider digital automation to maintain agency workload below 80% while reducing SLAs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}