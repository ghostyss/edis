import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import CryptoJS from 'crypto-js';
import { useTranslation } from 'react-i18next';
import i18n from '../locale/i18n';
import { Feather } from '@expo/vector-icons';

const API_URL = 'https://e-disciple.com/endp.php';
const SECRET_KEY = 'Diga8611#$'; 
interface LanguageItem {
  id: number;
  nombre: string;
}

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [idiomaListo, setIdiomaListo] = useState(false);
  const [listaIdiomas, setListaIdiomas] = useState<LanguageItem[]>([]);
  const [idiomaActivoId, setIdiomaActivoId] = useState<number>(1);
  const [ocultarPassword, setOcultarPassword] = useState(true);

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
        i18n.addResourceBundle('db_idioma', 'translation', jsonTraducciones.Data, true, true);
        await i18n.changeLanguage('db_idioma');
        console.log(jsonTraducciones.Data.LogoLan);
        if (jsonTraducciones.lang) {
          const arrayConvertido = Object.entries(jsonTraducciones.lang).map(([id, nombre]) => ({
            id: Number(id),
            nombre: String(nombre)
          }));
          setListaIdiomas(arrayConvertido);
        }
        setIdiomaActivoId(idIdiomaDeTuDB);
        setIdiomaListo(true);
      }     
    } catch (err) {
      console.error("Error al cargar las etiquetas de la DB", err);
      setIdiomaListo(true);
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
  if (!idiomaListo) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={{ uri: 'https://e-disciple.com/imgapp.jpg' }} 
          style={styles.loadingImage}
          resizeMode="contain"
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.LogoLogin}>
        <Image 
          source={{ uri: t('LogoLan') }} 
          style={styles.loadingImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{t('MSJ-103') || 'Cargando...'}</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder={t('MNU-21') || 'Email...'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t('MNU-29') || 'Password...'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={ocultarPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={styles.viewPassButton} 
            onPress={() => setOcultarPassword(!ocultarPassword)}
          >
            {/* CAMBIO: Quitamos el texto y ponemos el icono dinámico */}
            <Feather 
              name={ocultarPassword ? "eye" : "eye-off"} 
              size={20} 
              color="#9ca3af" // Un color gris neutro que combina con el borde del input
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('MSJ-103') || 'Login...'}</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.langContainer}>
        {listaIdiomas.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.langLink, 
              idiomaActivoId === item.id && styles.langLinkActive
            ]} 
            onPress={() => { 
              setIdiomaListo(false);
              cambiarIdiomaDesdeBackend(item.id); 
            }}
          >
            <Text style={[
              styles.langText, 
              idiomaActivoId === item.id && styles.langTextActive
            ]}>
              {item.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  LogoLogin: { width: '90%', height: 150, marginBottom: 14, justifyContent: 'center', alignItems: 'center', maxWidth: 400 },
  loadingContainer: { flex: 1, backgroundColor: '#f4f4f6', justifyContent: 'center', alignItems: 'center', width: '100%' },
  loadingImage: { width: '100%', height: '100%', objectFit: 'cover' },

  container: { flex: 1, backgroundColor: '#f4f4f6', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', width: '90%', maxWidth: 400, padding: 24, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 6, marginBottom: 12 },
  button: { backgroundColor: '#395563', padding: 14, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: 'red', marginBottom: 12, textAlign: 'center' },

  langContainer: { flexDirection: 'row', marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16, maxWidth: 450, width: '90%' },
  langLink: { paddingVertical: 6, paddingHorizontal: 12, marginHorizontal: 4, borderRadius: 4, backgroundColor: '#e5e7eb', minWidth: '20%', marginBottom: 8, alignItems: 'center' },
  langLinkActive: { backgroundColor: '#10b981' }, // Color verde si está activo
  langText: { fontSize: 14, color: '#374151' },
  langTextActive: { color: '#fff', fontWeight: 'bold' },
  
  // NUEVOS ESTALOS PARA EL CAMPO DE CONTRASEÑA COMPUESTO
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    marginBottom: 12,
    position: 'relative'
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    paddingRight: 45 // Deja espacio para que el texto escrito no se monte sobre el botón "Ver"
  },
  viewPassButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewPassText: {
    color: '#10b981', // Mantenemos tu color verde temático
    fontWeight: 'bold',
    fontSize: 13
  },

});