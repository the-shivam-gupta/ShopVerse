
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/english.json';
import translationHI from './locales/hi/hindi.json';
import translationES from './locales/es/spanish.json';

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  es: { translation: translationES },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
