import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Languages,
  Wifi,
  Volume2,
  MapPin,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { Language } from '../types';

interface SettingsPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  language,
  onLanguageChange,
}) => {
  const [smsAlerts, setSmsAlerts] = useState<boolean>(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState<boolean>(true);
  const [weatherFlash, setWeatherFlash] = useState<boolean>(true);
  const [offlineMode, setOfflineMode] = useState<boolean>(true);
  const [audioVoice, setAudioVoice] = useState<boolean>(false);
  const [zone, setZone] = useState<string>('haryana-east');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Platform Preferences
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-2">
          APPLICATION SETTINGS
        </h2>
        <p className="text-slate-500 text-xs font-medium mt-1">
          Customize language, notification channels, and regional agro-climatic corridor bindings.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-8">
        {/* Language Selection */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Languages size={18} className="text-emerald-600" />
            <h3 className="text-base font-black text-slate-900">
              Preferred Language (भाषा चयन)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Select your preferred regional language for advisories, diagnosis, and voice reader.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            {[
              { id: 'en', label: 'English', sub: 'Default' },
              { id: 'hi', label: 'हिंदी', sub: 'Hindi' },
              { id: 'pa', label: 'ਪੰਜਾਬੀ', sub: 'Punjabi' },
              { id: 'mr', label: 'मराठी', sub: 'Marathi' },
              { id: 'ta', label: 'தமிழ்', sub: 'Tamil' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => onLanguageChange(lang.id as Language)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  language === lang.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'border-gray-200 hover:border-gray-300 text-slate-700'
                }`}
              >
                <strong className="block text-sm font-bold">{lang.label}</strong>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{lang.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications & Dispatches */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Bell size={18} className="text-emerald-600" />
            <h3 className="text-base font-black text-slate-900">
              Notification Channels & Dispatches
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7FAF7] border border-gray-100 cursor-pointer">
              <div>
                <strong className="text-slate-900 block font-bold">SMS Emergency Broadcasts</strong>
                <span className="text-slate-500 text-[11px]">Instant text alert whenever High/Critical threat is within 5 km.</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7FAF7] border border-gray-100 cursor-pointer">
              <div>
                <strong className="text-slate-900 block font-bold">WhatsApp Advisory Dispatches</strong>
                <span className="text-slate-500 text-[11px]">Receive pictorial 3-step action plans and spray schedules directly on WhatsApp.</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7FAF7] border border-gray-100 cursor-pointer">
              <div>
                <strong className="text-slate-900 block font-bold">Weather Flash Warnings</strong>
                <span className="text-slate-500 text-[11px]">Advance warnings for incoming rain, hailstorms, or high fungal dew humidity.</span>
              </div>
              <input
                type="checkbox"
                checked={weatherFlash}
                onChange={(e) => setWeatherFlash(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Offline & Accessibility */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Volume2 size={18} className="text-emerald-600" />
            <h3 className="text-base font-black text-slate-900">
              Field Accessibility & Connectivity
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7FAF7] border border-gray-100 cursor-pointer">
              <div>
                <strong className="text-slate-900 block font-bold">Offline Field Caching</strong>
                <span className="text-slate-500 text-[11px]">Save outbreak maps & offline leaf diagnosis model when working in low-signal fields.</span>
              </div>
              <input
                type="checkbox"
                checked={offlineMode}
                onChange={(e) => setOfflineMode(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7FAF7] border border-gray-100 cursor-pointer">
              <div>
                <strong className="text-slate-900 block font-bold">Audio Voice Reader for Advisory</strong>
                <span className="text-slate-500 text-[11px]">Text-to-speech engine speaks out field advisories in your local dialect.</span>
              </div>
              <input
                type="checkbox"
                checked={audioVoice}
                onChange={(e) => setAudioVoice(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 flex items-center justify-between">
          {savedNotice ? (
            <span className="text-xs font-bold text-emerald-700 flex items-center">
              <CheckCircle2 size={14} className="mr-1" />
              Settings saved successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">Settings persist locally.</span>
          )}

          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md shadow-emerald-200 transition-all cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
