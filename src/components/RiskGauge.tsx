import React from 'react';
import { Language } from '../types';
import { t, getSavedLanguage } from '../i18n';

interface RiskGaugeProps {
  score: number; // 0-100 (e.g. 72)
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  sublabel?: string;
  showConfidence?: boolean;
  confidence?: number;
  language?: Language;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  size = 'lg',
  label,
  sublabel,
  showConfidence = true,
  confidence = 91,
  language,
}) => {
  const currentLang = language || getSavedLanguage();
  const normalizedScore = Math.min(100, Math.max(0, score));

  // Determine color and localized label based on threshold
  let strokeColor = '#16A34A'; // Green
  let textColor = 'text-green-600';
  let badgeBg = 'bg-green-50 text-green-700 border-green-200';
  let defaultRiskText = currentLang === 'hi' ? 'कम जोखिम' : 'LOW RISK';

  if (normalizedScore > 80) {
    strokeColor = '#DC2626'; // Deep Red
    textColor = 'text-red-700';
    badgeBg = 'bg-red-100 text-red-800 border-red-300';
    defaultRiskText = currentLang === 'hi' ? 'अति गंभीर जोखिम' : 'CRITICAL RISK';
  } else if (normalizedScore > 60) {
    strokeColor = '#EF4444'; // Red
    textColor = 'text-red-600';
    badgeBg = 'bg-red-50 text-red-700 border-red-200';
    defaultRiskText = currentLang === 'hi' ? 'उच्च जोखिम' : 'HIGH RISK';
  } else if (normalizedScore > 30) {
    strokeColor = '#F59E0B'; // Amber
    textColor = 'text-amber-600';
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    defaultRiskText = currentLang === 'hi' ? 'मध्यम जोखिम' : 'MEDIUM RISK';
  }

  const displaySublabel = sublabel || t('farmRiskTitle', currentLang);
  const displayBadgeText = label || defaultRiskText;

  // Dimensions
  const radius = size === 'lg' ? 88 : size === 'md' ? 64 : 44;
  const strokeWidth = size === 'lg' ? 14 : size === 'md' ? 10 : 8;
  const circumference = 2 * Math.PI * radius;
  // Speedometer arch
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * normalizedScore) / 100;

  const svgSize = (radius + strokeWidth) * 2 + 10;
  const center = svgSize / 2;

  return (
    <div className="flex flex-col items-center text-center">
      {displaySublabel && (
        <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-2">
          {displaySublabel}
        </span>
      )}

      <div className="relative flex items-center justify-center" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="transform -rotate-[135deg]"
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex items-baseline space-x-0.5">
            <span
              className={`font-black tracking-tight ${
                size === 'lg' ? 'text-5xl' : size === 'md' ? 'text-3xl' : 'text-2xl'
              } ${textColor}`}
            >
              {normalizedScore}
            </span>
            <span className="text-gray-400 font-semibold text-lg">/100</span>
          </div>
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase mt-1 border ${badgeBg}`}
          >
            {displayBadgeText}
          </span>
        </div>
      </div>

      {showConfidence && (
        <div className="mt-3 flex items-center space-x-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">
            {t('aiConfidence', currentLang)}: <strong className="text-slate-900">{confidence}%</strong>
          </span>
        </div>
      )}
    </div>
  );
};
