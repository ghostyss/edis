import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LanguageItem {
  id: number;
  name: string;
}

const ACTIVE_LANGUAGE_KEY = "LANGUAGE_ACTIVE";
const LANGUAGE_LIST_KEY = "LANGUAGE_LIST";

const resourceKey = (idLang: number) => `LANGUAGE_RESOURCE_${idLang}`;

async function saveActiveLanguage(idLang: number): Promise<void> {
  await AsyncStorage.setItem(ACTIVE_LANGUAGE_KEY, idLang.toString());
}

async function getActiveLanguage(): Promise<number | null> {
  const value = await AsyncStorage.getItem(ACTIVE_LANGUAGE_KEY);
  //console.log(value);
  if (!value) {
    return null;
  }

  return Number(value);
}

async function saveLanguageList(languages: LanguageItem[]): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_LIST_KEY, JSON.stringify(languages));
}

async function getLanguageList(): Promise<LanguageItem[]> {
  const value = await AsyncStorage.getItem(LANGUAGE_LIST_KEY);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
}

async function saveResource(
  idLang: number,
  resource: Record<string, string>,
): Promise<void> {
  await AsyncStorage.setItem(resourceKey(idLang), JSON.stringify(resource));
}

async function getResource(
  idLang: number,
): Promise<Record<string, string> | null> {
  const value = await AsyncStorage.getItem(resourceKey(idLang));

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export const LanguageStorage = {
  saveActiveLanguage,

  getActiveLanguage,

  saveLanguageList,

  getLanguageList,

  saveResource,

  getResource,
};
