import React, { useState } from 'react';
import {
  Users,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Send,
  X,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import { PageId } from '../types';

interface CommunityReport {
  id: string;
  crop: string;
  threat: string;
  location: string;
  distanceKm: number;
  timeAgo: string;
  status: 'Verified' | 'Under Review' | 'Unverified';
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  farmerName: string; // Anonymous tag e.g. "Farmer from Murthal"
}

const INITIAL_REPORTS: CommunityReport[] = [
  {
    id: 'rep-1',
    crop: 'Wheat (गेहूं)',
    threat: 'Brown Rust (Puccinia triticina)',
    location: 'Murthal North, Sonipat',
    distanceKm: 2.1,
    timeAgo: '2 hours ago',
    status: 'Verified',
    severity: 'High',
    description: 'Noticed bright orange powder on lower flag leaves in a 2-acre plot. Verified by KVK staff.',
    farmerName: 'Kisan R.S. (Anonymous)',
  },
  {
    id: 'rep-2',
    crop: 'Wheat (गेहूं)',
    threat: 'Yellow Rust suspect',
    location: 'Ganaur, Sonipat',
    distanceKm: 4.8,
    timeAgo: '5 hours ago',
    status: 'Under Review',
    severity: 'Medium',
    description: 'Stripe-like yellow streaks seen on leaves. Sample submitted for lab microscopic test.',
    farmerName: 'Kisan V.P. (Anonymous)',
  },
  {
    id: 'rep-3',
    crop: 'Maize (मक्का)',
    threat: 'Fall Armyworm (Spodoptera frugiperda)',
    location: 'Rai Industrial Belt, Sonipat',
    distanceKm: 7.2,
    timeAgo: '1 day ago',
    status: 'Verified',
    severity: 'High',
    description: 'Pin-hole shot holes in whorls of young vegetative corn plants.',
    farmerName: 'Kisan S.K. (Anonymous)',
  },
  {
    id: 'rep-4',
    crop: 'Mustard (सरसों)',
    threat: 'White Rust (Albugo candida)',
    location: 'Kundli, Haryana Border',
    distanceKm: 9.5,
    timeAgo: '2 days ago',
    status: 'Verified',
    severity: 'Low',
    description: 'White creamy pustules on the lower leaf surface, minor isolated spot.',
    farmerName: 'Kisan H.C. (Anonymous)',
  },
];

interface CommunityPageProps {
  onNavigate: (page: PageId) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [reports, setReports] = useState<CommunityReport[]>(INITIAL_REPORTS);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<'All' | 'Verified' | 'Under Review'>('All');

  // Form states
  const [crop, setCrop] = useState('Wheat');
  const [threat, setThreat] = useState('Wheat Rust');
  const [location, setLocation] = useState('Murthal, Sonipat');
  const [severity, setSeverity] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [description, setDescription] = useState('');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: CommunityReport = {
      id: `rep-${Date.now()}`,
      crop,
      threat,
      location,
      distanceKm: 1.8,
      timeAgo: 'Just now',
      status: 'Under Review',
      severity,
      description: description || 'Visual foliar discoloration noticed during morning inspection.',
      farmerName: 'You (Anonymous Kisan)',
    };
    setReports([newReport, ...reports]);
    setShowReportModal(false);
    setDescription('');
  };

  const filteredReports = reports.filter((r) => {
    if (filter === 'All') return true;
    return r.status === filter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Farmer-to-Farmer Sentinel Mesh
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            COMMUNITY INTELLIGENCE
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Anonymous, geotagged outbreak reports from 2,400+ local farmers across Haryana & Western UP.
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center space-x-2 shadow-md shadow-emerald-200 transition-all cursor-pointer"
          id="report-case-btn"
        >
          <Plus size={16} />
          <span>REPORT A NEW CASE</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-gray-200 w-fit">
        {(['All', 'Verified', 'Under Review'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              filter === tab
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab === 'All' ? 'All Reports' : tab === 'Verified' ? 'Verified (KVK Checked)' : 'Under Review'}
          </button>
        ))}
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row items-start justify-between gap-4"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                  {report.crop}
                </span>

                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                    report.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {report.status === 'Verified' ? (
                    <>
                      <ShieldCheck size={12} className="mr-1 text-emerald-600" />
                      <span>KVK Verified</span>
                    </>
                  ) : (
                    <>
                      <Clock size={12} className="mr-1 text-amber-600" />
                      <span>Under Review</span>
                    </>
                  )}
                </span>

                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    report.severity === 'High'
                      ? 'bg-red-100 text-red-700'
                      : report.severity === 'Medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {report.severity} Severity
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">
                {report.threat}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                "{report.description}"
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
                <span className="flex items-center text-slate-600">
                  <MapPin size={12} className="text-emerald-600 mr-1" />
                  {report.location} ({report.distanceKm} km from you)
                </span>
                <span>•</span>
                <span>{report.timeAgo}</span>
                <span>•</span>
                <span>Reported by {report.farmerName}</span>
              </div>
            </div>

            <div className="shrink-0 self-end md:self-center">
              <button
                onClick={() => onNavigate('map')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                Locate on GIS Map →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Submit Geotagged Field Report
                </h3>
                <p className="text-xs text-slate-400">
                  Your identity is kept completely private and anonymous.
                </p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Crop</label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium bg-white"
                  >
                    <option value="Wheat">Wheat (गेहूं)</option>
                    <option value="Rice">Rice (धान)</option>
                    <option value="Maize">Maize (मक्का)</option>
                    <option value="Mustard">Mustard (सरसों)</option>
                    <option value="Sugarcane">Sugarcane (गन्ना)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Suspected Threat</label>
                  <input
                    type="text"
                    value={threat}
                    onChange={(e) => setThreat(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                    placeholder="e.g. Yellow Rust / Armyworm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Village / Tehsil</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                    placeholder="e.g. Murthal, Sonipat"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium bg-white"
                  >
                    <option value="Low">Low (Initial spots)</option>
                    <option value="Medium">Medium (Scattered patches)</option>
                    <option value="High">High (Rapidly spreading)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Symptoms Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                  placeholder="Describe leaf colors, powder texture, or feeding holes..."
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-md shadow-emerald-200 flex items-center space-x-1.5"
                >
                  <Send size={14} />
                  <span>Submit Anonymous Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
