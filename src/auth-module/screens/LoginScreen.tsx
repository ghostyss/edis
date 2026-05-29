import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
// Usamos lo mejor y oficial de Expo para criptografía nativa
import * as Crypto from 'expo-crypto';

const API_URL = 'https://tu-servidor.com/api/login.php';
// Clave secreta de 32 caracteres (Debe ser la misma en PHP)
const SECRET_KEY = '12345678901234561234567890123456'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Función para encriptar la contraseña usando las herramientas de Expo
  const encryptData = async (text: string) => {
    // Generamos un vector de inicialización (IV) aleatorio para máxima seguridad
    const iv = Crypto.getRandomBytes(12);
    const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');

    // Encriptamos la contraseña de forma nativa en el dispositivo
    const encrypted = await Crypto.encryptAES_GCMAsync(text, SECRET_KEY, ivHex, '');
    
    return {
      ciphertext: encrypted,
      iv: ivHex
    };
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Campos requeridos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Encriptamos la contraseña antes de enviarla
      const encryptedResult = await encryptData(password);

      // Enviamos un JSON tradicional mediante POST
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: encryptedResult.ciphertext, // Texto encriptado
          iv: encryptedResult.iv               // El IV necesario para desencriptar
        }),
      });

      const json = await response.json();

      if (json.success === true) {
        alert('¡Inicio de sesión correcto!');
        // Aquí guardas tu token de sesión corporativo
      } else {
        setError(json.message || 'Credenciales incorrectas');
      }

    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Módulo de Autenticación</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Ingresar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f6', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', width: '90%', maxWidth: 400, padding: 24, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 6, marginBottom: 12 },
  button: { backgroundColor: '#10b981', padding: 14, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: 'red', marginBottom: 12, textAlign: 'center' }
});