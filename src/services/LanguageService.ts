import { ApiClient } from "../services/ApiClient";

export interface LanguageItem {
  id: number;
  name: string;
}

export interface LanguageResponse {
  code: number;

  resources: Record<string, string>;

  languages: LanguageItem[];
}

async function load(idLang: number): Promise<LanguageResponse> {
  const json = await ApiClient.post({
    action: "language",

    data: {
      idl: idLang,
    },
  });
  if (json.Code !== 200) {
    throw new Error("The language could not be loaded.");
  }
  const languages = Object.entries(json.lang).map(([id, name]) => ({
    id: Number(id),
    name: String(name),
  }));

  return {
    code: json.Code,
    resources: json.Data,
    languages,
  };
}

export const LanguageService = {
  load,
};
