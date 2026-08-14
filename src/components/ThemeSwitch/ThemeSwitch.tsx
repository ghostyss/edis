import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Switch } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createStyles } from "./styles";

export default function ThemeSwitch() {
  const { t } = useTranslation();
  const { mode, colors, typography, spacing, toggleTheme } = useAppTheme();
  const styles = createStyles(colors, spacing);
  return (
    <View style={styles.container}>
      <Text style={[typography.body, styles.label]}>
        {mode === "light" ? "☀️ " : "🌙 "}
      </Text>
      <Switch
        value={mode === "dark"}
        onValueChange={toggleTheme}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor={colors.accent}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}
