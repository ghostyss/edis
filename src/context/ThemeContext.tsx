import AsyncStorage from "@react-native-async-storage/async-storage";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeMode = "light" | "dark";
const THEME_KEY = "APP_THEME";

interface ThemeContextData {
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    LoadingTheme();
  }, []);

  const LoadingTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (savedTheme === "light" || savedTheme === "dark") {
        setMode(savedTheme);
      }
    } catch (error) {
      console.log("Error cargando tema:", error);
    }
  };

  useEffect(() => {
    SaveTheme();
  }, [mode]);

  const SaveTheme = async () => {
    try {
      await AsyncStorage.setItem(THEME_KEY, mode);
    } catch (error) {
      console.log("Error guardando tema:", error);
    }
  };

  const toggleTheme = () => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === "dark",
      toggleTheme,
      setTheme: setMode,
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
