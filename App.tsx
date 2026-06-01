// App.tsx (Corregido con el estándar moderno)
import React from 'react';
// 1. Importamos el proveedor y el contenedor moderno de áreas seguras
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import LoginScreen from './src/auth-module/screens/LoginScreen';

export default function App() {
  return (
    // 2. El Provider envuelve toda la aplicación para calcular los márgenes del dispositivo
    <SafeAreaProvider>
      {/* 3. Este SafeAreaView de la librería sí es el correcto y no está en desuso */}
      <SafeAreaView style={styles.container}>
        <LoginScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6', // Color de fondo global para evitar destellos blancos
  },
});