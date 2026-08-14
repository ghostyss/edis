import { StyleSheet } from "react-native";

import { ThemeColors, ThemeSpacing } from "../../theme/types";

export const createStyles = (colors: ThemeColors, spacing: ThemeSpacing) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.md,
      position: "absolute",
      top: 0,
      right: 10,
      zIndex: 1,
      elevation: 5,
    },

    label: {
      color: colors.text,
    },
  });
