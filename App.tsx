import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import LoginScreen from "./src/auth-module/screens/LoginScreen";
import DashboardScreen from "./src/dashboard/screens/DashboardScreen";
import { ThemeProvider } from "./src/context/ThemeContext";
import { AuthProvider, useAuthContext } from "./src/context/AuthContext";
import Loading from "./src/components/Loading/Loading";
import { LanguageProvider } from "./src/context/LanguageContext";
import { useLanguageContext } from "./src/context/LanguageContext";
import {
  useNetworkContext,
  NetworkProvider,
} from "./src/context/NetworkContext";

function AppContent() {
  const { loading, isAuthenticated } = useAuthContext();
  const { isChecking } = useNetworkContext();
  const { isLoading, initializeLanguage } = useLanguageContext();
  useEffect(() => {
    initializeLanguage();
  }, []);
  if (isChecking) {
    return <Loading />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {isAuthenticated ? <DashboardScreen /> : <LoginScreen />}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <NetworkProvider>
            <SafeAreaProvider>
              <SafeAreaView style={styles.container}>
                <AppContent />
              </SafeAreaView>
            </SafeAreaProvider>
          </NetworkProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f6",
  },
});
