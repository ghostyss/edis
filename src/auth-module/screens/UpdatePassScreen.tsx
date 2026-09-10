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
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAppTheme } from "../../hooks/useAppTheme";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { AuthService } from "../../services/AuthService";
import { API } from "../../config/api";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PassUpdate"
>;

export default function UpdatePassScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [msj, setMsj] = useState("");
  const { styles: appStyles, colors } = useAppTheme();
  const route = useRoute<RouteProp<RootStackParamList, "PassUpdate">>();
  const { token } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordIsValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
  const encryptData = (text: string): string => {
    return CryptoJS.AES.encrypt(text, `${API.KEY}`).toString();
  };
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;
  const passwordRequirements = [
    {
      label: t("MNU-ForAdd", {
        defaultValue: "Minimum 8 characters",
      }),
      valid: password.length >= 8,
    },
    {
      label: t("MNU-ForAdd", {
        defaultValue: "Must contain at least one number",
      }),
      valid: /\d/.test(password),
    },
    {
      label: t("MNU-ForAdd", {
        defaultValue: "Must contain at least one uppercase letter",
      }),
      valid: /[A-Z]/.test(password),
    },
    /*{
      label: t("MNU-ForAdd", {
        defaultValue: "Must contain at least one lowercase letter",
      }),
      valid: /[a-z]/.test(password),
    },*/
    {
      label: t("MNU-ForAdd", {
        defaultValue: "Must contain at least one special character",
      }),
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
  const handleCode = async () => {
    if (!passwordIsValid) {
      setError(
        t("MNU-ForAdd", {
          defaultValue: "Password Invalid",
        }),
      );
      return;
    }

    if (!passwordsMatch) {
      setError(
        t("MNU-ForAdd", {
          defaultValue: "Passwords do not match",
        }),
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      const encryptedPassword = encryptData(password);
      const response = await AuthService.UpdatePass(token, encryptedPassword);
      console.log(response);
      if (response.code === 200) {
        //navigation.navigate("PassUpdate", { token });
        setMsj(
          t("MNU-ForAdd", {
            defaultValue:
              "Password updated successfully, please return to login",
          }) || "Password updated successfully, please return to login",
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={appStyles.containerApp}>
      <View style={appStyles.LogoLogin}>
        <Image
          source={{ uri: t("LogoLan") }}
          style={appStyles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={appStyles.cardLogin}>
        <View style={appStyles.forgotIcon}>
          <Feather name="shield" size={80} color={colors.text} />

          <View style={appStyles.secureBadge}>
            <Feather name="key" size={40} color={colors.secundary} />
          </View>
        </View>
        <Text style={appStyles.headerTitleLogin2}>
          {t("MNU-ForAdd", {
            defaultValue: "Create a new password",
          })}
        </Text>

        <Text style={appStyles.headerSubtitle2}>
          {t("MNU-214", {
            defaultValue: "Choose a new password for",
          })}
        </Text>
        <Text style={appStyles.textCenter}>{token}</Text>
        <Text></Text>
        {error ? <Text style={appStyles.TextError}>{error}</Text> : null}
        {msj ? <Text style={appStyles.TextSuccess}>{msj}</Text> : null}
        {msj ? (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={appStyles.textCenterContainer2}>
              <Text style={appStyles.textCenter2}>
                {t("MNU-ForAdd", {
                  defaultValue: "Return to sign in",
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <Text style={appStyles.textLogin}>
          {t("ACC-15", { defaultValue: "New Password" })}
        </Text>
        <View style={appStyles.inputPassConteiner}>
          <TextInput
            style={appStyles.inputPass}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={appStyles.viewPassButton}
            onPress={() => setShowPassword((current) => !current)}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={22}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
        <Text style={appStyles.textLogin}>
          {t("ACC-16", { defaultValue: "Confirm Password" })}
        </Text>
        <View style={appStyles.inputPassConteiner}>
          <TextInput
            style={appStyles.inputPass}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={appStyles.viewPassButton}
            onPress={() => setShowConfirmPassword((current) => !current)}
          >
            <Feather
              name={showConfirmPassword ? "eye" : "eye-off"}
              size={22}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>

        <View>
          {passwordRequirements.map((requirement) => (
            <View key={requirement.label} style={appStyles.passwordRequirement}>
              {requirement.valid ? (
                <Feather name="check" color={colors.success} size={16} />
              ) : (
                <Feather name="x" color={colors.textError} size={16} />
              )}

              <Text style={appStyles.passwordRequirementText}>
                {requirement.label}
              </Text>
            </View>
          ))}
        </View>
        <Text></Text>
        <TouchableOpacity style={appStyles.button} onPress={handleCode}>
          {loading ? (
            <ActivityIndicator color="{colors.primary}" />
          ) : (
            <Text style={appStyles.buttonText}>
              {t("MNU-ForAdd", {
                defaultValue: "Save new Password",
              })}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={appStyles.textCenterContainer2}>
            <Text style={appStyles.textCenter2}>
              {t("MNU-ForAdd", {
                defaultValue: "Cancel and return to sign in",
              })}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View style={appStyles.textCenterContainer4}>
        <View>
          <Feather name="shield" size={30} color={colors.success} />
        </View>
        <View style={appStyles.CheckSecure}>
          <Feather name="check" size={15} color={colors.success} />
        </View>
        <Text style={appStyles.text12}>
          {t("MNU-ForAdd", {
            defaultValue:
              "This reset link is protected, can be used only once, and expires for your security.",
          })}
        </Text>
      </View>
      <Text></Text>
    </View>
  );
}
