import React from "react";
import { View } from "react-native";

import { useTranslation } from "react-i18next";

import { useAppTheme } from "../../hooks/useAppTheme";
import { useNetworkContext } from "../../context/NetworkContext";
import { useAuthContext } from "../../context/AuthContext";

import AppHeader from "../../components/layout/AppHeader/AppHeader";

export default function DashboardScreen() {
  const { styles: appStyles } = useAppTheme();

  const { t } = useTranslation();

  const { isOnline } = useNetworkContext();

  const { user } = useAuthContext();

  return (
    <View style={appStyles.screen}>
      <AppHeader
        title={`${t("MSJ-500")}, ${user?.name ?? ""}`}
        subtitle={isOnline ? t("MSJ-501") : t("MSJ-502")}
        notifications={3}
        cart={2}
      />

      <View style={appStyles.container}>{/* Aquí irá el DashboardHome */}</View>

      {/* Aquí irá el AppBottomTabs */}
    </View>
  );
}
