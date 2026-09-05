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
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAppTheme } from "../../hooks/useAppTheme";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { AuthService } from "../../services/AuthService";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPass"
>;

export default function ForgotPassScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { styles: appStyles, colors } = useAppTheme();
  const route = useRoute<RouteProp<RootStackParamList, "CodePassUpdate">>();
  const { email } = route.params;
  const handleCode = async () => {
    setLoading(true);
    try {
      const response = await AuthService.GetCode(email, "update");
      console.log(response);
      if (response.code === 200) {
        navigation.navigate("CodePassUpdate", { email });
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
          <Feather name="mail" size={80} color={colors.text} />

          <View style={appStyles.secureBadge}>
            <Feather name="lock" size={40} color={colors.secundary} />
          </View>
        </View>
        <Text style={appStyles.headerTitleLogin2}>
          {t("MNU-ForAdd", {
            defaultValue: "Reset your password update",
          })}
        </Text>

        <Text style={appStyles.headerSubtitle2}>
          {t("MNU-214", {
            defaultValue: "Enter the email address you use to sign in",
          })}
        </Text>
        <Text style={appStyles.textCenter}>
          {t("MNU-214", {
            defaultValue:
              "If an account matches, we’ll send secure password-reset instructions.",
          })}
        </Text>
        <Text></Text>
        <Text style={appStyles.textLogin}>
          {t("MNU-21", { defaultValue: "Email Address" })}
        </Text>
        <View style={appStyles.inputPassConteiner}>
          <Feather style={appStyles.iconmail} name="mail" size={20} />

          <TextInput
            style={appStyles.inputMail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <TouchableOpacity style={appStyles.button} onPress={handleCode}>
          {loading ? (
            <ActivityIndicator color="{colors.primary}" />
          ) : (
            <Text style={appStyles.buttonText}>
              {t("MNU-ForAdd", {
                defaultValue: "Send reset email",
              })}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={appStyles.textCenterContainer2}>
            <Text style={appStyles.textCenter2}>
              {t("MNU-ForAdd", {
                defaultValue: "Back to sign in",
              })}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View style={appStyles.cardLogin}>
        <Text style={appStyles.headerTitleLoginB}>
          {t("MNU-ForAdd", {
            defaultValue: "Prefer not to reset your password?",
          })}
        </Text>
        <Text style={appStyles.headerSubtitle2}>
          {t("MNU-214", {
            defaultValue: "Use a six-digit email code to sign in instead.",
          })}
        </Text>
        <Text></Text>
        <TouchableOpacity
          style={appStyles.buttonB}
          //onPress={handleLogin}
        >
          <View style={appStyles.mailCheckIcon}>
            <Feather name="mail" size={24} color={colors.text} />

            <View style={appStyles.mailCheckBadge}>
              <Feather name="check" size={8} color="#fff" />
            </View>
          </View>
          <Text style={appStyles.buttonTextB}>
            {t("MNU-ForAdd", {
              defaultValue: "Email me a one-time code",
            })}
          </Text>
        </TouchableOpacity>
      </View>
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
              "For your privacy, this screen always shows the same confirmation whether or not an account matches the email.",
          })}
        </Text>
      </View>
      <Text></Text>
    </View>
  );
}
