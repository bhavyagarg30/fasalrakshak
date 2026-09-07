import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Printer,
  Share2,
  Phone,
  Mail,
  Building,
  FileText,
  Sparkles,
  Download,
} from 'lucide-react';
import { PageId } from '../types';

interface ExpertVerificationPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExpertVerificationPage: React.FC<ExpertVerificationPageProps> = ({
  onNavigate,
}) => {
  const [activeStatus, setActiveStatus] = useState<'Verified' | 'Under Review' | 'Pending'>('Verified');
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'FasalRakshak KVK Expert Verification Certificate',
          text: 'Verified field report for Wheat Brown Rust from Krishi Vigyan Kendra, Sonipat.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Institutional Validation
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            EXPERT VERIFICATION & KVK AUDIT
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Official diagnosis certificates issued by Indian Council of Agricultural Research (ICAR) network.
          </p>
        </div>

        {/* Verification Status Switcher (For interactive testing) */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-2xl border border-gray-200 shadow-2xs">
          {(['Verified', 'Under Review', 'Pending'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeStatus === s
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Official Certificate Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-200/90 relative overflow-hidden">
        {/* Subtle watermark stamp background */}
        <div className="absolute right-6 top-8 opacity-5 pointer-events-none select-none text-right">
          <Award size={240} className="text-slate-900" />
        </div>

        {/* Top Header of Certificate */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
              <Building size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                Krishi Vigyan Kendra (KVK), Sonipat
              </h3>
              <p className="text-xs text-slate-500">
                ICAR Affiliated Agro-Diagnostic Station • Haryana Agricultural University
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-center">
            {activeStatus === 'Verified' ? (
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>OFFICIALLY VERIFIED</span>
              </span>
            ) : activeStatus === 'Under Review' ? (
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-black uppercase tracking-wider">
                <Clock size={14} className="text-amber-700" />
                <span>UNDER REVIEW BY KVK</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 text-xs font-black uppercase tracking-wider">
                <Clock size={14} />
                <span>PENDING QUEUE</span>
              </span>
            )}
          </div>
        </div>

        {/* Certificate Body */}
        <div className="my-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                Certificate Ref
              </span>
              <p className="font-mono font-bold text-slate-900 mt-0.5">KVK-SNP-2025-0842</p>
            </div>
            <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                Target Plot
              </span>
              <p className="font-bold text-slate-900 mt-0.5">Wheat (Plot B, Murthal)</p>
            </div>
            <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                Diagnosis
              </span>
              <p className="font-bold text-red-600 mt-0.5">Brown Rust (Early)</p>
            </div>
            <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                Verification Date
              </span>
              <p className="font-bold text-slate-900 mt-0.5">Today, 09:30 AM</p>
            </div>
          </div>

          {/* Assigned Agronomist Info */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Assigned KVK Senior Agronomist
                </span>
                <h4 className="text-base font-black text-slate-900 mt-0.5">
                  Dr. Harpreet Singh, Ph.D. (Plant Pathology)
                </h4>
                <p className="text-xs text-slate-500">
                  Head, Cereal Disease Surveillance Unit • Krishi Vigyan Kendra Sonipat
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                  <Phone size={12} className="mr-1 text-emerald-600" />
                  +91 130 221-KVK
                </span>
              </div>
            </div>

            {/* Expert Notes */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
              <strong className="text-slate-900 block mb-1">Expert Remarks & Field Findings:</strong>
              “Early foliar symptoms are fully consistent with Puccinia triticina (Brown/Leaf Rust). Microscopic sample validation confirmed urediniospores active on flag-leaf margins. Recommended immediate bio-fungicide preventive spray (Trichoderma / NSKE 5%) before incoming rainfall front. Chemical fungicides are strictly unwarranted at this early threshold.”
            </div>
          </div>

          {/* Official Stamp & Sign */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-full border-4 border-double border-emerald-700 flex flex-col items-center justify-center text-[9px] font-black text-emerald-800 leading-tight text-center uppercase rotate-[-8deg] shadow-xs">
                <span>ICAR-KVK</span>
                <span className="text-[11px] font-black">SONIPAT</span>
                <span className="text-[8px] text-emerald-600">AUDITED</span>
              </div>
              <div className="text-xs">
                <p className="font-black text-slate-800">Digitally Cryptographically Signed</p>
                <p className="text-slate-400 text-[11px]">Valid across Central & State Crop Insurance claims</p>
              </div>
            </div>

            {/* Print & Share actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-gray-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Printer size={15} />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={handleShare}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-200 cursor-pointer"
              >
                <Share2 size={15} />
                <span>Share / WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl animate-in fade-in">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};
