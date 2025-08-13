import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa i file suddivisi
import enCommon from './locales/en/common.json';
import enSample from './locales/en/sample.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        sample: enSample,
      },
      it: {
        common: enCommon,
        sample: enSample,
      }
    },
    lng: 'en', // Lingua iniziale
    fallbackLng: 'en', // Lingua di fallback
    ns: ['common', 'sample'], // Namespace delle traduzioni
    defaultNS: 'common', // Namespace di default
    interpolation: {
      escapeValue: false, // Disabilita l'escape automatico
    },
  });

export default i18n;
