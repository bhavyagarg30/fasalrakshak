import React from 'react';
import {
  LayoutDashboard,
  Camera,
  LineChart,
  Map as MapIcon,
  Bell,
  Sprout,
  ClipboardCheck,
  Users,
  PlayCircle,
  ShieldCheck,
  UserCircle,
  Settings,
  X,
  Sparkles,
  Layers,
} from 'lucide-react';
import { PageId } from '../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  unreadAlertCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  unreadAlertCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const primaryNavItems: { id: PageId; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
    { id: 'scan', label: 'Scan Crop', icon: Camera },
    { id: 'risk', label: 'Risk Intelligence', icon: LineChart },
    { id: 'map', label: 'Outbreak Map', icon: MapIcon },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertCount },
    { id: 'crops', label: 'My Crops', icon: Sprout },
    { id: 'action', label: 'Action Plan', icon: ClipboardCheck },
    { id: 'community', label: 'Community Intelligence', icon: Users },
  ];

  const advancedFeatures: { id: PageId; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; tag?: string }[] = [
    { id: 'simulator', label: 'What-If Simulator', icon: PlayCircle, tag: 'SIM' },
    { id: 'expert', label: 'Expert Verification', icon: ShieldCheck, tag: 'KVK' },
  ];

  const handleSelect = (id: PageId) => {
    onNavigate(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-3 py-2 mb-6">
          <div
            onClick={() => handleSelect('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <Sprout size={22} className="group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-xl tracking-tight text-emerald-800">
                  FasalRakshak
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700/80">
                AI Crop Protection
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tagline Pill */}
        <div className="mx-2 mb-5 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900 leading-snug font-medium flex items-center space-x-2">
          <Sparkles size={14} className="text-emerald-600 shrink-0" />
          <span>“Detect Today. Predict Tomorrow. Protect Before It Spreads.”</span>
        </div>

        {/* Main Navigation */}
        <div className="space-y-1 px-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Core Monitoring
          </p>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                id={`sidebar-nav-${item.id}`}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200/60 font-bold'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && typeof item.badge === 'number' && item.badge > 0 ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white text-emerald-700' : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Predictive Tools</span>
              <Layers size={11} className="text-slate-400" />
            </p>
            {advancedFeatures.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  id={`sidebar-nav-${item.id}`}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200/60 font-bold'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
                    <span>{item.label}</span>
                  </div>
                  {item.tag && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile and Settings */}
      <div className="pt-4 border-t border-slate-100 px-1 space-y-1">
        <button
          onClick={() => handleSelect('profile')}
          id="sidebar-nav-profile"
          className={`flex items-center space-x-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            currentPage === 'profile'
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          <UserCircle size={18} />
          <span>Profile</span>
        </button>

        <button
          onClick={() => handleSelect('settings')}
          id="sidebar-nav-settings"
          className={`flex items-center space-x-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            currentPage === 'settings'
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:flex flex-col w-68 bg-white border-r border-gray-200/80 p-5 sticky top-0 h-screen overflow-y-auto shrink-0 z-40">
        {navContent}
      </aside>

      {/* Mobile Drawer (When Open) */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white p-5 h-full overflow-y-auto z-10 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
