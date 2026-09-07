import React from 'react';
import { LayoutDashboard, Camera, Map as MapIcon, Bell, UserCircle } from 'lucide-react';
import { PageId } from '../types';

interface MobileNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  unreadAlertCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  unreadAlertCount,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 px-3 py-2 pb-5 flex items-center justify-around shadow-lg">
      {/* Home */}
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentPage === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-home"
      >
        <LayoutDashboard size={20} />
        <span className="text-[11px] mt-1">Home</span>
      </button>

      {/* Map */}
      <button
        onClick={() => onNavigate('map')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentPage === 'map' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-map"
      >
        <MapIcon size={20} />
        <span className="text-[11px] mt-1">Map</span>
      </button>

      {/* Center Scan Button (Prominent, elevated) */}
      <div className="flex-1 flex justify-center -mt-6">
        <button
          onClick={() => onNavigate('scan')}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-600/30 border-4 border-white active:scale-95 transition-all"
          aria-label="Scan Crop Leaf"
          id="mobile-nav-scan"
        >
          <Camera size={24} />
        </button>
      </div>

      {/* Alerts */}
      <button
        onClick={() => onNavigate('alerts')}
        className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentPage === 'alerts' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-alerts"
      >
        <div className="relative">
          <Bell size={20} />
          {unreadAlertCount > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadAlertCount}
            </span>
          )}
        </div>
        <span className="text-[11px] mt-1">Alerts</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentPage === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500'
        }`}
        id="mobile-nav-profile"
      >
        <UserCircle size={20} />
        <span className="text-[11px] mt-1">Profile</span>
      </button>
    </nav>
  );
};
