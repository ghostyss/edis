// src/auth-module/locale/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'DBLanguage',
    fallbackLng: 'DBLanguage',
    resources: {},
    interpolation: {
      escapeValue: false,
    },
  } as any);

export default i18n;