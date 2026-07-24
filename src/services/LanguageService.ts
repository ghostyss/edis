import { API } from "../config/api";

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
  const response = await fetch(`${API.BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idl: idLang,
      action: "language",
    }),
  });

  const json = await response.json();
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
