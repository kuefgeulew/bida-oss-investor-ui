import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building,
  ArrowRight,
  Database,
  Shield,
  CheckCircle,
  Clock,
  Activity,
  Network,
  FileText,
  Zap,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';

interface Agency {
  id: string;
  code: string;
  name: string;
  fullName: string;
  color: string;
  icon: React.ReactNode;
}

interface DataPacket {
  id: string;
  from: string;
  to: string;
  dataType: string;
  status: 'pending' | 'transmitting' | 'received' | 'verified';
  timestamp: string;
  size: string;
}

interface ExchangeLog {
  id: string;
  timestamp: string;
  from: string;
  to: string;
  action: string;
  dataType: string;
  status: 'success' | 'error' | 'pending';
  duration: number;
}

const agencies: Agency[] = [
  {
    id: 'rjsc',
    code: 'RJSC',
    name: 'RJSC',
    fullName: 'Registrar of Joint Stock Companies',
    color: 'from-blue-600 to-blue-700',
    icon: <Building className="w-6 h-6" />
  },
  {
    id: 'nbr',
    code: 'NBR',
    name: 'NBR',
    fullName: 'National Board of Revenue',
    color: 'from-emerald-600 to-emerald-700',
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'doe',
    code: 'DoE',
    name: 'DoE',
    fullName: 'Department of Environment',
    color: 'from-green-600 to-green-700',
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 'dife',
    code: 'DIFE',
    name: 'DIFE',
    fullName: 'Dept of Inspection for Factories & Establishments',
    color: 'from-purple-600 to-purple-700',
    icon: <Activity className="w-6 h-6" />
  },
  {
    id: 'bank',
    code: 'BANK',
    name: 'Bangladesh Bank',
    fullName: 'Bangladesh Bank (Central Bank)',
    color: 'from-indigo-600 to-indigo-700',
    icon: <Database className="w-6 h-6" />
  },
  {
    id: 'utility',
    code: 'UTIL',
    name: 'Utilities',
    fullName: 'Power, Water & Gas Utilities',
    color: 'from-amber-600 to-orange-700',
    icon: <Zap className="w-6 h-6" />
  }
];

