import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Info,
  MapPin,
  ClipboardList,
} from 'lucide-react';
import { DiagnosisResult, PageId, Language } from '../types';
import { getSavedLanguage } from '../i18n';

interface DiagnosisPageProps {
  diagnosis: DiagnosisResult;
  language?: Language;
  onNavigate: (page: PageId) => void;
}

export const DiagnosisPage: React.FC<DiagnosisPageProps> = ({
  diagnosis,
  language = getSavedLanguage(),
  onNavigate,
}) => {
  const getSeverityHindi = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'early':
        return 'प्रारंभिक';
      case 'moderate':
        return 'मध्यम';
      case 'severe':
      case 'high':
        return 'गंभीर';
      default:
        return sev;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'hi' ? `निदान परिणाम • ${diagnosis.crop}` : `Diagnosis Result • ${diagnosis.crop}`}
          </span>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mt-0.5">
            {diagnosis.diseaseOrPest}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-black px-3 py-1 rounded-full uppercase">
            {language === 'hi' ? `तीव्रता: ${getSeverityHindi(diagnosis.severity)}` : `Severity: ${diagnosis.severity}`}
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black px-3 py-1 rounded-full">
            {diagnosis.confidence}% {language === 'hi' ? 'AI सटीकता' : 'AI Confidence'}
          </span>
        </div>
      </div>

      {/* Main Diagnostic Summary Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Diagnostic Key Numbers */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  {language === 'hi' ? 'पहचाना गया रोग' : 'Diagnosis'}
                </span>
                <p className="text-base font-black text-slate-900 mt-1 truncate">
                  {diagnosis.diseaseOrPest}
                </p>
              </div>

              <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  {language === 'hi' ? 'AI सटीकता' : 'AI Confidence'}
                </span>
                <p className="text-xl font-black text-emerald-600 mt-1">
                  {diagnosis.confidence}%
                </p>
              </div>

              <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  {language === 'hi' ? 'प्रभावित क्षेत्र' : 'Affected Area'}
                </span>
                <p className="text-xl font-black text-amber-600 mt-1">
                  {diagnosis.affectedAreaPct}%
                </p>
              </div>
            </div>

            {/* WHAT THE AI FOUND */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center">
                <Sparkles size={15} className="text-emerald-600 mr-2" />
                {language === 'hi' ? 'AI द्वारा पाए गए लक्षण' : 'WHAT THE AI FOUND'}
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {diagnosis.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2.5 mt-1.5 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Leaf Visual / Scan Preview */}
          <div className="md:col-span-1">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group bg-slate-950">
              <img
                src={
                  diagnosis.leafImageUrl ||
                  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
                }
                alt="Analyzed Leaf"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-xs text-white p-2 rounded-xl text-[10px] font-bold flex justify-between items-center">
                <span>{language === 'hi' ? 'पत्ती रोग मानचित्र' : 'Foliar Lesion Map'}</span>
                <span className="text-emerald-400">{language === 'hi' ? 'धब्बे चिह्नित' : 'Pustules Marked'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------
            WHAT SHOULD YOU DO? (Step by Step Action Timeline)
            -------------------------------------------------- */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center">
              <ClipboardList size={18} className="text-emerald-600 mr-2" />
              {language === 'hi' ? 'आपको क्या करना चाहिए?' : 'WHAT SHOULD YOU DO?'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {language === 'hi' ? 'प्रारंभिक रोकथाम नियम' : 'Early Intervention Protocol'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Today */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                  {language === 'hi' ? 'आज ही' : 'TODAY'}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                {diagnosis.immediateActions.today}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'खेत में W-पैटर्न में निचले पत्तों की जांच करें ताकि फैलाव की सीमा तय हो सके।'
                  : 'Check lower leaf canopies in a W-pattern across the field to establish containment boundaries.'}
              </p>
            </div>

            {/* Next 48 Hours */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
                  {language === 'hi' ? 'अगले 48 घंटे' : 'NEXT 48 HOURS'}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                {diagnosis.immediateActions.next48Hours}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'शाम की भारी सिंचाई रोकें। प्रकोप मानचित्र पर हवा की दिशा और गति पर नजर रखें।'
                  : 'Pause evening flood irrigation. Track wind speed direction updates on the Outbreak Map.'}
              </p>
            </div>

            {/* Next 7 Days */}
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-black uppercase text-blue-800 tracking-wider">
                  {language === 'hi' ? 'अगले 7 दिन' : 'NEXT 7 DAYS'}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                {diagnosis.immediateActions.next7Days}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'प्रभावित पत्तों की पुनः तस्वीर अपलोड करें ताकि पुष्टि हो सके कि रोग का फैलाव रुक गया है।'
                  : 'Submit updated foliar photos to track if pustule spreading has been effectively suppressed.'}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons & Verification Request */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('expert')}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            id="req-expert-btn"
          >
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>{language === 'hi' ? 'कृषि वैज्ञानिक से पुष्टि का अनुरोध करें' : 'REQUEST EXPERT VERIFICATION'}</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('action')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-200 cursor-pointer"
            >
              <span>{language === 'hi' ? 'पूरी कार्ययोजना देखें' : 'View Full Action Plan'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Strict Agronomic Safety Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start space-x-3">
        <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{language === 'hi' ? 'सुरक्षित कृषि मानक:' : 'Safe Farming Standard:'}</strong>{' '}
          {language === 'hi'
            ? 'फसलरक्षक प्रमाणित केवीके (KVK) कृषि वैज्ञानिकों के सत्यापन के बिना अनधिकृत रासायनिक कीटनाशकों की सिफारिश की सख्त मनाही करता है। हमेशा पौधों की उचित दूरी, हवा संचार और अधिकृत जैविक उपचारों को प्राथमिकता दें।'
            : 'FasalRakshak strictly prohibits prescribing speculative chemical pesticide dosages without certified KVK agronomist verification. Always prioritize cultural spacing, canopy aeration, and authorized biological controls.'}
        </p>
      </div>
    </div>
  );
};
