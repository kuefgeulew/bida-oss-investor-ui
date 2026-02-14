/**
 * 🫧 SECTOR BUBBLE CHART
 * Interactive bubble visualization where size = investment amount, color = sector
 * Cinematic visualization like Dubai FDI Monitor
 */

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SECTOR_SPLIT } from '@/app/data/bangladeshEconomicMock';
import { TrendingUp } from 'lucide-react';

export function SectorBubbleChart() {
  const bubbleData = useMemo(() => {
    // Transform sector data into bubble chart format
    // x-axis: Growth rate, y-axis: Projects, z-axis (size): Investment amount
    return SECTOR_SPLIT.map((sector, index) => ({
      name: sector.name,
      x: sector.growth,           // Growth rate on X axis
      y: sector.projects,          // Number of projects on Y axis
      z: sector.value,             // Investment amount determines bubble size
      color: sector.color,
      amount: sector.value,
      projects: sector.projects,
      growth: sector.growth
    }));
  }, []);
  
  const formatCurrency = (value: number) => {
    return `$${value}M`;
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-900 mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Investment:</span> {formatCurrency(data.amount)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Projects:</span> {data.projects}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Growth:</span> {data.growth}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Sector Investment Bubbles
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Size = Investment • X-axis = Growth • Y-axis = Projects
          </p>
        </div>
      </div>
      
      {/* Bubble Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
              type="number"
              dataKey="x"
              name="Growth"
              unit="%"
              domain={[0, 'auto']}
              label={{ value: 'Growth Rate (%)', position: 'bottom', offset: 0 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Projects"
              domain={[0, 'auto']}
              label={{ value: 'Number of Projects', angle: -90, position: 'left' }}
            />
            <ZAxis
              type="number"
              dataKey="z"
              range={[400, 4000]}
              name="Investment"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={bubbleData} animationDuration={800}>
              {bubbleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend with Sector Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bubbleData.slice(0, 8).map((sector) => (
          <motion.div
            key={sector.name}
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: sector.color }}
              ></div>
              <p className="text-xs font-semibold text-gray-900 truncate">
                {sector.name}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(sector.amount)}
            </p>
            <p className="text-xs text-green-600 font-medium">
              +{sector.growth}% growth
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