export function InterAgencyDataExchange() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activePackets, setActivePackets] = useState<DataPacket[]>([]);
  const [logs, setLogs] = useState<ExchangeLog[]>([]);
  const [stats, setStats] = useState({
    totalExchanges: 2847, // Historical exchanges since system launch
    activeConnections: 6, // 6 agencies connected
    avgResponseTime: 142, // Average response time in ms
    successRate: 100
  });

  function startLiveMonitor() {
    setIsSimulating(true);
    setLogs([]);
    simulateDataFlow();
  }

  function stopSimulation() {
    setIsSimulating(false);
    setActivePackets([]);
  }

  function simulateDataFlow() {
    const flows = [
      { from: 'rjsc', to: 'nbr', dataType: 'Company Registration Data', delay: 0 },
      { from: 'nbr', to: 'doe', dataType: 'Tax Identification Number', delay: 2000 },
      { from: 'doe', to: 'dife', dataType: 'Environmental Clearance', delay: 4000 },
      { from: 'dife', to: 'bank', dataType: 'Factory License Info', delay: 6000 },
      { from: 'bank', to: 'utility', dataType: 'Bank Account Verification', delay: 8000 },
      { from: 'rjsc', to: 'bank', dataType: 'Director Information', delay: 10000 }
    ];

    flows.forEach(flow => {
      setTimeout(() => {
        if (!isSimulating) return;

        const packetId = `packet-${Date.now()}-${Math.random()}`;
        const packet: DataPacket = {
          id: packetId,
          from: flow.from,
          to: flow.to,
          dataType: flow.dataType,
          status: 'transmitting',
          timestamp: new Date().toISOString(),
          size: `${Math.floor(Math.random() * 500 + 100)}KB`
        };

        setActivePackets(prev => [...prev, packet]);

        // Simulate packet journey
        setTimeout(() => {
          setActivePackets(prev =>
            prev.map(p => p.id === packetId ? { ...p, status: 'received' as const } : p)
          );
        }, 1000);

        setTimeout(() => {
          setActivePackets(prev =>
            prev.map(p => p.id === packetId ? { ...p, status: 'verified' as const } : p)
          );

          // Add to logs
          const log: ExchangeLog = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            from: flow.from.toUpperCase(),
            to: flow.to.toUpperCase(),
            action: 'Data Exchange',
            dataType: flow.dataType,
            status: 'success',
            duration: Math.floor(Math.random() * 500 + 200)
          };
          setLogs(prev => [log, ...prev].slice(0, 20));

          // Update stats
          setStats(prev => ({
            totalExchanges: prev.totalExchanges + 1,
            activeConnections: prev.activeConnections,
            avgResponseTime: Math.floor((prev.avgResponseTime + log.duration) / 2),
            successRate: 100
          }));

          // Remove packet after verification
          setTimeout(() => {
            setActivePackets(prev => prev.filter(p => p.id !== packetId));
          }, 1500);
        }, 2000);
      }, flow.delay);
    });
  }

  useEffect(() => {
    if (isSimulating) {
      setStats(prev => ({ ...prev, activeConnections: activePackets.length }));
    }
  }, [activePackets, isSimulating]);

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
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Network className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Inter-Agency Data Exchange</h1>
                <p className="text-gray-600">Real-time government data fabric simulation</p>
              </div>
            </div>
            <Button
              onClick={isSimulating ? stopSimulation : startLiveMonitor}
              size="lg"
              className={isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}
            >
              {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalExchanges}</div>
                    <div className="text-sm text-gray-600">Total Exchanges</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.activeConnections}</div>
                    <div className="text-sm text-gray-600">Active Connections</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}ms</div>
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Reference Standards */}
        <Card className="mb-8 border-l-4 border-l-indigo-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Based on Global Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Estonia</Badge>
                <div>
                  <div className="font-semibold">X-Road Data Exchange Layer</div>
                  <p className="text-sm text-gray-600">Secure, distributed data exchange backbone connecting 900+ institutions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">International</Badge>
                <div>
                  <div className="font-semibold">Government Data Fabric</div>
                  <p className="text-sm text-gray-600">API-first architecture enabling real-time inter-agency data sharing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Agency Network Visualization */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Agency Network Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-[500px] bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6">
                  {/* Draw agencies in a circular pattern */}
                  {agencies.map((agency, index) => {
                    const angle = (index / agencies.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = 180;
                    const x = Math.cos(angle) * radius + 250;
                    const y = Math.sin(angle) * radius + 200;

                    return (
                      <motion.div
                        key={agency.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${agency.color} flex flex-col items-center justify-center shadow-lg border-4 border-white cursor-pointer hover:scale-110 transition-transform`}>
                          <div className="text-white">{agency.icon}</div>
                          <span className="text-white font-bold text-xs mt-1">{agency.code}</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-center">
                          <div className="font-semibold text-gray-900">{agency.name}</div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Center hub */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl border-4 border-white">
                      <div className="text-center text-white">
                        <Network className="w-10 h-10 mx-auto mb-1" />
                        <div className="text-xs font-bold">OSS</div>
                        <div className="text-xs">Data Hub</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Animate data packets */}
                  <AnimatePresence>
                    {activePackets.map((packet) => {
                      const fromAgency = agencies.find(a => a.id === packet.from);
                      const toAgency = agencies.find(a => a.id === packet.to);

                      if (!fromAgency || !toAgency) return null;

                      const fromIndex = agencies.findIndex(a => a.id === packet.from);
                      const toIndex = agencies.findIndex(a => a.id === packet.to);

                      const fromAngle = (fromIndex / agencies.length) * 2 * Math.PI - Math.PI / 2;
                      const toAngle = (toIndex / agencies.length) * 2 * Math.PI - Math.PI / 2;

                      const radius = 180;
                      const fromX = Math.cos(fromAngle) * radius + 250;
                      const fromY = Math.sin(fromAngle) * radius + 200;
                      const toX = Math.cos(toAngle) * radius + 250;
                      const toY = Math.sin(toAngle) * radius + 200;

                      return (
                        <motion.div
                          key={packet.id}
                          initial={{ left: fromX, top: fromY, opacity: 0, scale: 0 }}
                          animate={{
                            left: toX,
                            top: toY,
                            opacity: packet.status === 'verified' ? 0 : 1,
                            scale: packet.status === 'verified' ? 2 : 1
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 2, ease: 'linear' }}
                          className="absolute w-8 h-8 -ml-4 -mt-4"
                        >
                          <div className={`w-full h-full rounded-full ${
                            packet.status === 'verified' ? 'bg-green-500' :
                            packet.status === 'received' ? 'bg-blue-500' :
                            'bg-purple-500'
                          } shadow-lg flex items-center justify-center animate-pulse`}>
                            <Database className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exchange Logs */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Live Exchange Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {logs.length === 0 && !isSimulating && (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Start simulation to see data exchange</p>
                    </div>
                  )}
                  <AnimatePresence>
                    {logs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-3 bg-white rounded-lg border shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{log.from}</Badge>
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                            <Badge variant="outline" className="text-xs">{log.to}</Badge>
                          </div>
                          <Badge
                            variant={log.status === 'success' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {log.duration}ms
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{log.dataType}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Governance Principles */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Data Governance Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">End-to-End Encryption</h4>
                  <p className="text-sm text-gray-600">All data packets encrypted with TLS 1.3 during transmission</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Audit Trail</h4>
                  <p className="text-sm text-gray-600">Every data exchange logged with timestamp and participants</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Data Minimization</h4>
                  <p className="text-sm text-gray-600">Only essential data shared based on service requirements</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}