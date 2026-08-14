import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next";
import i18n from "../locale/i18n";
import { Feather } from "@expo/vector-icons";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import { useAppTheme } from "../../hooks/useAppTheme";
import Loading from "../../components/Loading/Loading";
import { AuthService } from "../../services/AuthService";
import { useAuthContext } from "../../context/AuthContext";

const API_URL = "https://e-disciple.com/endp.php";
const SECRET_KEY = "Diga8611#$";
interface LanguageItem {
  id: number;
  nombre: string;
}

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idiomaListo, setIdiomaListo] = useState(false);
  const [listaIdiomas, setListaIdiomas] = useState<LanguageItem[]>([]);
  const [idiomaActivoId, setIdiomaActivoId] = useState<number>(1);
  const [ocultarPassword, setOcultarPassword] = useState(true);
  const { styles: appStyles } = useAppTheme();
  const { login } = useAuthContext();
  const encryptData = (text: string): string => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };
  useEffect(() => {
    cambiarIdiomaDesdeBackend(1);
  }, []);

  const cambiarIdiomaDesdeBackend = async (idIdiomaDeTuDB: number) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idl: idIdiomaDeTuDB, action: "language" }),
      });
      const jsonTraducciones = await response.json();
      if (jsonTraducciones.Code === 200) {
        i18n.addResourceBundle(
          "db_idioma",
          "translation",
          jsonTraducciones.Data,
          true,
          true,
        );
        await i18n.changeLanguage("db_idioma");
        if (jsonTraducciones.lang) {
          const arrayConvertido = Object.entries(jsonTraducciones.lang).map(
            ([id, nombre]) => ({
              id: Number(id),
              nombre: String(nombre),
            }),
          );
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
      setError("Por favor, llena todos los campos.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const encryptedPassword = encryptData(password);
      const response = await AuthService.login(email, encryptedPassword);

      if (response.code === 200) {
        await login(response.session!);
      } else {
        setError(response.msj || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (!idiomaListo) {
    return <Loading />;
  }
  return (
    <View style={appStyles.containerApp}>
      <ThemeSwitch />
      <View style={appStyles.LogoLogin}>
        <Image
          source={{ uri: t("LogoLan") }}
          style={appStyles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={appStyles.card}>
        <Text style={appStyles.title1}>{t("MSJ-103") || "Cargando..."}</Text>

        {error ? <Text style={appStyles.TextError}>{error}</Text> : null}

        <TextInput
          style={appStyles.input}
          placeholder={t("MNU-21") || "Email..."}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={appStyles.inputPassConteiner}>
          <TextInput
            style={appStyles.inputPass}
            placeholder={t("MNU-29") || "Password..."}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={ocultarPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={appStyles.viewPassButton}
            onPress={() => setOcultarPassword(!ocultarPassword)}
          >
            {/**/}
            <Feather
              name={ocultarPassword ? "eye" : "eye-off"}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={appStyles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={appStyles.buttonText}>{t("MSJ-103") || "Login"}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={appStyles.containerLang}>
        {listaIdiomas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              appStyles.buttonLang,
              idiomaActivoId === item.id && appStyles.buttonLangActive,
            ]}
            onPress={() => {
              setIdiomaListo(false);
              cambiarIdiomaDesdeBackend(item.id);
            }}
          >
            <Text
              style={[
                appStyles.TextLang,
                idiomaActivoId === item.id && appStyles.TextLang,
              ]}
            >
              {item.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
