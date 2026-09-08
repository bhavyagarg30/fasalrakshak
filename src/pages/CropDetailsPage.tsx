import React from 'react';
import {
  ArrowLeft,
  Calendar,
  Layers,
  Sprout,
  ShieldAlert,
  ChevronRight,
  Activity,
  CheckCircle2,
  Camera,
  AlertTriangle,
  History,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CropInfo, PageId, Language } from '../types';
import { getSavedLanguage } from '../i18n';

interface CropDetailsPageProps {
  crop: CropInfo;
  language?: Language;
  onNavigate: (page: PageId) => void;
}

export const CropDetailsPage: React.FC<CropDetailsPageProps> = ({
  crop,
  language = getSavedLanguage(),
  onNavigate,
}) => {
  const historicalData = [
    { week: language === 'hi' ? 'सप्ताह 1' : 'Week 1', health: 92, risk: 20 },
    { week: language === 'hi' ? 'सप्ताह 2' : 'Week 2', health: 89, risk: 25 },
    { week: language === 'hi' ? 'सप्ताह 3' : 'Week 3', health: 85, risk: 35 },
    { week: language === 'hi' ? 'सप्ताह 4' : 'Week 4', health: 82, risk: 48 },
    { week: language === 'hi' ? 'सप्ताह 5' : 'Week 5', health: 78, risk: 62 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top back button */}
      <button
        onClick={() => onNavigate('crops')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span>{language === 'hi' ? 'मेरी फसलों पर वापस जाएं' : 'Back to My Crops'}</span>
      </button>

      {/* Main Crop Header Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {language === 'hi' ? 'सक्रिय खेत' : 'Active Plot'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{crop.localName}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              {crop.name} ({crop.variety})
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              {language === 'hi'
                ? 'खेत का स्थान: ब्लॉक बी, मुरथल उत्तर, सोनीपत'
                : 'Plot Location: Field Block B, Murthal North, Sonipat'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('scan')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2 shadow-md shadow-emerald-200 transition-all cursor-pointer self-start"
          >
            <Camera size={16} />
            <span>{language === 'hi' ? 'इस खेत की जांच करें' : 'Scan This Plot'}</span>
          </button>
        </div>

        {/* Core Parameters Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              {language === 'hi' ? 'खेत का रकबा' : 'Plot Size'}
            </span>
            <p className="text-lg font-black text-slate-900 mt-0.5">{crop.area}</p>
          </div>

          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              {language === 'hi' ? 'बुवाई तिथि' : 'Sowing Date'}
            </span>
            <p className="text-lg font-black text-slate-900 mt-0.5">{crop.sowingDate}</p>
          </div>

          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              {language === 'hi' ? 'विकास अवस्था' : 'Growth Stage'}
            </span>
            <p className="text-lg font-black text-emerald-700 mt-0.5 truncate">
              {crop.growthStage.split('(')[0]}
            </p>
          </div>

          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              {language === 'hi' ? 'स्वास्थ्य स्कोर' : 'Health Score'}
            </span>
            <p className="text-lg font-black text-slate-900 mt-0.5">
              {crop.healthScore} <span className="text-xs text-slate-400">/ 100</span>
            </p>
          </div>
        </div>

        {/* Personalized Risk History Chart */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center">
                <History size={16} className="text-emerald-600 mr-2" />
                {language === 'hi' ? 'व्यक्तिगत जोखिम व स्वास्थ्य इतिहास' : 'Personalized Risk & Health History'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'hi'
                  ? '5 सप्ताह का स्वास्थ्य स्कोर बनाम रोग जोखिम प्रक्षेपवक्र'
                  : '5-Week health score vs spore exposure risk trajectory'}
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600">
              {language === 'hi' ? 'क्षेत्रीय आर्द्रता के कारण जोखिम बढ़ रहा है' : 'Risk climbing due to regional humidity'}
            </span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="plotRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#DC2626"
                  strokeWidth={2.5}
                  fill="url(#plotRisk)"
                  name={language === 'hi' ? 'जोखिम सूचकांक' : 'Threat Index'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Scans Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4">
            {language === 'hi' ? 'हालिया जांच और पत्ती लॉग' : 'Recent Scans & Foliar Logs'}
          </h3>

          <div className="space-y-3">
            {crop.scansHistory.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7FAF7] border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={scan.image}
                    alt="Scan thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{scan.diagnosis}</h4>
                    <p className="text-[11px] text-slate-400">
                      {scan.date} • {language === 'hi' ? 'तीव्रता: ' : 'Severity: '}
                      {scan.severity === 'None' && language === 'hi' ? 'कोई नहीं' : scan.severity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('scan')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                >
                  {language === 'hi' ? 'जांच विवरण देखें →' : 'View Scan Details →'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDED NEXT STEP (ACTION CALLOUT) */}
        <div className="mt-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
              {language === 'hi' ? 'कृषि वैज्ञानिक परामर्श' : 'Agronomic Advisory'}
            </span>
            <h4 className="text-sm font-black text-emerald-950">
              {language === 'hi'
                ? 'अनुशंसित अगला कदम: पत्ती निरीक्षण व हवा संचार'
                : 'RECOMMENDED NEXT STEP: Foliar Inspection & Canopy Aeration'}
            </h4>
            <p className="text-xs text-emerald-800/90 leading-relaxed">
              {language === 'hi'
                ? 'चूंकि 3.2 किमी के भीतर भूरा रतुआ सक्रिय है, आज दोपहर से पहले निचले पत्तों की जांच करें। इस सप्ताह यूरिया (नाइट्रोजन) का अधिक प्रयोग न करें।'
                : 'Because Brown Rust is active within 3.2 km, inspect lower leaves before noon today. Avoid nitrogen top-dressing this week.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('action')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-4 py-2.5 rounded-xl text-xs shrink-0 transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'कार्ययोजना खोलें' : 'Open Action Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};
