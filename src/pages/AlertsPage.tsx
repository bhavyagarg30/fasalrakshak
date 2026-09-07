import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  CloudRain,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Filter,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AlertItem, PageId } from '../types';

interface AlertsPageProps {
  alerts: AlertItem[];
  onMarkAsRead: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  onMarkAsRead,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'All' | 'Urgent' | 'Advisory' | 'Weather'>('All');

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'All') return true;
    if (filter === 'Urgent') {
      return alert.riskLevel === 'High' || alert.riskLevel === 'Critical' || alert.type === 'disease';
    }
    if (filter === 'Weather') {
      return alert.type === 'weather';
    }
    if (filter === 'Advisory') {
      return alert.type === 'community' || alert.type === 'scan-reminder' || alert.type === 'expert' || alert.type === 'risk-reduced';
    }
    return true;
  });

  const getAlertBadge = (alert: AlertItem) => {
    if (alert.riskLevel === 'Critical' || alert.riskLevel === 'High' || alert.type === 'disease') {
      return 'bg-red-100 text-red-700 border-red-200';
    }
    if (alert.type === 'weather') {
      return 'bg-blue-100 text-blue-700 border-blue-200';
    }
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  const getAlertIcon = (alert: AlertItem) => {
    if (alert.riskLevel === 'Critical' || alert.riskLevel === 'High' || alert.type === 'disease') {
      return <AlertTriangle size={18} className="text-red-600" />;
    }
    if (alert.type === 'weather') {
      return <CloudRain size={18} className="text-blue-600" />;
    }
    return <ShieldCheck size={18} className="text-amber-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Early-Warning Broadcasts
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            FIELD & REGIONAL ALERTS
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Real-time agro-meteorological warnings dispatched by KVK Sonipat & AI Sentinel mesh.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-2xl border border-gray-200 shadow-2xs">
          {(['All', 'Urgent', 'Advisory', 'Weather'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                filter === f
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 text-slate-400">
            <Bell size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-slate-700">No alerts found</p>
            <p className="text-xs">No notifications match your current filter.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onMarkAsRead(alert.id)}
              className={`bg-white rounded-3xl p-6 shadow-sm border transition-all hover:shadow-md cursor-pointer flex flex-col md:flex-row items-start justify-between gap-4 ${
                !alert.isRead
                  ? 'border-emerald-200 ring-2 ring-emerald-500/10'
                  : 'border-gray-100 opacity-90'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-gray-100 shrink-0">
                  {getAlertIcon(alert)}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${getAlertBadge(
                        alert
                      )}`}
                    >
                      {alert.riskLevel} Risk • {alert.type}
                    </span>
                    {!alert.isRead && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        NEW
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium flex items-center">
                      <Clock size={11} className="mr-1" />
                      {alert.time || alert.timestamp}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {alert.description || alert.reason}
                  </p>
                  {alert.actionRequired && (
                    <p className="text-[11px] text-emerald-800 font-semibold mt-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 inline-block">
                      Action: {alert.actionRequired}
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center space-x-2 self-end md:self-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(alert.id);
                    onNavigate((alert.actionPage as PageId) || (alert.type === 'disease' ? 'action' : 'map'));
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>{alert.type === 'disease' ? 'Action Plan' : 'Inspect Map'}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Broadcast System Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center">
          <Sparkles size={14} className="text-emerald-600 mr-2" />
          Alerts synced with Sonipat Disaster Management & Krishi Vigyan Kendra network.
        </span>
        <button
          onClick={() => onNavigate('action')}
          className="text-emerald-700 font-bold hover:text-emerald-800"
        >
          Check Action Plan →
        </button>
      </div>
    </div>
  );
};
