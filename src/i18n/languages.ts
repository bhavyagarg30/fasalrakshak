import { Language, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Pan-India' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North & Central India' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab & Haryana' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'West Bengal & Tripura' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh & Telangana' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha' },
];

export const DEFAULT_LANGUAGE: Language = 'en';

export const getSavedLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('fasalrakshak_language');
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved as Language;
    }
  } catch (e) {
    // LocalStorage fallback
  }
  return 'en';
};

export const saveLanguage = (lang: Language): void => {
  try {
    localStorage.setItem('fasalrakshak_language', lang);
  } catch (e) {
    // LocalStorage fallback
  }
};
