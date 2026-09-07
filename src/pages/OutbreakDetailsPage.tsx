import React, { useState } from 'react';
import {
  ShieldAlert,
  Wind,
  Droplets,
  Calendar,
  Layers,
  MapPin,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Info,
  Compass,
} from 'lucide-react';
import { OutbreakCluster, PageId } from '../types';

interface OutbreakDetailsPageProps {
  cluster: OutbreakCluster;
  onNavigate: (page: PageId) => void;
  onToggleWatchlist?: (clusterId: string) => void;
  isWatchlisted?: boolean;
}

export const OutbreakDetailsPage: React.FC<OutbreakDetailsPageProps> = ({
  cluster,
  onNavigate,
  onToggleWatchlist,
  isWatchlisted = false,
}) => {
  const [localWatchlisted, setLocalWatchlisted] = useState<boolean>(isWatchlisted);

  const handleWatchlistToggle = () => {
    setLocalWatchlisted(!localWatchlisted);
    if (onToggleWatchlist) {
      onToggleWatchlist(cluster.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('map')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Outbreak Map</span>
        </button>

        <span className="text-xs font-bold text-slate-400">
          Cluster ID: #{cluster.id}
        </span>
      </div>

      {/* Main Cluster Banner Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-red-600">
                {cluster.status} • {cluster.crop}
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mt-1">
              {cluster.threatName} — {cluster.region}
            </h2>
            <p className="text-slate-500 text-xs mt-1 flex items-center">
              <MapPin size={13} className="text-emerald-600 mr-1" />
              GPS Coordinates: {cluster.lat.toFixed(3)}°N, {cluster.lng.toFixed(3)}°E
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                localWatchlisted
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
              id="watchlist-toggle-btn"
            >
              {localWatchlisted ? (
                <>
                  <BookmarkCheck size={16} className="text-emerald-700" />
                  <span>WATCHLISTED</span>
                </>
              ) : (
                <>
                  <Bookmark size={16} />
                  <span>ADD TO MY WATCHLIST</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Six Core Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-6">
          <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Severity
            </span>
            <p className="text-sm font-black text-red-600 mt-0.5">
              {cluster.currentRisk} Risk
            </p>
          </div>

          <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Radius
            </span>
            <p className="text-sm font-black text-slate-900 mt-0.5">
              {cluster.predictedSpreadKm} km
            </p>
          </div>

          <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              First Reported
            </span>
            <p className="text-sm font-black text-slate-900 mt-0.5">
              {cluster.firstReported}
            </p>
          </div>

          <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Validated Cases
            </span>
            <p className="text-sm font-black text-emerald-700 mt-0.5">
              {cluster.reportsCount} Reports
            </p>
          </div>

          <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Spread Vector
            </span>
            <p className="text-sm font-black text-orange-600 mt-0.5">
              {cluster.spreadDirection}
            </p>
          </div>

          <div className="bg-[#F7FAF7] p-3.5 rounded-2xl border border-gray-100">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
              Wind Influence
            </span>
            <p className="text-sm font-black text-slate-900 mt-0.5 truncate">
              {cluster.windSpeed}
            </p>
          </div>
        </div>

        {/* Environmental Microclimate Context */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-3 text-xs text-amber-900">
          <AlertTriangle size={18} className="text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Microclimate Trigger:</strong> High atmospheric humidity (76%) combined with constant East-North-East breezes creates a high-probability spore plume accelerating towards downwind fields in Sonipat & Panipat.
          </p>
        </div>

        {/* ADVISORY SECTION */}
        <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              TARGETED OUTBREAK ADVISORY
            </h3>
            <p className="text-xs text-slate-500">
              Prescribed protocols for farms within the 4.8 km danger buffer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What nearby farmers should do */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center">
                <CheckCircle2 size={16} className="text-emerald-600 mr-2" />
                WHAT NEARBY FARMERS SHOULD DO
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 mt-1.5 shrink-0" />
                  <span>Execute morning leaf walks focusing on lower canopy leaves facing North-East.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 mt-1.5 shrink-0" />
                  <span>Avoid night-time overhead sprinkler irrigation to reduce foliar leaf-wetness duration.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 mt-1.5 shrink-0" />
                  <span>Prepare organic biological shield (Neem oil / Trichoderma harzianum) for early prophylactic spraying.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 mt-1.5 shrink-0" />
                  <span>Notify the local Sonipat Krishi Vigyan Kendra extension officer if you spot orange powder.</span>
                </li>
              </ul>
            </div>

            {/* What crops are in danger */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center">
                <ShieldAlert size={16} className="text-red-600 mr-2" />
                WHAT CROPS ARE IN DANGER?
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center justify-between">
                  <div>
                    <strong className="text-red-900 block">Wheat (गेहूं) - Varieties PBW-343, HD-2967</strong>
                    <span className="text-[11px] text-red-700">Tillering & Booting stages (High foliar susceptibility)</span>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-red-200 text-red-900 px-2 py-0.5 rounded">
                    CRITICAL
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                  <div>
                    <strong className="text-amber-900 block">Barley (जौ) - Border fodder plots</strong>
                    <span className="text-[11px] text-amber-700">Secondary host for cereal rust pathogens</span>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    MODERATE
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mt-2">
                  * Mustards and Legumes in adjacent fields remain unaffected by rust spores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button to Action Plan */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            FasalRakshak Sentinel Cluster • Updated hourly via KVK telemetry
          </p>
          <button
            onClick={() => onNavigate('action')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center shadow-md shadow-emerald-200 transition-all cursor-pointer"
          >
            <span>Activate 3-Step Action Plan</span>
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
