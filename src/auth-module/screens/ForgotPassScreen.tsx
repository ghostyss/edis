import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAppTheme } from "../../hooks/useAppTheme";
import { RootStackParamList } from "../../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPass"
>;

export default function ForgotPassScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { t } = useTranslation();
  const { styles: appStyles, colors } = useAppTheme();

  return (
    <View style={appStyles.containerApp}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={22} color={colors.text} />

        <Text>
          {t("MNU-216", {
            defaultValue: "Back to login",
          })}
        </Text>
      </TouchableOpacity>

      <View style={appStyles.cardLogin}>
        <Text style={appStyles.headerTitleLogin}>
          {t("MNU-213", {
            defaultValue: "Forgot Password",
          })}
        </Text>

        <Text style={appStyles.headerSubtitle}>
          {t("MNU-214", {
            defaultValue: "Enter your email to reset your password.",
          })}
        </Text>
      </View>
    </View>
  );
}
