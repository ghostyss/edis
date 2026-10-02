import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthContext } from "../../context/AuthContext";

export default function DashboardHome() {
  const { t } = useTranslation();
  const { styles: appStyles } = useAppTheme();
  const { user } = useAuthContext();
  return (
    <View>
      <Text style={appStyles.headerTitle} numberOfLines={1}>
        {t("DSH-135", {
          defaultValue: "Welcome Back {nameuser}",
        }).replace(/\{nameuser\}/g, user?.name ?? "")}
      </Text>
    </View>
  );
}
