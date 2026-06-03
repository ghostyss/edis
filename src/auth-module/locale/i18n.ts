// src/auth-module/locale/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'db_idioma', // Nombre clave para tu idioma dinámico
    fallbackLng: 'db_idioma',
    resources: {},    // Empieza vacío, se llena en caliente con lo que mande tu PHP
    interpolation: {
      escapeValue: false,
    },
  } as any); // El 'as any' le quita la rigidez a TypeScript para evitar errores de sobrecarga molestos

export default i18n;