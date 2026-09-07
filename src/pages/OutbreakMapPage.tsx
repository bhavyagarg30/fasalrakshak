import React, { useState } from 'react';
import {
  Map as MapIcon,
  ShieldAlert,
  Wind,
  Layers,
  Info,
  ChevronRight,
  Filter,
  Eye,
  Crosshair,
  Compass,
} from 'lucide-react';
import { SpreadMap } from '../components/SpreadMap';
import { OutbreakCluster, PageId } from '../types';
import { OUTBREAK_CLUSTERS } from '../data/demoData';

interface OutbreakMapPageProps {
  onSelectCluster: (cluster: OutbreakCluster) => void;
  onNavigate: (page: PageId) => void;
}

export const OutbreakMapPage: React.FC<OutbreakMapPageProps> = ({
  onSelectCluster,
  onNavigate,
}) => {
  const [selectedCluster, setSelectedCluster] = useState<OutbreakCluster>(OUTBREAK_CLUSTERS[0]);

  const handleSelect = (cluster: OutbreakCluster) => {
    setSelectedCluster(cluster);
    onSelectCluster(cluster);
  };

  const handleGoToDetails = (cluster: OutbreakCluster) => {
    onSelectCluster(cluster);
    onNavigate('outbreak-details');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Page Title & Summary Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              GIS Spatial Early-Warning
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Live Feed</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            REGIONAL OUTBREAK GIS INTELLIGENCE
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Visualizing pathogen propagation corridors across Haryana, Punjab, Delhi NCR & Western Uttar Pradesh.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleGoToDetails(selectedCluster)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center shadow-md shadow-emerald-200 transition-all cursor-pointer"
          >
            <span>View Selected Outbreak Details</span>
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Main Interactive Map Component */}
      <div className="w-full">
        <SpreadMap
          isCompact={false}
          onSelectCluster={handleSelect}
          selectedClusterId={selectedCluster.id}
        />
      </div>

      {/* Active Cluster Grid List (Quick Switcher) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">
            Active Regional Clusters ({OUTBREAK_CLUSTERS.length} Sentinel Hotspots)
          </h3>
          <span className="text-xs text-slate-500">
            Click any row to inspect outbreak parameters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OUTBREAK_CLUSTERS.map((c) => {
            const isSelected = selectedCluster.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => handleSelect(c)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-gray-100 hover:border-gray-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      {c.region.split('(')[0]}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-0.5">
                      {c.threatName}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      c.status === 'Confirmed'
                        ? 'bg-red-100 text-red-700'
                        : c.status === 'Predicted Spread'
                        ? 'bg-orange-100 text-orange-700'
                        : c.status === 'At Risk'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1 text-[11px] text-slate-500 bg-[#F7FAF7] p-2 rounded-xl">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase">Crop</span>
                    <strong className="text-slate-800">{c.crop}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase">Radius</span>
                    <strong className="text-slate-800">{c.predictedSpreadKm} km</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase">Cases</span>
                    <strong className="text-slate-800">{c.reportsCount}</strong>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[10px]">
                    Risk: <strong className="text-slate-700">{c.currentRisk}</strong>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGoToDetails(c);
                    }}
                    className="text-emerald-700 font-bold text-xs hover:text-emerald-800 flex items-center"
                  >
                    Inspect <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
