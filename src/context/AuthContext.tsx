import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { SessionStorage } from "../services/SessionStorage";
import { UserSession } from "../types/auth";

interface AuthContextData {
  loading: boolean;
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (session: UserSession) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    const session = await SessionStorage.get();
    setUser(session);
    setLoading(false);
  }
  async function login(session: UserSession) {
    await SessionStorage.save(session);
    setUser(session);
  }

  async function logout() {
    await SessionStorage.remove();
    setUser(null);
  }
  const value = useMemo(
    () => ({
      loading,
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
