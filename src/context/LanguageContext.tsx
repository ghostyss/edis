import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import { LanguageStorage, LanguageItem } from "../storage/LanguageStorage";
import { LanguageService } from "../services/LanguageService";
import { useNetworkContext } from "./NetworkContext";
import { LanguageRepository } from "../repositories/LanguageRepository";
import i18n from "../auth-module/locale/i18n";

interface LanguageContextData {
  isLoading: boolean;

  currentLanguage: number;

  languages: LanguageItem[];

  loadLanguage: (idLang: number) => Promise<void>;
  refreshLanguage: (idLang: number) => Promise<boolean>;
  initializeLanguage: () => Promise<void>;
}

const LanguageContext = createContext({} as LanguageContextData);

interface Props {
  children: ReactNode;
}

export function LanguageProvider({ children }: Props) {
  const { t } = useTranslation();
  const { isOnline } = useNetworkContext();
  const [isLoading, setIsLoading] = useState(true);

  const [currentLanguage, setCurrentLanguage] = useState(1);

  const [languages, setLanguages] = useState<LanguageItem[]>([]);

  async function loadLanguage(idLang: number) {
    setIsLoading(true);

    try {
      const result = await LanguageRepository.load(idLang, isOnline);

      i18n.addResourceBundle(
        "db_idioma",
        "translation",
        result.resources,
        true,
        true,
      );

      await i18n.changeLanguage("db_idioma");

      setCurrentLanguage(idLang);

      setLanguages(result.languages);
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshLanguage(idLang: number) {
    if (!isOnline) {
      return false;
    }

    setIsLoading(true);

    try {
      const result = await LanguageRepository.refresh(idLang);

      i18n.addResourceBundle(
        "db_idioma",
        "translation",
        result.resources,
        true,
        true,
      );

      await i18n.changeLanguage("db_idioma");

      setCurrentLanguage(idLang);

      setLanguages(result.languages);

      return true;
    } finally {
      setIsLoading(false);
    }
  }

  async function initializeLanguage() {
    setIsLoading(true);

    try {
      const savedLanguage = await LanguageStorage.getActiveLanguage();

      if (savedLanguage) {
        await loadLanguage(savedLanguage);
      } else {
        await loadLanguage(1);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const value = useMemo(
    () => ({
      t,

      isLoading,

      currentLanguage,

      languages,

      loadLanguage,
      refreshLanguage,
      initializeLanguage,
    }),
    [t, isLoading, currentLanguage, languages],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}
