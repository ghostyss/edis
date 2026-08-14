import { API } from "../config/api";

import { SessionStorage } from "./SessionStorage";

interface PostOptions {
  action: string;

  data?: Record<string, unknown>;

  auth?: boolean;
}

async function post<T = any>({
  action,
  data = {},
  auth = true,
}: PostOptions): Promise<T> {
  const session = auth ? await SessionStorage.get() : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (session?.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }

  let response: Response;

  try {
    response = await fetch(API.BASE_URL, {
      method: "POST",

      headers,

      body: JSON.stringify({
        action,
        ...data,
      }),
    });
  } catch (error) {
    throw new Error("NETWORK_ERROR");
  }

  let json: any;

  try {
    const newToken = response.headers.get("X-New-Token");

    if (auth && newToken && session) {
      session.token = newToken;
      await SessionStorage.save(session);
    }
    json = await response.json();
  } catch {
    throw new Error("INVALID_RESPONSE");
  }

  if (response.status === 401) {
    await SessionStorage.remove();

    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    throw new Error(json?.Msj ?? json?.Message ?? `HTTP_${response.status}`);
  }

  return json as T;
}

export const ApiClient = {
  post,
};
