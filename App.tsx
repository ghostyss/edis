import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoginScreen from './src/auth-module/screens/LoginScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Pintamos la pantalla de login en el arranque */}
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
