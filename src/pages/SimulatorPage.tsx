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
import { PageId, Language } from '../types';
import { getSavedLanguage } from '../i18n';

interface SimulatorPageProps {
  language?: Language;
  onNavigate: (page: PageId) => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({
  language = getSavedLanguage(),
  onNavigate,
}) => {
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
      recommendation =
        language === 'hi'
          ? 'तत्काल आपातकालीन जैव-सुरक्षा छिड़काव आवश्यक'
          : 'IMMEDIATE EMERGENCY BIO-SHIELDING REQUIRED';
      recommendationSub =
        language === 'hi'
          ? 'उच्च आर्द्रता और आने वाली बारिश 18 घंटों के भीतर पत्तियों पर बीजाणुओं के प्रसार को तेज कर देगी। बारिश शुरू होने से पहले तुरंत ट्राइकोडर्मा या नीम का छिड़काव करें।'
          : 'High humidity and approaching rain front will accelerate airborne urediniospores across field canopies within 18 hours. Perform proactive Trichoderma or Neem spray immediately before rain starts.';
    } else if (boundedScore > 60) {
      riskLevel = 'High';
      recommendation =
        language === 'hi'
          ? 'उच्च सतर्कता: सुबह खेत का गहन निरीक्षण करें'
          : 'HIGH ALERT: CONDUCT MORNING FIELD INSPECTION';
      recommendationSub =
        language === 'hi'
          ? 'अनुकूल तापमान और पास में बीजाणु संकुल मौजूद हैं। नारंगी धब्बों के लिए निचले पत्तों की जांच करें। पत्तों पर नमी रोकने के लिए शाम की सिंचाई टालें।'
          : 'Favourable temperature & spore clusters nearby. Check lower leaves for orange pustules. Pause evening sprinkler irrigation to avoid prolonged leaf-wetness.';
    } else if (boundedScore > 30) {
      riskLevel = 'Medium';
      recommendation =
        language === 'hi'
          ? 'मध्यम निगरानी: प्रकोप बफर पर नज़र रखें'
          : 'MODERATE VIGILANCE: MONITOR OUTBREAK BUFFER';
      recommendationSub =
        language === 'hi'
          ? 'पड़ोसी क्षेत्रों में रोग सक्रिय है, लेकिन वर्तमान मौसम इसके तेजी से फैलने के लिए पूरी तरह अनुकूल नहीं है। हर 4 दिन में पुनः जांच करें।'
          : 'Pathogen spread is active in neighboring districts, but microclimate conditions are suboptimal for exponential explosion. Re-scan every 4 days.';
    } else {
      riskLevel = 'Low';
      recommendation =
        language === 'hi'
          ? 'अनुकूल स्थिति: नियमित सामान्य निगरानी'
          : 'FAVOURABLE SAFETY: STANDARD MONITORING';
      recommendationSub =
        language === 'hi'
          ? 'शुष्क वातावरण और कम नजदीकी मामलों के कारण आपका खेत सुरक्षित है। नियमित फसल पोषण बनाए रखें।'
          : 'Dry atmospheric conditions and low nearby inoculum density keep your farm well within the safe buffer. Maintain regular crop nutrition.';
    }

