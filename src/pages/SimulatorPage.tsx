import React, { useState, useMemo } from 'react';
import {
  PlayCircle,
  RotateCcw,
  CloudRain,
  ThermometerSun,
  Droplets,
  Users,
  Compass,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react';
import { RiskGauge } from '../components/RiskGauge';
import { PageId } from '../types';

interface SimulatorPageProps {
  onNavigate: (page: PageId) => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onNavigate }) => {
  // Simulator Controls
  const [rainIn48Hours, setRainIn48Hours] = useState<boolean>(true);
  const [temperature, setTemperature] = useState<number>(29); // 15 to 40
  const [humidity, setHumidity] = useState<number>(76); // 30 to 100
  const [nearbyCases, setNearbyCases] = useState<number>(7); // 0 to 20

  // Reset to default
  const handleReset = () => {
    setRainIn48Hours(true);
    setTemperature(29);
    setHumidity(76);
    setNearbyCases(7);
  };

  // Dynamic simulation computation
  const simulationResults = useMemo(() => {
    // Rain component (0 or 20 pts)
    const rainScore = rainIn48Hours ? 25 : 5;

    // Temp component (Optimal fungal growth is 24°C - 30°C)
    let tempScore = 30;
    if (temperature >= 24 && temperature <= 30) {
      tempScore = 90;
    } else if (temperature >= 20 && temperature <= 34) {
      tempScore = 65;
    } else {
      tempScore = 25;
    }

    // Humidity component (Linear scaling: >70% is dangerous for rust)
    const humScore = Math.min(100, Math.max(10, Math.round(((humidity - 30) / 70) * 100)));

    // Nearby cases component (Each case adds up to 100)
    const casesScore = Math.min(100, nearbyCases * 6.5);

    // Weighted composite score (0-100)
    const composite = Math.round(
      casesScore * 0.35 +
      humScore * 0.25 +
      tempScore * 0.20 +
      rainScore * 0.20
    );

    const boundedScore = Math.min(100, Math.max(10, composite));

    // Calculate dynamic spread radius in km
    // Base 1.5 km + humidity factor + nearby cases
    const spreadRadius = (
      1.2 +
      (nearbyCases * 0.35) +
      (humidity > 70 ? 1.5 : 0.4) +
      (rainIn48Hours ? 0.8 : 0)
    ).toFixed(1);

    // Risk level formatting
    let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    let recommendation = '';
    let recommendationSub = '';

    if (boundedScore > 80) {
      riskLevel = 'Critical';
      recommendation = 'IMMEDIATE EMERGENCY BIO-SHIELDING REQUIRED';
      recommendationSub =
        'High humidity and approaching rain front will accelerate airborne urediniospores across field canopies within 18 hours. Perform proactive Trichoderma or Neem spray immediately before rain starts.';
    } else if (boundedScore > 60) {
      riskLevel = 'High';
      recommendation = 'HIGH ALERT: CONDUCT MORNING FIELD INSPECTION';
      recommendationSub =
        'Favourable temperature & spore clusters nearby. Check lower leaves for orange pustules. Pause evening sprinkler irrigation to avoid prolonged leaf-wetness.';
    } else if (boundedScore > 30) {
      riskLevel = 'Medium';
      recommendation = 'MODERATE VIGILANCE: MONITOR OUTBREAK BUFFER';
      recommendationSub =
        'Pathogen spread is active in neighboring districts, but microclimate conditions are suboptimal for exponential explosion. Re-scan every 4 days.';
    } else {
      riskLevel = 'Low';
      recommendation = 'FAVOURABLE SAFETY: STANDARD MONITORING';
      recommendationSub =
        'Dry atmospheric conditions and low nearby inoculum density keep your farm well within the safe buffer. Maintain regular crop nutrition.';
    }

    return {
      score: boundedScore,
      riskLevel,
      spreadRadius: Number(spreadRadius),
      recommendation,
      recommendationSub,
    };
  }, [rainIn48Hours, temperature, humidity, nearbyCases]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Scenario Modeling Engine
            </span>
            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Interactive USP
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            WHAT-IF OUTBREAK SIMULATOR
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Test how shifts in rainfall, humidity, temperature, and neighbor outbreak density alter your farm's risk.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer self-start"
        >
          <RotateCcw size={14} />
          <span>Reset to Current Weather</span>
        </button>
      </div>

      {/* Simulator Grid: Left Controls (6 cols) & Right Dynamic Output (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 lg:p-7 shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-black text-slate-900 text-base">
              Microclimate & Telemetry Parameters
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Adjust Sliders
            </span>
          </div>

          {/* 1. Rain in 48 Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <CloudRain size={16} className="text-indigo-600 mr-2" />
                Rain Expected in Next 48 Hours?
              </span>
              <span className="font-black text-slate-900">
                {rainIn48Hours ? 'YES (Rain Forecasted)' : 'NO (Clear Skies)'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setRainIn48Hours(true)}
                className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                  rainIn48Hours
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                    : 'bg-slate-50 text-slate-700 border-gray-200 hover:bg-slate-100'
                }`}
              >
                🌧️ Yes, Rain Predicted
              </button>
              <button
                type="button"
                onClick={() => setRainIn48Hours(false)}
                className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                  !rainIn48Hours
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                    : 'bg-slate-50 text-slate-700 border-gray-200 hover:bg-slate-100'
                }`}
              >
                ☀️ No Rain Expected
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Rain showers wash spores onto adjacent leaves and provide the 6-hour wetness layer required for hyphal penetration.
            </p>
          </div>

          {/* 2. Temperature Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <ThermometerSun size={16} className="text-amber-500 mr-2" />
                Ambient Temperature
              </span>
              <span className="text-base font-black text-slate-900">
                {temperature}°C
              </span>
            </div>

            <input
              type="range"
              min="15"
              max="40"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>15°C (Cool)</span>
              <span className="text-amber-600 font-bold">24°C - 30°C (Optimal Rust Range)</span>
              <span>40°C (Hot / Dry)</span>
            </div>
          </div>

          {/* 3. Humidity Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <Droplets size={16} className="text-blue-500 mr-2" />
                Atmospheric Relative Humidity
              </span>
              <span className="text-base font-black text-slate-900">
                {humidity}%
              </span>
            </div>

            <input
              type="range"
              min="30"
              max="100"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>30% (Dry Air)</span>
              <span className="text-blue-600 font-bold">&gt;70% (High Danger Zone)</span>
              <span>100% (Saturated)</span>
            </div>
          </div>

          {/* 4. Nearby Outbreak Cases Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <Users size={16} className="text-red-500 mr-2" />
                Nearby Validated Reports (Within 5 km)
              </span>
              <span className="text-base font-black text-slate-900">
                {nearbyCases} Reports
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="20"
              value={nearbyCases}
              onChange={(e) => setNearbyCases(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>0 Cases (Safe)</span>
              <span className="text-red-600 font-bold">10+ Cases (Severe Outbreak)</span>
              <span>20 Cases (Epidemic)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Simulation Output Column */}
        <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-black tracking-widest text-emerald-400 uppercase">
                PREDICTED SIMULATION OUTPUT
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                Real-Time Calculation
              </span>
            </div>

            {/* Dynamic Circular Risk Gauge */}
            <div className="my-6 flex flex-col items-center">
              <RiskGauge
                score={simulationResults.score}
                label={`${simulationResults.riskLevel.toUpperCase()} RISK`}
                sublabel="SIMULATED OUTCOME"
                size="lg"
                showConfidence={false}
              />
            </div>

            {/* Predicted Spread Radius Indicator */}
            <div className="grid grid-cols-2 gap-3 my-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Predicted Spread Radius
                </span>
                <p className="text-xl font-black text-orange-400 mt-0.5">
                  {simulationResults.spreadRadius} km
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Estimated danger plume zone
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Simulation Risk Tier
                </span>
                <p
                  className={`text-xl font-black mt-0.5 ${
                    simulationResults.riskLevel === 'Critical'
                      ? 'text-red-500'
                      : simulationResults.riskLevel === 'High'
                      ? 'text-orange-500'
                      : simulationResults.riskLevel === 'Medium'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {simulationResults.riskLevel}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Threshold: 0-30/60/80/100
                </p>
              </div>
            </div>

            {/* Dynamic Actionable Recommendation */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1.5">
              <div className="flex items-center space-x-2">
                <Sparkles size={15} className="text-emerald-400" />
                <span className="text-xs font-black text-emerald-400">
                  {simulationResults.recommendation}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {simulationResults.recommendationSub}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Correlates with Sonipat historical microclimate data.
            </span>
            <button
              onClick={() => onNavigate('action')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-xl transition-colors flex items-center"
            >
              Apply to Action Plan <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
