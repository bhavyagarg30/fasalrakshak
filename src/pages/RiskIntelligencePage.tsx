import React from 'react';
import {
  LineChart as LineIcon,
  ShieldAlert,
  ThermometerSun,
  Droplets,
  Wind,
  Layers,
  AlertTriangle,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RiskGauge } from '../components/RiskGauge';
import { PageId } from '../types';

interface RiskIntelligencePageProps {
  onNavigate: (page: PageId) => void;
}

const SEVEN_DAY_TREND = [
  { day: 'Mon', risk: 42, disease: 38, pest: 25 },
  { day: 'Tue', risk: 48, disease: 44, pest: 28 },
  { day: 'Wed', risk: 54, disease: 50, pest: 32 },
  { day: 'Thu', risk: 65, disease: 62, pest: 38 },
  { day: 'Fri', risk: 70, disease: 67, pest: 40 },
  { day: 'Sat', risk: 71, disease: 68, pest: 41 },
  { day: 'Today', risk: 72, disease: 68, pest: 42 },
];

const WEATHER_SUITABILITY = [
  { factor: 'Humidity >75%', suitability: 88, status: 'Extremely Favourable' },
  { factor: 'Temp 26-30°C', suitability: 82, status: 'Optimal Mycelium' },
  { factor: 'Night Dew Duration', suitability: 78, status: 'Prolonged Wetness' },
  { factor: 'Wind Speed >12km/h', suitability: 72, status: 'Dispersal Active' },
  { factor: 'UV Index Dampening', suitability: 65, status: 'Cloud Shadowing' },
];

export const RiskIntelligencePage: React.FC<RiskIntelligencePageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Predictive Analytics
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            CROP RISK INTELLIGENCE
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Multifactorial epidemiological modeling for Sonipat agrarian micro-district.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800 flex items-center space-x-1.5">
            <Info size={14} className="text-amber-600" />
            <span>PROTOTYPE RISK MODEL</span>
          </div>
        </div>
      </div>

      {/* Main Score + Four Primary Risk Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Composite Score (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col justify-between items-center text-center">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            Current Farm Composite Risk
          </span>

          <div className="my-4">
            <RiskGauge score={72} label="HIGH RISK" size="lg" confidence={91} />
          </div>

          <div className="w-full bg-[#F7FAF7] rounded-2xl p-4 border border-gray-100 text-left space-y-1 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-slate-500">Risk Threshold:</span>
              <span className="text-red-600">61–80 (HIGH RISK)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Composite index calculated from 6 weighted environmental, biological, and telemetry inputs.
            </p>
          </div>
        </div>

        {/* Four Cards (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Disease Risk */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Biotic Factor 1
                </span>
                <h4 className="text-lg font-black text-slate-800 mt-0.5">
                  Disease Risk
                </h4>
              </div>
              <span className="text-2xl font-black text-red-600">68</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full my-3 overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-xs text-slate-500">
              Triggered by active Wheat Brown Rust reports in 3.2 km perimeter.
            </p>
          </div>

          {/* Pest Risk */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Biotic Factor 2
                </span>
                <h4 className="text-lg font-black text-slate-800 mt-0.5">
                  Pest Risk
                </h4>
              </div>
              <span className="text-2xl font-black text-amber-500">42</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full my-3 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }} />
            </div>
            <p className="text-xs text-slate-500">
              Moderate Fall Armyworm pressure on maize plots along river Khadar.
            </p>
          </div>

          {/* Weather Risk */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Abiotic Driver
                </span>
                <h4 className="text-lg font-black text-slate-800 mt-0.5">
                  Weather Risk
                </h4>
              </div>
              <span className="text-2xl font-black text-red-600">81</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full my-3 overflow-hidden">
              <div className="bg-red-600 h-full rounded-full" style={{ width: '81%' }} />
            </div>
            <p className="text-xs text-slate-500">
              76% humidity and rain probability above 60% accelerate fungal germination.
            </p>
          </div>

          {/* Spread Risk */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Dispersal Dynamics
                </span>
                <h4 className="text-lg font-black text-slate-800 mt-0.5">
                  Spread Risk
                </h4>
              </div>
              <span className="text-2xl font-black text-red-600">76</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full my-3 overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '76%' }} />
            </div>
            <p className="text-xs text-slate-500">
              14 km/h East-North-East winds create direct vector toward your farm.
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          CHARTS SECTION (7-day trend, Disease vs Pest, Suitability)
          -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Risk Trend */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                7-Day Risk Trend & Escalation
              </h4>
              <p className="text-[11px] text-slate-400">
                Tracking composite risk accumulation since Mon
              </p>
            </div>
            <span className="text-xs font-bold text-red-600">+27 pts this week</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SEVEN_DAY_TREND}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#DC2626"
                  strokeWidth={3}
                  fill="url(#riskGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disease vs Pest Risk Comparison */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                Disease vs Pest Risk Evolution
              </h4>
              <p className="text-[11px] text-slate-400">
                Comparative trajectory across both biological threat vectors
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SEVEN_DAY_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="disease" name="Disease Risk (Fungal)" fill="#EF4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pest" name="Pest Risk (Insects)" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          EXPLAINABLE AI: WHY THIS RISK SCORE?
          -------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Explainable AI (XAI)
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              WHY THIS RISK SCORE?
            </h3>
            <p className="text-xs text-slate-500">
              Factor contribution breakdown explaining the 72 / 100 High Risk assessment.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400">
              Prototype Scoring Engine v2.4
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Factor 1: Disease Detection (HIGH) */}
          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">1. Disease Detection (Active Outbreak Signatures)</span>
              <span className="text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-black text-[10px]">
                HIGH (Weight: 25%)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Confirmed 94% computer-vision confidence matches of Brown Rust pustules in the sub-district.
            </p>
          </div>

          {/* Factor 2: Weather (HIGH) */}
          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">2. Microclimatic Weather Suitability</span>
              <span className="text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-black text-[10px]">
                HIGH (Weight: 20%)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '81%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              76% relative humidity combined with 29°C temperature meets the exact epidemiological threshold for spore release.
            </p>
          </div>

          {/* Factor 3: Nearby Cases (HIGH) */}
          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">3. Nearby Geotagged Outbreak Cases</span>
              <span className="text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-black text-[10px]">
                HIGH (Weight: 20%)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '78%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              7 validated reports from farmers within 3.2 km radius in the past 24 hours.
            </p>
          </div>

          {/* Factor 4: Crop Stage (MEDIUM) */}
          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">4. Crop Phenological Growth Stage</span>
              <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-black text-[10px]">
                MEDIUM (Weight: 15%)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Tillering stage wheat has rapid leaf cell division, making epidermis easily penetrable by fungal haustoria.
            </p>
          </div>

          {/* Factor 5: Historical Pattern (MEDIUM) */}
          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">5. Multi-Year Historical Outbreak Pattern</span>
              <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-black text-[10px]">
                MEDIUM (Weight: 10%)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '55%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Sonipat-Karnal belt experiences yellow/brown rust spikes every 3 seasons during early March dew peaks.
            </p>
          </div>
        </div>

        {/* Prototype Disclaimer */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-start space-x-3 text-xs text-slate-500">
          <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>PROTOTYPE RISK MODEL NOTICE:</strong> This intelligence is computed using simulated mathematical weights for demonstration purposes in Smart India Hackathon prototypes. It does not claim full regulatory certification by ICAR.
          </p>
        </div>
      </div>
    </div>
  );
};
