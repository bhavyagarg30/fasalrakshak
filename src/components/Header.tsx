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
} from 'lucide-react';
import { LIVE_WEATHER, FARMER_PROFILE } from '../data/demoData';
import { Language, PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  unreadAlertCount: number;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  language,
  onLanguageChange,
  unreadAlertCount,
  onToggleMobileMenu,
}) => {
  const getGreeting = () => {
    switch (language) {
      case 'hi':
        return 'सुप्रभात, कृषि';
      case 'pa':
        return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਕ੍ਰਿਸ਼ੀ';
      case 'mr':
        return 'शुभ सकाळ, कृषी';
      case 'ta':
        return 'காலை வணக்கம், கிருஷி';
      default:
        return 'Good morning, Krishi';
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-4 lg:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Mobile menu toggle + Farmer Greeting & Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
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
                  Kisan ID: {FARMER_PROFILE.kisanId.split('-')[3]}
                </span>
              </div>
              <div className="flex items-center text-xs font-medium text-slate-500 mt-0.5 space-x-3">
                <span className="flex items-center text-slate-600">
                  <MapPin size={13} className="text-emerald-600 mr-1 shrink-0" />
                  {FARMER_PROFILE.tehsil}, {FARMER_PROFILE.state}
                </span>
                <span className="hidden sm:inline-block text-slate-300">•</span>
                <span className="hidden sm:inline-block text-slate-500">
                  {FARMER_PROFILE.totalLand} Registered
                </span>
              </div>
            </div>
          </div>

          {/* Mobile alert & language quick actions */}
          <div className="flex items-center space-x-2 md:hidden">
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

        {/* Right: Weather Bar & Controls */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          {/* Weather Widget */}
          <div className="flex items-center bg-[#F7FAF7] border border-gray-200/80 rounded-2xl px-3.5 py-2 space-x-4 text-slate-700 shadow-2xs">
            <div className="flex items-center space-x-1.5 pr-3 border-r border-gray-200">
              <ThermometerSun size={18} className="text-amber-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold leading-none uppercase">Temp</p>
                <p className="text-xs lg:text-sm font-bold leading-tight">{LIVE_WEATHER.temperature}°C</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 pr-3 border-r border-gray-200">
              <Droplets size={18} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold leading-none uppercase">Humidity</p>
                <p className="text-xs lg:text-sm font-bold leading-tight">{LIVE_WEATHER.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 pr-3 border-r border-gray-200">
              <CloudRain size={18} className="text-indigo-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold leading-none uppercase">Rain Prob</p>
                <p className="text-xs lg:text-sm font-bold leading-tight">{LIVE_WEATHER.rainProbability}%</p>
              </div>
            </div>

            <div className="hidden xl:flex items-center space-x-1.5">
              <Wind size={18} className="text-slate-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold leading-none uppercase">Wind</p>
                <p className="text-xs lg:text-sm font-bold leading-tight">{LIVE_WEATHER.windSpeed}</p>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center">
            <Languages size={15} className="absolute left-2.5 text-slate-400 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              aria-label="Select application language"
              className="bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-slate-700 hover:border-gray-300 focus:outline-emerald-500 cursor-pointer shadow-2xs"
              id="header-language-select"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>

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
          <div className="hidden lg:flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-amber-800">
            <ShieldCheck size={13} className="text-amber-600" />
            <span>AI PROTOTYPE MODE</span>
          </div>
        </div>
      </div>
    </header>
  );
};
