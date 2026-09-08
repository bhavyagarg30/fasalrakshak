import React from 'react';
import { LayoutDashboard, Camera, Bell, FileCheck, BookOpen } from 'lucide-react';
import { PageId, Language } from '../types';
import { t, getSavedLanguage } from '../i18n';

interface MobileNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  unreadAlertCount: number;
  language?: Language;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  unreadAlertCount,
  language,
}) => {
  const currentLang = language || getSavedLanguage();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 px-2 py-2 pb-5 flex items-center justify-around shadow-lg">
      {/* Home */}
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentPage === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-home"
      >
        <LayoutDashboard size={19} />
        <span className="text-[10px] mt-1 font-semibold">{t('navDashboard', currentLang)}</span>
      </button>

      {/* Damage Assessment */}
      <button
        onClick={() => onNavigate('damage-assessment')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentPage === 'damage-assessment' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-damage"
      >
        <FileCheck size={19} />
        <span className="text-[10px] mt-1 font-semibold">{t('damageAssessment', currentLang)}</span>
      </button>

      {/* Center Scan Button (Prominent, elevated) */}
      <div className="flex-1 flex justify-center -mt-6">
        <button
          onClick={() => onNavigate('scan')}
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-600/30 border-3 border-white active:scale-95 transition-all cursor-pointer"
          aria-label={t('navScanCrop', currentLang)}
          id="mobile-nav-scan"
        >
          <Camera size={22} />
        </button>
      </div>

      {/* Alerts */}
      <button
        onClick={() => onNavigate('alerts')}
        className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentPage === 'alerts' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-alerts"
      >
        <div className="relative">
          <Bell size={19} />
          {unreadAlertCount > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadAlertCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-1 font-semibold">{t('navAlerts', currentLang)}</span>
      </button>

      {/* Knowledge Hub */}
      <button
        onClick={() => onNavigate('knowledge-hub')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentPage === 'knowledge-hub' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-knowledge"
      >
        <BookOpen size={19} />
        <span className="text-[10px] mt-1 font-semibold">{t('navKnowledgeHub', currentLang)}</span>
      </button>
    </nav>
  );
};

