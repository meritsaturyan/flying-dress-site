import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru.json';
import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = { ru: { translation: ru }, en: { translation: en }, ar: { translation: ar } };

const saved = localStorage.getItem('lang');
const fallback = saved || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: fallback,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
