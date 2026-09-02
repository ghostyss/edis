import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next";
import { Feather } from "@expo/vector-icons";

import { useAppTheme } from "../../hooks/useAppTheme";
import { AuthService } from "../../services/AuthService";
import { useAuthContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { API } from "../../config/api";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  //console.log(t("DSH-135"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ocultarPassword, setOcultarPassword] = useState(true);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);

  const { styles: appStyles, colors } = useAppTheme();
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

  const selectedLanguage = languages.find(
    (item) => item.id === currentLanguage,
  );

  return (
    <View style={appStyles.containerApp}>
      {/* Selector de idioma */}
      {!isLoading && languages.length > 0 && (
        <View style={appStyles.languageSelectorContainer}>
          <TouchableOpacity
            style={appStyles.languageSelector}
            onPress={() => setLanguageMenuVisible(!languageMenuVisible)}
          >
            <Feather name="globe" size={18} color={colors.success} />
            <Text style={appStyles.languageSelectorText}>
              {selectedLanguage?.name ?? currentLanguage}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={languageMenuVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setLanguageMenuVisible(false)}
          >
            <Pressable
              style={appStyles.languageSelectorOverlay}
              onPress={() => setLanguageMenuVisible(false)}
            >
              <View style={appStyles.languageSelectorMenu}>
                {languages.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={appStyles.languageSelectorItem}
                    onPress={() => {
                      loadLanguage(item.id);
                      setLanguageMenuVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        appStyles.languageSelectorItemText,
                        currentLanguage === item.id &&
                          appStyles.languageSelectorItemActive,
                      ]}
                    >
                      {item.name}
                    </Text>

                    {currentLanguage === item.id && (
                      <Feather name="check" size={18} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>
      )}

      <View style={appStyles.LogoLogin}>
        <Image
          source={{ uri: t("LogoLan") }}
          style={appStyles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={appStyles.cardLogin}>
        <Text style={appStyles.headerTitleLogin}>
          {t("DSH-135").replace("{nameuser} !", "") || "Welcome back"}
        </Text>
        <Text style={appStyles.headerSubtitle}>
          {t("MNU-212", {
            defaultValue:
              "Sign in to continue growing in Christ and making disciples together",
          })}
        </Text>
        <Text>{"\n"}</Text>
        {error ? <Text style={appStyles.TextError}>{error}</Text> : null}
        <Text>{t("MNU-21", { defaultValue: "Email Address" })}</Text>
        <View style={appStyles.inputPassConteiner}>
          <Feather style={appStyles.iconmail} name="mail" size={20} />

          <TextInput
            style={appStyles.inputMail}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <Text>{t("MNU-29", { defaultValue: "Password" })}</Text>
        <View style={appStyles.inputPassConteiner}>
          <TextInput
            style={appStyles.inputPass}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={ocultarPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={appStyles.viewPassButton}
            onPress={() => setOcultarPassword(!ocultarPassword)}
          >
            <Feather
              name={ocultarPassword ? "eye" : "eye-off"}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
          <Text style={appStyles.TextForgot}>
            {t("MNU-71", {
              defaultValue: "Forgot password?",
            })}
          </Text>
        </TouchableOpacity>
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
    </View>
  );
}
