import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Languages,
  Leaf,
  AlertTriangle,
  FileCheck,
  Clock,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { ADVISORY_TRANSLATIONS } from '../data/demoData';
import { Language, PageId } from '../types';

interface ActionPlanPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: PageId) => void;
}

export const ActionPlanPage: React.FC<ActionPlanPageProps> = ({
  language,
  onLanguageChange,
  onNavigate,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const advisory = ADVISORY_TRANSLATIONS[language] || ADVISORY_TRANSLATIONS.en;

  const toggleStep = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            {language === 'hi' ? 'महामारी रोकथाम प्रोटोकॉल' : 'Epidemic Containment Protocol'}
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            {language === 'hi' ? '3-चरणीय कार्ययोजना' : '3-STEP ACTION PLAN'}
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            {language === 'hi'
              ? 'सोनीपत रतुआ प्रकोप से अपने गेहूं के खेत की सुरक्षा के लिए मानक संचालन प्रक्रिया (SOP)।'
              : 'Standard Operating Procedure (SOP) to protect your Wheat plot from the Sonipat Rust Cluster.'}
          </p>
        </div>

        {/* Multilingual Toggle Bar */}
        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-2xs">
          <Languages size={15} className="text-emerald-700 ml-1.5" />
          <span className="text-xs font-bold text-slate-500">{language === 'hi' ? 'भाषा:' : 'Language:'}</span>
          {(['en', 'hi', 'pa'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                language === lang
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'ਪੰਜਾਬੀ'}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
          <span>{language === 'hi' ? 'कार्ययोजना प्रगति' : 'Action Plan Progress'}</span>
          <span className="text-emerald-700 font-black">
            {completedSteps.length} / 3 {language === 'hi' ? 'चरण पूरे हुए' : 'Steps Completed'}
          </span>
        </div>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
            style={{ width: `${(completedSteps.length / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* 3 Steps Container */}
      <div className="space-y-6">
        {/* STEP 1 */}
        <div
          className={`bg-white rounded-3xl p-6 lg:p-7 shadow-sm border transition-all ${
            completedSteps.includes(1)
              ? 'border-emerald-300 bg-[#F7FAF7]'
              : 'border-gray-100 hover:border-emerald-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                  completedSteps.includes(1)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                1
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  {language === 'hi' ? 'तत्काल खेत निरीक्षण (अगले 6 घंटे)' : 'IMMEDIATE FIELD INSPECTION (NEXT 6 HOURS)'}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {advisory.step1_title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mt-1">
                  {advisory.step1_desc}
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <p>
                    {language === 'hi'
                      ? '• अपने गेहूं के खेत में तिरछा (W-पैटर्न) चलकर निरीक्षण करें।'
                      : '• Walk diagonally (W-pattern) across your 2.5-acre Wheat field.'}
                  </p>
                  <p>
                    {language === 'hi'
                      ? '• प्रति पौधे नीचे की 3-5 पत्तियों पर छोटे नारंगी-भूरे गोल धब्बों की जांच करें।'
                      : '• Inspect lower 3-5 leaves per plant for tiny orange-brown circular pustules.'}
                  </p>
                  <p>
                    {language === 'hi'
                      ? '• यदि धब्बों को छूने पर उंगली पर नारंगी पाउडर जैसा लगे, तो उस पौधे को तुरंत अलग पहचानें।'
                      : '• If rust spots rub off on your fingers as orange powder, isolate the spot.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleStep(1)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
                completedSteps.includes(1)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>
                {completedSteps.includes(1)
                  ? language === 'hi' ? 'पूर्ण' : 'Completed'
                  : language === 'hi' ? 'पूर्ण चिह्नित करें' : 'Mark Done'}
              </span>
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        <div
          className={`bg-white rounded-3xl p-6 lg:p-7 shadow-sm border transition-all ${
            completedSteps.includes(2)
              ? 'border-emerald-300 bg-[#F7FAF7]'
              : 'border-gray-100 hover:border-emerald-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                  completedSteps.includes(2)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                2
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                  {language === 'hi'
                    ? 'निवारक व पर्यावरण-अनुकूल उपाय (अगले 24 घंटे)'
                    : 'PREVENTIVE & ECO-FRIENDLY MEASURES (NEXT 24 HOURS)'}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {advisory.step2_title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mt-1">
                  {advisory.step2_desc}
                </p>

                {/* Eco-Friendly Solutions Box */}
                <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200/80 mt-3 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center">
                    <Leaf size={14} className="mr-1 text-emerald-600" />
                    {language === 'hi'
                      ? 'अनुशंसित जैविक व पर्यावरण-अनुकूल समाधान'
                      : 'RECOMMENDED ECO-FRIENDLY & BIOLOGICAL SOLUTIONS'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-950 block">
                        {language === 'hi' ? 'नीम बीज अर्क (NSKE 5%)' : 'Neem Seed Extract (NSKE 5%)'}
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        {language === 'hi'
                          ? 'रोग बीजाणुओं के अंकुरण के खिलाफ प्राकृतिक फफूंदनाशक सुरक्षा कवच।'
                          : 'Natural antifungal shield against spore germination.'}
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-950 block">
                        {language === 'hi' ? 'ट्राइकोडर्मा विरिडे जैव-कवकनाशी' : 'Trichoderma viride Bio-fungicide'}
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        {language === 'hi'
                          ? 'रोगजनक रतुआ कवक को नष्ट करने वाला जैविक परजीवी कवक।'
                          : 'Biological parasite of pathogenic rust mycelium.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleStep(2)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
                completedSteps.includes(2)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>
                {completedSteps.includes(2)
                  ? language === 'hi' ? 'पूर्ण' : 'Completed'
                  : language === 'hi' ? 'पूर्ण चिह्नित करें' : 'Mark Done'}
              </span>
            </button>
          </div>
        </div>

        {/* STEP 3 */}
        <div
          className={`bg-white rounded-3xl p-6 lg:p-7 shadow-sm border transition-all ${
            completedSteps.includes(3)
              ? 'border-emerald-300 bg-[#F7FAF7]'
              : 'border-gray-100 hover:border-emerald-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                  completedSteps.includes(3)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                3
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                  {language === 'hi'
                    ? 'अनुवर्ती निगरानी समय-सारणी (दिन 3 और दिन 7)'
                    : 'FOLLOW-UP & SURVEILLANCE SCHEDULE (DAY 3 & DAY 7)'}
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {advisory.step3_title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mt-1">
                  {advisory.step3_desc}
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <p>
                    {language === 'hi'
                      ? '• पत्ती उपचार के 48 घंटे बाद फसल रक्षक ऐप में पुनः जांच करें।'
                      : '• Perform re-scan in FasalRakshak app 48 hours after foliar treatment.'}
                  </p>
                  <p>
                    {language === 'hi'
                      ? '• कृषि विज्ञान केंद्र (KVK) अधिकारियों से रतुआ की स्थिति सत्यापित कराएं।'
                      : '• Verify rust status with Sonipat KVK field officers.'}
                  </p>
                  <p>
                    {language === 'hi'
                      ? '• कोई भी नया लक्षण दिखने पर सामुदायिक निगरानी मानचित्र में दर्ज करें।'
                      : '• Log any newly noticed pustules into Community Intelligence map.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleStep(3)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
                completedSteps.includes(3)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>
                {completedSteps.includes(3)
                  ? language === 'hi' ? 'पूर्ण' : 'Completed'
                  : language === 'hi' ? 'पूर्ण चिह्नित करें' : 'Mark Done'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Safe Handling Precautions */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-xs text-amber-900 space-y-2">
        <h4 className="font-black text-sm text-amber-950 flex items-center">
          <AlertTriangle size={16} className="text-amber-700 mr-2" />
          {language === 'hi' ? 'सुरक्षित छिड़काव एवं सावधानियां' : 'Safe Spraying & Applicator Precautions'}
        </h4>
        <ul className="list-disc list-inside space-y-1 text-amber-800/90 leading-relaxed">
          <li>
            {language === 'hi'
              ? 'हवा के बहाव को रोकने और मधुमक्खियों की रक्षा के लिए हमेशा शांत सुबह (प्रातः 9 बजे से पहले) या देर शाम को ही छिड़काव करें।'
              : 'Always spray during calm early mornings (before 9 AM) or late evenings to minimize wind drift and protect honeybees.'}
          </li>
          <li>
            {language === 'hi'
              ? 'सुरक्षात्मक मास्क, दस्ताने और जूते पहनें। जैविक या रासायनिक घोल का उपयोग करते समय कभी भी भोजन या पेय पदार्थ न लें।'
              : 'Wear protective mask, gloves, and boots. Never eat or drink while handling biological or chemical solutions.'}
          </li>
          <li>
            {language === 'hi'
              ? 'स्प्रेयर नोजल को समान रूप से सेट करें; अत्यधिक बहाव या भूजल में रिसाव से बचें।'
              : 'Calibrate sprayer nozzles uniformly; avoid overlapping swaths or excessive runoff onto ground water.'}
          </li>
        </ul>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => window.print()}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1.5 cursor-pointer"
        >
          <Printer size={15} />
          <span>{language === 'hi' ? 'कार्ययोजना चेकलिस्ट प्रिंट करें' : 'Print Action Plan Checklist'}</span>
        </button>

        <button
          onClick={() => onNavigate('simulator')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1 shadow-md shadow-emerald-200 transition-all cursor-pointer"
        >
          <span>{language === 'hi' ? 'सिम्युलेटर में परीक्षण करें' : 'Test in What-If Simulator'}</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
