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
import { Feather } from "@expo/vector-icons";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import { useAppTheme } from "../../hooks/useAppTheme";
import { AuthService } from "../../services/AuthService";
import { useAuthContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { API } from "../../config/api";

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ocultarPassword, setOcultarPassword] = useState(true);
  const { styles: appStyles } = useAppTheme();
  const { login } = useAuthContext();
  const encryptData = (text: string): string => {
    return CryptoJS.AES.encrypt(text, `${API.KEY}`).toString();
  };

  const { isLoading, languages, currentLanguage, loadLanguage } =
    useLanguageContext();
  const handleLogin = async () => {
    if (!email || !password) {
      setError(t("MNU-22") + " or " + t("MNU-30") || "Please Fill al fields");
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
        setError(response.msj || "Incorrect credentials");
      }
    } catch (err) {
      setError("Server connection error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        {languages.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              appStyles.buttonLang,
              currentLanguage === item.id && appStyles.buttonLangActive,
            ]}
            onPress={() => {
              loadLanguage(item.id);
            }}
          >
            <Text
              style={[
                appStyles.TextLang,
                currentLanguage === item.id && appStyles.TextLang,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
