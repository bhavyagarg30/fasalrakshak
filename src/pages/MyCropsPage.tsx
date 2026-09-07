import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  X,
} from 'lucide-react';
import { CropInfo, PageId } from '../types';

interface MyCropsPageProps {
  crops: CropInfo[];
  onSelectCrop: (crop: CropInfo) => void;
  onAddCrop: (crop: CropInfo) => void;
}

export const MyCropsPage: React.FC<MyCropsPageProps> = ({
  crops,
  onSelectCrop,
  onAddCrop,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('Mustard (सरसों)');
  const [localName, setLocalName] = useState<string>('Sarson (सरसों)');
  const [variety, setVariety] = useState<string>('Pusa Bold');
  const [area, setArea] = useState<string>('1.5 Acres');
  const [sowingDate, setSowingDate] = useState<string>('Oct 20, 2024');
  const [growthStage, setGrowthStage] = useState<string>('Pod Formation (फलियां बनना)');
  const [soilType, setSoilType] = useState<string>('Sandy Loam (बलुई दोमट)');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCrop: CropInfo = {
      id: `crop-${Date.now()}`,
      name,
      localName,
      variety,
      area,
      sowingDate,
      growthStage,
      healthScore: 84,
      diseaseRisk: 'Low',
      pestRisk: 'Low',
      lastScan: 'Just registered',
      soilType,
      scansHistory: [
        {
          id: `scan-${Date.now()}`,
          date: 'Today',
          image:
            'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
          diagnosis: 'Healthy foliage baseline',
          severity: 'None',
        },
      ],
    };
    onAddCrop(newCrop);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Farm Plots & Acreage
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            MY REGISTERED CROPS
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Track individual plot telemetry, sowing timeline & dedicated epidemic defenses.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center space-x-2 shadow-md shadow-emerald-200 transition-all cursor-pointer"
          id="add-crop-btn"
        >
          <Plus size={16} />
          <span>ADD NEW CROP</span>
        </button>
      </div>

      {/* Crops List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => onSelectCrop(crop)}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    {crop.variety} • {crop.area}
                  </p>
                </div>

                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    crop.diseaseRisk === 'High'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : crop.diseaseRisk === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {crop.diseaseRisk} Risk
                </span>
              </div>

              {/* Health Score Pill */}
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Plot Health Index</span>
                  <span className="text-slate-900 font-black">{crop.healthScore}/100</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      crop.healthScore > 80
                        ? 'bg-emerald-500'
                        : crop.healthScore > 70
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${crop.healthScore}%` }}
                  />
                </div>
              </div>

              {/* Metadata details */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Growth Stage:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[150px]">
                    {crop.growthStage.split('(')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sowing Date:</span>
                  <span className="font-bold text-slate-800">{crop.sowingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Soil Type:</span>
                  <span className="font-bold text-slate-800">{crop.soilType.split('(')[0]}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Last Scan: {crop.lastScan}</span>
              <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform flex items-center">
                Details <ChevronRight size={14} className="ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Crop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-black text-slate-900">
                Register New Farm Crop
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Crop Type & Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                  placeholder="e.g. Mustard (सरसों)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Variety</label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                    placeholder="e.g. Pusa Bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Area / Acreage</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                    placeholder="e.g. 1.5 Acres"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Sowing Date</label>
                  <input
                    type="text"
                    value={sowingDate}
                    onChange={(e) => setSowingDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                    placeholder="e.g. Nov 15, 2024"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Growth Stage</label>
                  <select
                    value={growthStage}
                    onChange={(e) => setGrowthStage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium bg-white"
                  >
                    <option value="Seedling (अंकुरण)">Seedling (अंकुरण)</option>
                    <option value="Tillering (कल्ले फूटना)">Tillering (कल्ले फूटना)</option>
                    <option value="Booting / Vegetative (वानस्पतिक)">Booting / Vegetative</option>
                    <option value="Flowering / Tasseling (फूल आना)">Flowering (फूल आना)</option>
                    <option value="Grain Filling / Pod (दाना भरना)">Grain Filling (दाना भरना)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Soil Type</label>
                <input
                  type="text"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-emerald-500 font-medium"
                  placeholder="e.g. Alluvial Loam (जलोढ़ दोमट)"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-md shadow-emerald-200"
                >
                  Save Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
