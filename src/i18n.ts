import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import fr from './translations/fr.json';

// Initialize i18next with two namespaces: en / fr
i18n.use(initReactI18next).init({
      resources: { en: { translation: en }, fr: { translation: fr } },
      lng: 'fr',
      fallbackLng: 'en',
      interpolation: { escapeValue: false }
});

export default i18n;
