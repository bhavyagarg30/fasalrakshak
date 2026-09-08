import React from 'react';
import {
  MapPin,
  ThermometerSun,
  Droplets,
  CloudRain,
  Wind,
  Bell,
  Languages,
  ShieldCheck,
  Menu,
  BookOpen,
  FileCheck,
} from 'lucide-react';
import { LIVE_WEATHER, FARMER_PROFILE } from '../data/demoData';
import { Language, PageId } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../i18n';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  unreadAlertCount: number;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  unreadAlertCount,
  onToggleMobileMenu,
}) => {
  const getGreeting = () => {
    switch (language) {
      case 'hi':
        return 'सुप्रभात, सुरेश कुमार';
      case 'pa':
        return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਸੁਰੇਸ਼ ਕੁਮਾਰ';
      case 'bn':
        return 'শুভ সকাল, সুরেশ কুমার';
      case 'mr':
        return 'शुभ सकाळ, सुरेश कुमार';
      case 'gu':
        return 'સુપ્રભાત, સુરેશ કુમાર';
      case 'ta':
        return 'காலை வணக்கம், சுரேஷ் குமார்';
      case 'te':
        return 'శుభోదయం, సురేష్ కుమార్';
      case 'kn':
        return 'ಶುಭೋದಯ, ಸುರೇಶ್ ಕುಮಾರ್';
      case 'ml':
        return 'സുപ്രഭാതം, സുരേഷ് കുമാർ';
      case 'or':
        return 'ଶୁଭ ସକାଳ, ସୁରେଶ କୁମାର';
      default:
        return 'Good morning, Suresh Kumar';
    }
  };

  const displayLocation = language === 'hi' ? 'सोनीपत, हरियाणा' : `${FARMER_PROFILE.tehsil}, ${FARMER_PROFILE.state}`;
  const displayLand = language === 'hi' ? '5.0 एकड़ पंजीकृत' : `${FARMER_PROFILE.totalLand} Registered`;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-4 lg:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Mobile menu toggle + Farmer Greeting & Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
              id="mobile-menu-btn"
            >
              <Menu size={22} />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl lg:text-2xl font-black tracking-tight text-slate-800 font-sans">
                  {getGreeting()}
                </h1>
                <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {t('kisanId', language)}: {FARMER_PROFILE.kisanId.split('-')[3]}
                </span>
                <span className="inline-flex items-center text-[10px] font-black tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  {t('demoDataBadge', language)}
                </span>
              </div>
              <div className="flex items-center text-xs font-medium text-slate-500 mt-0.5 space-x-3">
                <span className="flex items-center text-slate-600">
                  <MapPin size={13} className="text-emerald-600 mr-1 shrink-0" />
                  {displayLocation}
                </span>
                <span className="hidden sm:inline-block text-slate-300">•</span>
                <span className="hidden sm:inline-block text-slate-500">
                  {displayLand}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile alert & quick actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => onNavigate('damage-assessment')}
              className="p-2 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
              aria-label="Analyze Crop Damage"
              title="Damage Assessment"
            >
              <FileCheck size={20} />
            </button>

            <button
              onClick={() => onNavigate('alerts')}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="View alerts"
              id="mobile-alert-btn"
            >
              <Bell size={20} />
              {unreadAlertCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {unreadAlertCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Right: Weather Bar, Language & Controls */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          {/* Weather Widget */}
          <div className="flex items-center bg-[#F7FAF7] border border-gray-200/80 rounded-2xl px-3 py-1.5 space-x-3.5 text-slate-700 shadow-2xs">
            <div className="flex items-center space-x-1.5 pr-3 border-r border-gray-200">
              <ThermometerSun size={17} className="text-amber-500 shrink-0" />
              <div>
                <p className="text-[9px] text-gray-400 font-bold leading-none uppercase">{t('tempLabel', language)}</p>
                <p className="text-xs lg:text-sm font-black leading-tight">{LIVE_WEATHER.temperature}°C</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 pr-3 border-r border-gray-200">
              <Droplets size={17} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-[9px] text-gray-400 font-bold leading-none uppercase">{t('humidityLabel', language)}</p>
                <p className="text-xs lg:text-sm font-black leading-tight">{LIVE_WEATHER.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <CloudRain size={17} className="text-indigo-500 shrink-0" />
              <div>
                <p className="text-[9px] text-gray-400 font-bold leading-none uppercase">{t('rainProbLabel', language)}</p>
                <p className="text-xs lg:text-sm font-black leading-tight">{LIVE_WEATHER.rainProbability}%</p>
              </div>
            </div>
          </div>

          {/* 11-Language Selector (Prominent Native Script Dropdown) */}
          <div className="relative flex items-center">
            <Languages size={15} className="absolute left-2.5 text-emerald-700 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              aria-label="Select application language"
              className="bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-300/80 rounded-xl pl-8 pr-3 py-2 text-xs font-black text-emerald-950 focus:outline-emerald-600 cursor-pointer shadow-2xs transition-colors"
              id="header-language-select"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Knowledge Hub Nav */}
          <button
            onClick={() => onNavigate('knowledge-hub')}
            className={`hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              currentPage === 'knowledge-hub'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-slate-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300'
            }`}
            title="Farmer Knowledge Hub"
            id="header-knowledge-hub-btn"
          >
            <BookOpen size={15} className="text-emerald-600" />
            <span>{t('navKnowledgeHub', language)}</span>
          </button>

          {/* Desktop Alert Bell */}
          <button
            onClick={() => onNavigate('alerts')}
            className="hidden md:flex relative p-2.5 rounded-xl border border-gray-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            aria-label="Open Alert Center"
            id="desktop-alert-btn"
          >
            <Bell size={18} />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {unreadAlertCount}
              </span>
            )}
          </button>

          {/* Prototype Badge */}
          <div className="hidden lg:flex items-center space-x-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-emerald-800">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>{t('appPositioning', language)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

