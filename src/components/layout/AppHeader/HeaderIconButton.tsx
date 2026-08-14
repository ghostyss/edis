import React, { ReactNode } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";

interface Props {
  children: ReactNode;

  onPress?: () => void;

  badge?: number;

  visible?: boolean;
}

export default function HeaderIconButton({
  children,
  onPress,
  badge,
  visible = true,
}: Props) {
  const { styles: appStyles } = useAppTheme();

  if (!visible) return null;

  return (
    <TouchableOpacity
      style={[appStyles.iconButton, appStyles.iconButtonSpacing]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {children}

      {badge !== undefined && badge > 0 && (
        <View style={appStyles.badge}>
          <Text style={appStyles.badgeText}>{badge > 99 ? "99+" : badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
