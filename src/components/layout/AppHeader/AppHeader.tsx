import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { useAuthContext } from "../../../context/AuthContext";

import HeaderMenuButton from "./HeaderMenuButton";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderNotificationsButton from "./HeaderNotificationsButton";
import HeaderCartButton from "./HeaderCartButton";

interface Props {
  title?: string;
  subtitle?: string;

  notifications?: number;
  cart?: number;

  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onCartPress?: () => void;
}

export default function AppHeader({
  title,
  subtitle,
  notifications = 0,
  cart = 0,
  onMenuPress,
  onNotificationPress,
  onCartPress,
}: Props) {
  const { t } = useTranslation();
  const { styles: appStyles } = useAppTheme();
  const { logout } = useAuthContext();
  const [menuVisible, setMenuVisible] = useState(false);

  function handleMenuPress() {
    setMenuVisible(true);
    onMenuPress?.();
  }

  function handleMenuClose() {
    setMenuVisible(false);
  }
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("HEADER LOGOUT:", error);
    }
  }
  return (
    <>
      <View style={appStyles.header}>
        <View style={appStyles.headerRow}>
          <HeaderMenuButton onPress={handleMenuPress} />

          <HeaderLogo />

          <View style={appStyles.headerActions}>
            <HeaderNotificationsButton
              count={notifications}
              onPress={onNotificationPress}
            />

            <HeaderCartButton count={cart} onPress={onCartPress} />
          </View>
        </View>

        {(title || subtitle) && (
          <View>
            {title && <Text style={appStyles.headerTitle}>{title}</Text>}

            {subtitle && (
              <Text style={appStyles.headerSubtitle}>{subtitle}</Text>
            )}
          </View>
        )}
      </View>

      <HeaderMenu
        visible={menuVisible}
        onClose={handleMenuClose}
        onLogout={handleLogout}
      />
    </>
  );
}
