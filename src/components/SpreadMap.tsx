import React, { useState, useMemo, useEffect } from 'react';
import {
  ShieldAlert,
  Wind,
  Filter,
  Eye,
  Info,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Navigation2,
  MapPin,
} from 'lucide-react';
import { OutbreakCluster } from '../types';
import { OUTBREAK_CLUSTERS } from '../data/demoData';

interface ClusterRiskCardProps {
  cluster: OutbreakCluster;
  onSelect?: (cluster: OutbreakCluster) => void;
  className?: string;
}

export const ClusterRiskCard: React.FC<ClusterRiskCardProps> = ({
  cluster,
  onSelect,
  className = '',
}) => {
  const getStatusColor = (status: OutbreakCluster['status']) => {
    switch (status) {
      case 'Confirmed':
        return { fill: '#DC2626', ring: 'rgba(220, 38, 38, 0.25)' };
      case 'Predicted Spread':
        return { fill: '#EA580C', ring: 'rgba(234, 88, 12, 0.25)' };
      case 'At Risk':
        return { fill: '#EAB308', ring: 'rgba(234, 179, 8, 0.25)' };
      case 'Low Risk':
      default:
        return { fill: '#16A34A', ring: 'rgba(22, 163, 74, 0.25)' };
    }
  };

  return (
    <div
      className={`box-border bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl p-3.5 sm:p-4 md:p-5 shadow-2xl text-white transition-all ${className}`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Header: Status, Crop, Threat, Region, Risk Badge, Reports */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: getStatusColor(cluster.status).fill }}
            />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {cluster.status} • {cluster.crop}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white mt-1 leading-snug break-words">
            {cluster.threatName}
          </h4>
          <p className="text-xs text-emerald-400 font-medium mt-0.5 break-words">
            {cluster.region}
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1.5 shrink-0 pt-0.5 sm:pt-0">
          <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-red-950/90 text-red-400 border border-red-800/80 whitespace-nowrap shadow-xs">
            {cluster.currentRisk.toUpperCase()} RISK
          </span>
          <p className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
            {cluster.reportsCount} Nearby Reports
          </p>
        </div>
      </div>

      {/* 3 Metric Cards: Responsive 1-col on mobile, 3-col on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mt-3.5 pt-3 border-t border-slate-800/80">
        <div className="bg-slate-800/60 border border-slate-700/40 p-2.5 rounded-xl flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Spread Radius
          </span>
          <span className="font-black text-white text-xs sm:text-sm tracking-tight">
            {cluster.predictedSpreadKm} km
          </span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/40 p-2.5 rounded-xl flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Spread Vector
          </span>
          <span className="font-black text-white text-xs sm:text-sm tracking-tight">
            {cluster.windSpeed}
          </span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/40 p-2.5 rounded-xl flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Crop Stage
          </span>
          <span className="font-black text-white text-xs sm:text-sm tracking-tight">
            {cluster.cropStage.split('(')[0].trim()}
          </span>
        </div>
      </div>

      {/* Description & Action Button: Clean wrapping, no overlap */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed break-words flex-1">
          "{cluster.description}"
        </p>
        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(cluster)}
            className="shrink-0 self-start sm:self-center bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>View Details</span>
            <ChevronRight size={14} className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

interface SpreadMapProps {
  onSelectCluster?: (cluster: OutbreakCluster) => void;
  selectedClusterId?: string;
  isCompact?: boolean; // For dashboard mini-map
}

export const SpreadMap: React.FC<SpreadMapProps> = ({
  onSelectCluster,
  selectedClusterId,
  isCompact = false,
}) => {
  // Filter States
  const [cropFilter, setCropFilter] = useState<'All' | 'Wheat' | 'Rice' | 'Maize'>('All');
  const [threatFilter, setThreatFilter] = useState<'All' | 'Disease' | 'Pest'>('All');
  const [riskFilter, setRiskFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('7d');

  // Zoom & Pan state for the GIS viewport
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeCluster, setActiveCluster] = useState<OutbreakCluster>(() => {
    return OUTBREAK_CLUSTERS.find((c) => c.id === selectedClusterId) || OUTBREAK_CLUSTERS[0];
  });

  // Keep active cluster in sync if selectedClusterId changes externally
  useEffect(() => {
    if (selectedClusterId) {
      const match = OUTBREAK_CLUSTERS.find((c) => c.id === selectedClusterId);
      if (match) {
        setActiveCluster(match);
      }
    }
  }, [selectedClusterId]);

  // Filter application
  const filteredClusters = useMemo(() => {
    return OUTBREAK_CLUSTERS.filter((cluster) => {
      if (cropFilter !== 'All' && cluster.crop !== cropFilter) return false;
      if (threatFilter !== 'All' && cluster.threatType !== threatFilter) return false;
      if (riskFilter !== 'All') {
        if (riskFilter === 'High' && (cluster.currentRisk === 'High' || cluster.currentRisk === 'Critical')) return true;
        if (riskFilter === 'Medium' && cluster.currentRisk === 'Medium') return true;
        if (riskFilter === 'Low' && cluster.currentRisk === 'Low') return true;
        return false;
      }
      return true;
    });
  }, [cropFilter, threatFilter, riskFilter, timeFilter]);

  // Coordinate projection mapping for the regional bounding box
  // Lat: 28.3 to 32.0 (South to North)
  // Lng: 74.5 to 78.2 (West to East)
  const projectCoords = (lat: number, lng: number) => {
    const minLat = 28.2;
    const maxLat = 32.2;
    const minLng = 74.5;
    const maxLng = 78.3;

    // Invert lat because SVG Y increases downwards
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  // Farmer's farm in Sonipat
  const farmerPos = projectCoords(28.98, 77.02);

  const getStatusColor = (status: OutbreakCluster['status']) => {
    switch (status) {
      case 'Confirmed':
        return { fill: '#DC2626', ring: 'rgba(220, 38, 38, 0.25)', label: 'Red' };
      case 'Predicted Spread':
        return { fill: '#EA580C', ring: 'rgba(234, 88, 12, 0.25)', label: 'Orange' };
      case 'At Risk':
        return { fill: '#EAB308', ring: 'rgba(234, 179, 8, 0.25)', label: 'Yellow' };
      case 'Low Risk':
      default:
        return { fill: '#16A34A', ring: 'rgba(22, 163, 74, 0.25)', label: 'Green' };
    }
  };

  const handleClusterClick = (cluster: OutbreakCluster) => {
    setActiveCluster(cluster);
    if (!isCompact && onSelectCluster) {
      onSelectCluster(cluster);
    }
  };

  return (
    <div className={`relative flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 text-white shadow-xl w-full ${isCompact ? '' : 'min-h-[580px]'}`}>
      {/* Top Map Header & Filters Bar (Only if not compact) */}
      {!isCompact && (
        <div className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center">
                North India Agro-GIS Corridor (Haryana • Punjab • NCR • West UP)
              </h3>
              <p className="text-[11px] text-slate-400">
                Live Spatial Intelligence from 2,400+ Geotagged Village Sentinel Nodes
              </p>
            </div>
          </div>

          {/* Map Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Crop filter */}
            <div className="flex items-center bg-slate-850 border border-slate-700/80 rounded-xl px-2.5 py-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold mr-1.5">Crop:</span>
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value as any)}
                aria-label="Filter by Crop"
                className="bg-transparent text-slate-200 font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Crops</option>
                <option value="Wheat" className="bg-slate-900">Wheat (गेहूं)</option>
                <option value="Rice" className="bg-slate-900">Rice (धान)</option>
                <option value="Maize" className="bg-slate-900">Maize (मक्का)</option>
              </select>
            </div>

            {/* Threat filter */}
            <div className="flex items-center bg-slate-850 border border-slate-700/80 rounded-xl px-2.5 py-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold mr-1.5">Threat:</span>
              <select
                value={threatFilter}
                onChange={(e) => setThreatFilter(e.target.value as any)}
                aria-label="Filter by Threat type"
                className="bg-transparent text-slate-200 font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Threats</option>
                <option value="Disease" className="bg-slate-900">Disease (Fungal/Bacterial)</option>
                <option value="Pest" className="bg-slate-900">Pest / Insects</option>
              </select>
            </div>

            {/* Risk Level */}
            <div className="flex items-center bg-slate-850 border border-slate-700/80 rounded-xl px-2.5 py-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold mr-1.5">Risk:</span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as any)}
                aria-label="Filter by Risk level"
                className="bg-transparent text-slate-200 font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Levels</option>
                <option value="High" className="bg-slate-900">High & Critical</option>
                <option value="Medium" className="bg-slate-900">Medium</option>
                <option value="Low" className="bg-slate-900">Low</option>
              </select>
            </div>

            {/* Time horizon */}
            <div className="flex items-center bg-slate-850 border border-slate-700/80 rounded-xl p-0.5">
              {(['24h', '7d', '30d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-lg transition-colors ${
                    timeFilter === t
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t === '24h' ? '24h' : t === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive GIS Canvas */}
      <div
        className={`relative w-full overflow-hidden select-none bg-[#0B132B] ${
          isCompact ? 'h-72 sm:h-80' : 'flex-1 min-h-[440px] md:min-h-[500px]'
        }`}
      >
        {/* Background GIS Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, #16A34A 1px, transparent 0),
              linear-gradient(to right, #1E293B 1px, transparent 1px),
              linear-gradient(to bottom, #1E293B 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
          }}
        />

        {/* Regional Boundaries & River Waterways (Yamuna & Sutlej subtle GIS lines) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Subtle River Yamuna Path */}
          <path
            d="M 68 8 Q 70 30 71 50 T 73 80 T 75 95"
            fill="transparent"
            stroke="#1E3A8A"
            strokeWidth="3"
            strokeDasharray="4 4"
            className="opacity-40"
          />
          {/* Wind dispersal vector from Sonipat North towards Farmer */}
          <g opacity="0.6">
            <line
              x1="70"
              y1="40"
              x2="72"
              y2="62"
              stroke="#EA580C"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <polygon points="72,64 70,58 74,58" fill="#EA580C" />
          </g>
        </svg>

        {/* Floating Controls: Zoom in/out & Re-center */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1 rounded-xl shadow-lg">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Legend Box */}
        <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-2xl shadow-xl max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">
              Risk Intensity
            </span>
            <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
              AI MODEL v3.2
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-semibold">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] animate-pulse" />
              <span className="text-slate-200">RED: Confirmed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(234,88,12,0.8)]" />
              <span className="text-slate-200">ORANGE: Spread</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="text-slate-200">YELLOW: At Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-200">GREEN: Low Risk</span>
            </div>
          </div>
        </div>

        {/* Cluster Markers Container with Zoom transformation */}
        <div
          className="absolute inset-0 transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Farmer's Own Farm Marker (Blue Beacon) */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
            style={{ left: `${farmerPos.x}%`, top: `${farmerPos.y}%` }}
          >
            {/* Pulsing beacon waves */}
            <div className="w-12 h-12 -ml-3 -mt-3 rounded-full bg-blue-500/20 animate-ping absolute pointer-events-none" />
            <div className="relative w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
              <MapPin size={12} />
            </div>
            <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 bg-blue-950 text-blue-200 border border-blue-600/80 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
              ★ Your Farm (Murthal, Sonipat)
            </div>
          </div>

          {/* Render Clusters */}
          {filteredClusters.map((cluster) => {
            const pos = projectCoords(cluster.lat, cluster.lng);
            const statusConfig = getStatusColor(cluster.status);
            const isSelected = activeCluster?.id === cluster.id;
            const spreadRadiusPixels = Math.max(28, cluster.predictedSpreadKm * 14);

            return (
              <div
                key={cluster.id}
                onClick={() => handleClusterClick(cluster)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {/* Predicted Spread Zone Halo */}
                <div
                  className="rounded-full absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 border border-dashed"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${spreadRadiusPixels}px`,
                    height: `${spreadRadiusPixels}px`,
                    backgroundColor: statusConfig.ring,
                    borderColor: statusConfig.fill,
                  }}
                />

                {/* Core Cluster Pin */}
                <div
                  className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs text-white shadow-xl transition-transform duration-200 group-hover:scale-125 ${
                    isSelected
                      ? 'border-white scale-125 ring-4 ring-white/30'
                      : 'border-slate-900'
                  }`}
                  style={{ backgroundColor: statusConfig.fill }}
                >
                  {cluster.reportsCount}
                </div>

                {/* Micro Label */}
                <div
                  className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-extrabold whitespace-nowrap shadow-md border ${
                    isSelected
                      ? 'bg-white text-slate-900 border-emerald-500'
                      : 'bg-slate-900/90 text-slate-200 border-slate-700'
                  }`}
                >
                  {cluster.region.split('(')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cluster Overlay (Only for Desktop on Full Map view) */}
        {!isCompact && activeCluster && (
          <div className="hidden lg:block lg:absolute lg:bottom-4 lg:right-4 z-30 w-[min(90vw,560px)] max-w-[560px] max-h-[calc(100%-2rem)] overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ClusterRiskCard cluster={activeCluster} onSelect={onSelectCluster} />
          </div>
        )}
      </div>

      {/* Inline Risk Card: Always for Compact Mode (Dashboard), and on Mobile/Tablet (< lg) for Full Map */}
      {activeCluster && (
        <div className={`p-3.5 sm:p-4 md:p-5 bg-slate-950/70 border-t border-slate-800 ${!isCompact ? 'lg:hidden' : ''}`}>
          <div className="w-full max-w-[560px] mx-auto">
            <ClusterRiskCard cluster={activeCluster} onSelect={onSelectCluster} />
          </div>
        </div>
      )}

      {/* Map Bottom Footer Note */}
      <div className="bg-slate-950 px-4 py-2 text-[10px] text-slate-400 flex flex-wrap items-center justify-between border-t border-slate-800">
        <span>* ILLUSTRATIVE DEMO PREDICTION: Synthetic spatial epidemiological models for Indian agro-climatic zones.</span>
        <span className="text-emerald-400 font-semibold">Verified Krishi Vigyan Kendra Geotagged Mesh</span>
      </div>
    </div>
  );
};
