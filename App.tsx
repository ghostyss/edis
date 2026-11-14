import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import { ThemeProvider } from "./src/context/ThemeContext";

import { AuthProvider, useAuthContext } from "./src/context/AuthContext";

import Loading from "./src/components/Loading/Loading";

import {
  requestNotificationPermission,
  getFCMToken,
  listenForForegroundMessages,
} from "./src/services/firebaseMessaging";

import {
  LanguageProvider,
  useLanguageContext,
} from "./src/context/LanguageContext";

import {
  useNetworkContext,
  NetworkProvider,
} from "./src/context/NetworkContext";

import AppNavigator from "./src/navigation/AppNavigator";

function AppContent() {
  /* */
  useEffect(() => {
    async function initializeFirebaseMessaging() {
      const permissionGranted = await requestNotificationPermission();

      if (!permissionGranted) {
        console.log("Permiso de notificaciones no concedido");
        return;
      }

      const token = await getFCMToken();
      //console.log("FCM Token:", token);
    }

    initializeFirebaseMessaging();

    const unsubscribe = listenForForegroundMessages();

    return unsubscribe;
  }, []);
  /* */
  const { loading, isAuthenticated } = useAuthContext();

  const { isChecking } = useNetworkContext();

  const { isLoading, initializeLanguage } = useLanguageContext();

  useEffect(() => {
    if (isChecking) {
      return;
    }

    initializeLanguage();
  }, [isChecking]);

  if (isChecking) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (loading) {
    return null;
  }

  return <AppNavigator isAuthenticated={isAuthenticated} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NetworkProvider>
          <LanguageProvider>
            <SafeAreaProvider>
              <SafeAreaView style={styles.container}>
                <AppContent />
              </SafeAreaView>
            </SafeAreaProvider>
          </LanguageProvider>
        </NetworkProvider>
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
