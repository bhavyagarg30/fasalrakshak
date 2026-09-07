import React from 'react';
import {
  UserCircle,
  MapPin,
  Phone,
  CreditCard,
  Building,
  Award,
  ShieldCheck,
  Calendar,
  Layers,
  Sprout,
  CheckCircle2,
} from 'lucide-react';
import { FARMER_PROFILE } from '../data/demoData';
import { PageId } from '../types';

interface ProfilePageProps {
  onNavigate: (page: PageId) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Registered Agronomist Account
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-2">
          KISAN PROFILE
        </h2>
        <p className="text-slate-500 text-xs font-medium mt-1">
          Government-linked farmer identity registered under the Digital Agriculture Mission.
        </p>
      </div>

      {/* Main Profile Identity Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-emerald-600 to-green-800 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-emerald-200 shrink-0">
              K
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-black text-slate-900">
                  {FARMER_PROFILE.name}
                </h3>
                <span className="text-sm font-semibold text-slate-400">
                  ({FARMER_PROFILE.localName})
                </span>
                <span className="p-1 bg-emerald-100 text-emerald-800 rounded-full" title="Verified Farmer">
                  <CheckCircle2 size={16} />
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                <MapPin size={13} className="text-emerald-600 mr-1 shrink-0" />
                {FARMER_PROFILE.village}, {FARMER_PROFILE.tehsil}, {FARMER_PROFILE.state}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Kisan ID Number
            </span>
            <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl mt-1">
              {FARMER_PROFILE.kisanId}
            </span>
          </div>
        </div>

        {/* Farm & Institutional Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Total Landholding
            </span>
            <p className="text-lg font-black text-slate-900 mt-1">
              {FARMER_PROFILE.totalLand}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">3 Active Cultivated Plots</p>
          </div>

          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Registered Mobile
            </span>
            <p className="text-lg font-black text-slate-900 mt-1">
              {FARMER_PROFILE.phone}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">SMS & WhatsApp Alerts Enabled</p>
          </div>

          <div className="bg-[#F7FAF7] p-4 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Sentinel Network
            </span>
            <p className="text-lg font-black text-slate-900 mt-1">
              {FARMER_PROFILE.memberSince}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Level 3 Trusted Node</p>
          </div>
        </div>

        {/* Linked KVK Center */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Building size={20} className="text-emerald-700 shrink-0" />
            <div>
              <strong className="text-emerald-950 text-xs block">
                Assigned Extension Center: {FARMER_PROFILE.linkedKvk}
              </strong>
              <p className="text-[11px] text-emerald-800">
                Liaison Officer: Dr. Harpreet Singh • Direct Hotline: 1800-180-1551 (Kisan Call Center)
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('expert')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 transition-colors"
          >
            Audit Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
