// src/theme/globalStyles.ts

import { StyleSheet } from "react-native";
import { AppTheme } from "./types";

export const createGlobalStyles = (theme: AppTheme) =>
  StyleSheet.create({
    /* ---------- Layout ---------- */

    flex: {
      flex: 1,
    },

    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    container: {
      flex: 1,
      padding: theme.spacing.md,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
    },

    column: {
      flexDirection: "column",
    },

    center: {
      justifyContent: "center",
      alignItems: "center",
    },

    spaceBetween: {
      justifyContent: "space-between",
    },
    containerApp: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    containerLang: {
      flexDirection: "row",
      marginBottom: 20,
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 16,
      maxWidth: 500,
      width: "90%",
      backgroundColor: theme.colors.background,
    },
    buttonLang: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginHorizontal: 4,
      borderRadius: 4,
      backgroundColor: theme.colors.background,
      minWidth: "20%",
      marginBottom: 8,
      alignItems: "center",
    },
    buttonLangActive: {
      backgroundColor: theme.colors.highlight,
    },
    TextLang: {
      fontSize: theme.typography.inputLabel.fontSize,
      color: theme.colors.text,
    },
    title1: {
      ...theme.typography.title,
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 16,
    },
    text1: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
    /* ---------- Cards ---------- */

    card: {
      width: "90%",
      maxWidth: 500,
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.card,
    },

    /* ---------- Dividers ---------- */

    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.md,
    },
    /* ---------- Buttons ---------- */

    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xxl,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonDisabled: {
      opacity: 0.6,
    },

    buttonText: {
      ...theme.typography.button,
      color: theme.colors.text,
    },
    /*------Others------ */
    LogoLogin: {
      width: "90%",
      height: 150,
      marginBottom: 14,
      justifyContent: "center",
      alignItems: "center",
      maxWidth: 400,
    },
    TextError: {
      color: theme.colors.textError,
      marginBottom: 12,
      textAlign: "center",
    },
    input: {
      backgroundColor: "#f9fafb",
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 12,
      borderRadius: theme.radius.sm,
      marginBottom: 12,
      fontFamily: theme.typography.inputLabel.fontFamily,
      fontSize: theme.typography.inputLabel.fontSize,
    },
    inputPassConteiner: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f9fafb",
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      marginBottom: 12,
      position: "relative",
    },
    inputPass: {
      flex: 1,
      padding: 12,
      paddingRight: 45,
      fontFamily: theme.typography.inputLabel.fontFamily,
      fontSize: theme.typography.inputLabel.fontSize,
    },
    logoImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    viewPassButton: {
      position: "absolute",
      right: 12,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
