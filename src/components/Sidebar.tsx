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
  FileCheck,
  BookOpen,
} from 'lucide-react';
import { Language, PageId } from '../types';
import { t } from '../i18n';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  unreadAlertCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  language,
  unreadAlertCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const primaryNavItems: {
    id: PageId;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: number | string;
    highlight?: boolean;
  }[] = [
    { id: 'dashboard', label: t('navDashboard', language), icon: LayoutDashboard },
    {
      id: 'damage-assessment',
      label: t('navAnalyzeDamage', language),
      icon: FileCheck,
      highlight: true,
      badge: t('badgeNew', language),
    },
    { id: 'scan', label: t('navScanCrop', language), icon: Camera },
    { id: 'risk', label: t('navRiskIntelligence', language), icon: LineChart },
    { id: 'map', label: t('navOutbreakMap', language), icon: MapIcon },
    { id: 'alerts', label: t('navAlerts', language), icon: Bell, badge: unreadAlertCount },
    { id: 'crops', label: t('navMyCrops', language), icon: Sprout },
    { id: 'action', label: t('navActionPlan', language), icon: ClipboardCheck },
    { id: 'community', label: t('navCommunity', language), icon: Users },
    { id: 'knowledge-hub', label: t('navKnowledgeHub', language), icon: BookOpen },
  ];

  const advancedFeatures: {
    id: PageId;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    tag?: string;
  }[] = [
    { id: 'simulator', label: t('navSimulator', language), icon: PlayCircle, tag: t('badgeSim', language) },
    { id: 'expert', label: t('navExpert', language), icon: ShieldCheck, tag: t('badgeKvk', language) },
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
                  {t('appName', language)}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700/80">
                {language === 'hi' ? 'AI फसल सुरक्षा' : 'AI Crop Protection'}
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tagline Pill */}
        <div className="mx-2 mb-5 px-3 py-2 rounded-xl bg-emerald-50/80 border border-emerald-100 text-[11px] text-emerald-950 leading-snug font-bold flex items-center space-x-2">
          <Sparkles size={14} className="text-emerald-600 shrink-0" />
          <span>{t('tagline', language)}</span>
        </div>

        {/* Main Navigation */}
        <div className="space-y-1 px-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            {language === 'hi' ? 'मुख्य सेवाएं' : 'Core Monitoring'}
          </p>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                id={`sidebar-nav-${item.id}`}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200/60 font-black'
                    : item.highlight
                    ? 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70 font-bold border border-emerald-200/60'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? 'text-white'
                        : item.highlight
                        ? 'text-emerald-700'
                        : 'text-slate-500'
                    }
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive
                        ? 'bg-white text-emerald-700'
                        : item.highlight
                        ? 'bg-emerald-600 text-white'
                        : 'bg-red-500 text-white'
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
              <span>{language === 'hi' ? 'पूर्वानुमान साधन' : 'Predictive Tools'}</span>
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
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
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
          className={`flex items-center space-x-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            currentPage === 'profile'
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          <UserCircle size={18} />
          <span>{t('navProfile', language)}</span>
        </button>

        <button
          onClick={() => handleSelect('settings')}
          id="sidebar-nav-settings"
          className={`flex items-center space-x-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            currentPage === 'settings'
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          <Settings size={18} />
          <span>{t('navSettings', language)}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200/80 p-5 sticky top-0 h-screen overflow-y-auto shrink-0 z-40">
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

