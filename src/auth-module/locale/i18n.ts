// src/auth-module/locale/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'db_idioma', 
    fallbackLng: 'db_idioma',
    resources: {
      db_idioma: {
        translation: {} // Inicializamos el contenedor vacío para que exista desde el segundo cero
      }
    },
    interpolation: {
      escapeValue: false,
    },
  } as any);

export default i18n;