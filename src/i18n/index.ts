import { Language } from '../types';
import { TRANSLATIONS } from './translations';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getSavedLanguage, saveLanguage } from './languages';

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getSavedLanguage, saveLanguage };

// Canonical key aliases to prevent any legacy or shorthand key from ever rendering raw
const KEY_ALIASES: Record<string, string> = {
  uspTagline: 'tagline',
  uspDetect: 'heroHeading',
  navDamageAssessment: 'navAnalyzeDamage',
  tempLabel: 'weatherTemp',
  humidityLabel: 'weatherHumidity',
  rainProbLabel: 'weatherRain',
  windLabel: 'weatherWind',
  startDamageAssessmentBtn: 'analyzeDamageBtn',
  viewPmfbyGuide: 'navKnowledgeHub',
  TEMPLABEL: 'weatherTemp',
  HUMIDITYLABEL: 'weatherHumidity',
  RAINPROBLABEL: 'weatherRain',
  USPTAGLINE: 'tagline',
  up$Detect: 'heroHeading',
};

export const t = (rawKey: string, lang: Language = 'en'): string => {
  if (!rawKey) return '';
  const key = KEY_ALIASES[rawKey] || rawKey;

  // 1. Direct language match
  const langDict = TRANSLATIONS[lang];
  if (langDict && langDict[key]) {
    return langDict[key];
  }

  // 2. Hindi fallback if user chose another regional language and string is pending
  if (lang !== 'hi' && TRANSLATIONS['hi'] && TRANSLATIONS['hi'][key]) {
    return TRANSLATIONS['hi'][key];
  }

  // 3. English fallback
  if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
    return TRANSLATIONS['en'][key];
  }

  // 4. Safe humanized fallback — never return code identifier or uppercase placeholder
  // If it's something like "navAnalyzeDamage", return a clean string instead of key
  if (lang === 'hi') {
    return 'कृषि सेवा';
  }
  return key.replace(/([A-Z])/g, ' $1').replace(/^nav|^step|^sec/, '').trim();
};

