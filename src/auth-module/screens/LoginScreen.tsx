import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import CryptoJS from 'crypto-js';
import { useTranslation } from 'react-i18next';
import i18n from '../locale/i18n';

const API_URL = 'https://e-disciple.com/endp.php';
const SECRET_KEY = 'Diga8611#$'; 

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const encryptData = (text: string): string => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };
  useEffect(() => {
    cambiarIdiomaDesdeBackend(1);
  }, []);

  const cambiarIdiomaDesdeBackend = async (idIdiomaDeTuDB: number) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idl: idIdiomaDeTuDB, action: 'language' }),
      });
      const jsonTraducciones = await response.json(); 
      if(jsonTraducciones.Code === 200) {
        const diccionarioLimpio = jsonTraducciones.Data;
        i18n.addResourceBundle('db_idioma', 'translation', diccionarioLimpio, true, true);
        await i18n.changeLanguage('db_idioma');
      }     
    } catch (err) {
      console.error("Error al cargar las etiquetas de la DB", err);
    }
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
          action: 'login'
        }),
      });

      const json = await response.json();

      if (json.Code === 200) {
        alert('¡Inicio de sesión correcto!');
      } else {
        setError(json.Msj || 'Credenciales incorrectas');
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
        <Text style={styles.title}>{t('MSJ-103') || 'Cargando...'}</Text>
        
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