/**
 * 🔌 EMBEDDABLE WIDGETS SYSTEM (DEMO)
 * Allows media/partner websites to embed FDI metrics
 * Demo version with copy-paste embed codes
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Copy, Check, Globe, TrendingUp, DollarSign, ExternalLink, Settings } from 'lucide-react';
import { getFdiPulse } from '@/app/engines/fdiPulseEngine';

type WidgetType = 'full-dashboard' | 'metrics-card' | 'ticker' | 'sector-chart' | 'mini-stats';
type WidgetTheme = 'light' | 'dark' | 'brand';

interface WidgetConfig {
  type: WidgetType;
  theme: WidgetTheme;
  width: string;
  height: string;
  showHeader: boolean;
  autoRefresh: boolean;
}

const WIDGET_TEMPLATES: Record<WidgetType, { name: string; description: string; preview: string }> = {
  'full-dashboard': {
    name: 'Full FDI Dashboard',
    description: 'Complete dashboard with all metrics and visualizations',
    preview: '800x600'
  },
  'metrics-card': {
    name: 'Quick Metrics Card',
    description: 'Compact card showing key FDI statistics',
    preview: '400x300'
  },
  'ticker': {
    name: 'Live Registration Ticker',
    description: 'Scrolling ticker of recent company registrations',
    preview: '100%x80'
  },
  'sector-chart': {
    name: 'Sector Investment Chart',
    description: 'Visual breakdown of FDI by sector',
    preview: '500x400'
  },
  'mini-stats': {
    name: 'Mini Stats Badge',
    description: 'Small badge with total FDI amount',
    preview: '200x100'
  }
};

export function EmbeddableWidgets() {
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>('metrics-card');
  const [config, setConfig] = useState<WidgetConfig>({
    type: 'metrics-card',
    theme: 'light',
    width: '400px',
    height: '300px',
    showHeader: true,
    autoRefresh: true
  });
  const [copied, setCopied] = useState(false);
  
  const pulse = getFdiPulse();
  
  const generateEmbedCode = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://bida.gov.bd';
    const params = new URLSearchParams({
      widget: config.type,
      theme: config.theme,
      width: config.width,
      height: config.height,
      header: config.showHeader.toString(),
      refresh: config.autoRefresh.toString()
    });
    
    // Generate iframe embed code
    return `<!-- BIDA FDI Widget - ${WIDGET_TEMPLATES[config.type].name} -->
<iframe 
  src="${baseUrl}/widgets/fdi?${params.toString()}"
  width="${config.width}"
  height="${config.height}"
  frameborder="0"
  scrolling="no"
  title="Bangladesh FDI ${WIDGET_TEMPLATES[config.type].name}"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>
<!-- End BIDA FDI Widget -->`;
  };
  
  const generateScriptCode = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://bida.gov.bd';
    
    return `<!-- BIDA FDI Widget Script -->
<div id="bida-fdi-widget" data-widget="${config.type}" data-theme="${config.theme}"></div>
<script src="${baseUrl}/widgets/embed.js" async></script>
<!-- End BIDA FDI Widget Script -->`;
  };
  
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-600" />
          Embeddable Widgets
        </h2>
        <p className="text-gray-600">
          Share Bangladesh's FDI success story on your website with easy-to-embed widgets
        </p>
        <div className="mt-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg inline-flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-700 font-medium">
            Demo Mode: Embed codes for testing purposes only
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Widget Selection & Configuration */}
        <div className="space-y-6">
          {/* Widget Type Selection */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">1. Choose Widget Type</h3>
            <div className="space-y-2">
              {(Object.keys(WIDGET_TEMPLATES) as WidgetType[]).map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedWidget(type);
                    setConfig({ ...config, type });
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedWidget === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        {WIDGET_TEMPLATES[type].name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {WIDGET_TEMPLATES[type].description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Size: {WIDGET_TEMPLATES[type].preview}
                      </p>
                    </div>
                    {selectedWidget === type && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Widget Configuration */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-700" />
              2. Configure Widget
            </h3>
            <div className="space-y-4">
              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'dark', 'brand'] as WidgetTheme[]).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setConfig({ ...config, theme })}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        config.theme === theme
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width
                </label>
                <input
                  type="text"
                  value={config.width}
                  onChange={(e) => setConfig({ ...config, width: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 400px or 100%"
                />
              </div>
              
              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </label>
                <input
                  type="text"
                  value={config.height}
                  onChange={(e) => setConfig({ ...config, height: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 300px"
                />
              </div>
              
              {/* Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showHeader}
                    onChange={(e) => setConfig({ ...config, showHeader: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show widget header</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.autoRefresh}
                    onChange={(e) => setConfig({ ...config, autoRefresh: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Auto-refresh data (every 5 min)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Preview & Embed Code */}
        <div className="space-y-6">
          {/* Live Preview */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Preview</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <WidgetPreview type={config.type} theme={config.theme} pulse={pulse} />
            </div>
          </div>
          
          {/* Embed Code - Iframe Method */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">3. Copy Embed Code</h3>
              <button
                onClick={() => handleCopy(generateEmbedCode())}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                {generateEmbedCode()}
              </pre>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Paste this code into your website's HTML where you want the widget to appear.
            </p>
          </div>
          
          {/* Alternative: Script Method */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Alternative: Script Method</h3>
              <button
                onClick={() => handleCopy(generateScriptCode())}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy
              </button>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                {generateScriptCode()}
              </pre>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Lightweight script-based embed (recommended for modern websites).
            </p>
          </div>
          
          {/* Usage Examples */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              Who Can Use These Widgets?
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Media outlets</strong> covering Bangladesh economy & investment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Partner organizations</strong> (chambers of commerce, trade bodies)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Government websites</strong> (ministries, economic zones)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Research institutions</strong> & think tanks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Investment firms</strong> showcasing Bangladesh opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Widget Preview Component
 */
function WidgetPreview({ 
  type, 
  theme, 
  pulse 
}: { 
  type: WidgetType; 
  theme: WidgetTheme; 
  pulse: ReturnType<typeof getFdiPulse>;
}) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  const isDark = theme === 'dark';
  const isBrand = theme === 'brand';
  
  const bgClass = isDark ? 'bg-gray-900' : isBrand ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-white';
  const textClass = isDark || isBrand ? 'text-white' : 'text-gray-900';
  const subtextClass = isDark || isBrand ? 'text-gray-300' : 'text-gray-600';
  
  if (type === 'full-dashboard') {
    return (
      <div className={`${bgClass} ${textClass} p-6 rounded-lg`}>
        <h3 className="text-xl font-bold mb-4">Bangladesh FDI Dashboard</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={`text-sm ${subtextClass}`}>Total FDI</p>
            <p className="text-2xl font-bold">{formatCurrency(pulse.totalFDI)}</p>
          </div>
          <div>
            <p className={`text-sm ${subtextClass}`}>Projects</p>
            <p className="text-2xl font-bold">{pulse.totalProjects.toLocaleString()}</p>
          </div>
        </div>
        <p className={`text-xs ${subtextClass} mt-4`}>Powered by BIDA</p>
      </div>
    );
  }
  
  if (type === 'metrics-card') {
    return (
      <div className={`${bgClass} ${textClass} p-4 rounded-lg shadow-lg`}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5" />
          <h4 className="font-bold">Bangladesh FDI</h4>
        </div>
        <div className="space-y-2">
          <div>
            <p className={`text-xs ${subtextClass}`}>Total Investment</p>
            <p className="text-xl font-bold">{formatCurrency(pulse.totalFDI)}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className={`text-xs ${subtextClass}`}>Projects</p>
              <p className="font-semibold">{pulse.totalProjects.toLocaleString()}</p>
            </div>
            <div>
              <p className={`text-xs ${subtextClass}`}>Jobs</p>
              <p className="font-semibold">{pulse.totalJobs.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <p className={`text-xs ${subtextClass} mt-3`}>Live • {pulse.lastUpdated}</p>
      </div>
    );
  }
  
  if (type === 'ticker') {
    return (
      <div className={`${bgClass} ${textClass} p-3 rounded-lg overflow-hidden`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold">LIVE REGISTRATIONS</span>
        </div>
        <div className="text-sm">
          <p>🏢 H&M Manufacturing Hub registered • 🏢 Tokyo Electronics BD registered</p>
        </div>
      </div>
    );
  }
  
  if (type === 'sector-chart') {
    return (
      <div className={`${bgClass} ${textClass} p-4 rounded-lg`}>
        <h4 className="font-bold mb-3">FDI by Sector</h4>
        <div className="space-y-2">
          {pulse.sectorBreakdown.slice(0, 4).map((sector, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1">
                <span>{sector.name}</span>
                <span>{sector.percent}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${sector.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (type === 'mini-stats') {
    return (
      <div className={`${bgClass} ${textClass} p-3 rounded-lg text-center`}>
        <DollarSign className="w-6 h-6 mx-auto mb-1" />
        <p className="text-lg font-bold">{formatCurrency(pulse.totalFDI)}</p>
        <p className={`text-xs ${subtextClass}`}>Bangladesh FDI 2024</p>
      </div>
    );
  }
  
  return null;
}
