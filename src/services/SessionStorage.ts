import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserSession } from "../types/auth";

const SESSION_KEY = "USER_SESSION";

async function save(session: UserSession): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function get(): Promise<UserSession | null> {
  const value = await AsyncStorage.getItem(SESSION_KEY);

  if (!value) {
    return null;
  }

  try {
    const session = JSON.parse(value);

    if (
      typeof session.token !== "string" ||
      typeof session.userId !== "number" ||
      typeof session.name !== "string" ||
      typeof session.email !== "string" ||
      typeof session.idLang !== "string"
    ) {
      await remove();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

async function remove(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

async function has(): Promise<boolean> {
  const session = await get();

  return session !== null;
}

export const SessionStorage = {
  save,

  get,

  remove,

  has,
};