    return {
      score: boundedScore,
      riskLevel,
      spreadRadius: Number(spreadRadius),
      recommendation,
      recommendationSub,
    };
  }, [rainIn48Hours, temperature, humidity, nearbyCases, language]);

  const getRiskLabelText = (level: string) => {
    if (language !== 'hi') return `${level.toUpperCase()} RISK`;
    switch (level.toLowerCase()) {
      case 'critical':
        return 'अति-गंभीर जोखिम';
      case 'high':
        return 'उच्च जोखिम';
      case 'medium':
        return 'मध्यम जोखिम';
      default:
        return 'कम जोखिम';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {language === 'hi' ? 'परिदृश्य मॉडलिंग इंजन' : 'Scenario Modeling Engine'}
            </span>
            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {language === 'hi' ? 'इंटरैक्टिव सिमुलेटर' : 'Interactive USP'}
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            {language === 'hi' ? 'क्या-अगर प्रकोप सिम्युलेटर' : 'WHAT-IF OUTBREAK SIMULATOR'}
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            {language === 'hi'
              ? 'जांचें कि बारिश, आर्द्रता, तापमान और आसपास के प्रकोप में बदलाव से आपके खेत का जोखिम कैसे बदलता है।'
              : "Test how shifts in rainfall, humidity, temperature, and neighbor outbreak density alter your farm's risk."}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer self-start"
        >
          <RotateCcw size={14} />
          <span>{language === 'hi' ? 'वर्तमान मौसम पर रीसेट करें' : 'Reset to Current Weather'}</span>
        </button>
      </div>

      {/* Simulator Grid: Left Controls (6 cols) & Right Dynamic Output (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 lg:p-7 shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-black text-slate-900 text-base">
              {language === 'hi' ? 'सूक्ष्म जलवायु एवं टेलीमेट्री पैरामीटर' : 'Microclimate & Telemetry Parameters'}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {language === 'hi' ? 'स्लाइडर समायोजित करें' : 'Adjust Sliders'}
            </span>
          </div>

          {/* 1. Rain in 48 Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <CloudRain size={16} className="text-indigo-600 mr-2" />
                {language === 'hi' ? 'क्या अगले 48 घंटों में बारिश की संभावना है?' : 'Rain Expected in Next 48 Hours?'}
              </span>
              <span className="font-black text-slate-900">
                {rainIn48Hours
                  ? language === 'hi' ? 'हाँ (बारिश का पूर्वानुमान)' : 'YES (Rain Forecasted)'
                  : language === 'hi' ? 'नहीं (साफ आसमान)' : 'NO (Clear Skies)'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setRainIn48Hours(true)}
                className={`py-3 rounded-2xl text-xs font-black transition-all border cursor-pointer ${
                  rainIn48Hours
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                    : 'bg-slate-50 text-slate-700 border-gray-200 hover:bg-slate-100'
                }`}
              >
                🌧️ {language === 'hi' ? 'हाँ, बारिश का अनुमान' : 'Yes, Rain Predicted'}
              </button>
              <button
                type="button"
                onClick={() => setRainIn48Hours(false)}
                className={`py-3 rounded-2xl text-xs font-black transition-all border cursor-pointer ${
                  !rainIn48Hours
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                    : 'bg-slate-50 text-slate-700 border-gray-200 hover:bg-slate-100'
                }`}
              >
                ☀️ {language === 'hi' ? 'बारिश की संभावना नहीं' : 'No Rain Expected'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'hi'
                ? 'बारिश की फुहारें बीजाणुओं को आसपास की पत्तियों पर फैलाती हैं और कवक प्रवेश के लिए आवश्यक 6 घंटे की नमी प्रदान करती हैं।'
                : 'Rain showers wash spores onto adjacent leaves and provide the 6-hour wetness layer required for hyphal penetration.'}
            </p>
          </div>

          {/* 2. Temperature Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <ThermometerSun size={16} className="text-amber-500 mr-2" />
                {language === 'hi' ? 'परिवेश का तापमान' : 'Ambient Temperature'}
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
              <span>15°C ({language === 'hi' ? 'ठंडा' : 'Cool'})</span>
              <span className="text-amber-600 font-bold">
                24°C - 30°C ({language === 'hi' ? 'रतुआ के लिए सबसे अनुकूल' : 'Optimal Rust Range'})
              </span>
              <span>40°C ({language === 'hi' ? 'गर्म / सूखा' : 'Hot / Dry'})</span>
            </div>
          </div>

          {/* 3. Humidity Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <Droplets size={16} className="text-blue-500 mr-2" />
                {language === 'hi' ? 'वायुमंडलीय सापेक्ष आर्द्रता' : 'Atmospheric Relative Humidity'}
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
              <span>30% ({language === 'hi' ? 'शुष्क हवा' : 'Dry Air'})</span>
              <span className="text-blue-600 font-bold">
                &gt;70% ({language === 'hi' ? 'उच्च खतरे का क्षेत्र' : 'High Danger Zone'})
              </span>
              <span>100% ({language === 'hi' ? 'संतृप्त' : 'Saturated'})</span>
            </div>
          </div>

          {/* 4. Nearby Outbreak Cases Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 flex items-center">
                <Users size={16} className="text-red-500 mr-2" />
                {language === 'hi' ? 'निकटवर्ती सत्यापित रिपोर्ट (5 किमी के भीतर)' : 'Nearby Validated Reports (Within 5 km)'}
              </span>
              <span className="text-base font-black text-slate-900">
                {nearbyCases} {language === 'hi' ? 'रिपोर्ट' : 'Reports'}
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
              <span>0 {language === 'hi' ? 'मामले (सुरक्षित)' : 'Cases (Safe)'}</span>
              <span className="text-red-600 font-bold">
                10+ {language === 'hi' ? 'मामले (गंभीर प्रकोप)' : 'Cases (Severe Outbreak)'}
              </span>
              <span>20 {language === 'hi' ? 'मामले (महामारी)' : 'Cases (Epidemic)'}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Simulation Output Column */}
        <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-black tracking-widest text-emerald-400 uppercase">
                {language === 'hi' ? 'अनुमानित सिमुलेशन परिणाम' : 'PREDICTED SIMULATION OUTPUT'}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {language === 'hi' ? 'वास्तविक समय गणना' : 'Real-Time Calculation'}
              </span>
            </div>

            {/* Dynamic Circular Risk Gauge */}
            <div className="my-6 flex flex-col items-center">
              <RiskGauge
                score={simulationResults.score}
                label={getRiskLabelText(simulationResults.riskLevel)}
                sublabel={language === 'hi' ? 'सिम्युलेटेड परिणाम' : 'SIMULATED OUTCOME'}
                size="lg"
                language={language}
                showConfidence={false}
              />
            </div>

            {/* Predicted Spread Radius Indicator */}
            <div className="grid grid-cols-2 gap-3 my-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'hi' ? 'अनुमानित फैलाव दायरा' : 'Predicted Spread Radius'}
                </span>
                <p className="text-xl font-black text-orange-400 mt-0.5">
                  {simulationResults.spreadRadius} {language === 'hi' ? 'किमी' : 'km'}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {language === 'hi' ? 'अनुमानित खतरा क्षेत्र' : 'Estimated danger plume zone'}
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'hi' ? 'सिमुलेशन जोखिम स्तर' : 'Simulation Risk Tier'}
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
                  {getRiskLabelText(simulationResults.riskLevel)}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {language === 'hi' ? 'सीमा: 0-30/60/80/100' : 'Threshold: 0-30/60/80/100'}
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
              {language === 'hi'
                ? 'सोनीपत के ऐतिहासिक सूक्ष्म जलवायु डेटा के साथ सहसंबद्ध।'
                : 'Correlates with Sonipat historical microclimate data.'}
            </span>
            <button
              onClick={() => onNavigate('action')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-xl transition-colors flex items-center cursor-pointer"
            >
              {language === 'hi' ? 'कार्ययोजना में लागू करें' : 'Apply to Action Plan'}
              <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

