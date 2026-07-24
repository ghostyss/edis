import { LanguageService } from "../services/LanguageService";
import { LanguageStorage } from "../storage/LanguageStorage";

export interface LanguageData {
  resources: Record<string, string>;

  languages: {
    id: number;
    name: string;
  }[];
}

async function load(idLang: number, isOnline: boolean): Promise<LanguageData> {
  const cache = await LanguageStorage.getResource(idLang);
  const languages = await LanguageStorage.getLanguageList();

  // Sin Internet → usar caché
  if (!isOnline) {
    if (!cache) {
      throw new Error("El idioma no está disponible sin conexión.");
    }

    return {
      resources: cache,
      languages,
    };
  }

  const server = await LanguageService.load(idLang);

  await LanguageStorage.saveResource(idLang, server.resources);

  await LanguageStorage.saveLanguageList(server.languages);

  await LanguageStorage.saveActiveLanguage(idLang);

  return {
    resources: server.resources,

    languages: server.languages,
  };
}

async function refresh(idLang: number): Promise<LanguageData> {
  const server = await LanguageService.load(idLang);

  await LanguageStorage.saveResource(idLang, server.resources);

  await LanguageStorage.saveLanguageList(server.languages);

  await LanguageStorage.saveActiveLanguage(idLang);

  return {
    resources: server.resources,

    languages: server.languages,
  };
}

export const LanguageRepository = {
  load,

  refresh,
};
