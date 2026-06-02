import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import CryptoJS from 'crypto-js';

const API_URL = 'https://e-disciple.com/endp.php';
const SECRET_KEY = 'Diga8611#$'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const encryptData = (text: string): string => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const encryptedPassword = encryptData(password);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: encryptedPassword,
        }),
      });

      const json = await response.json();

      if (json.success === true) {
        alert('¡Inicio de sesión correcto!');
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
          keyboardType="email-address"
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