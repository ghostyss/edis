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
    text2: {
      ...theme.typography.inputLabel,
      color: theme.colors.text,
    },
    text12: {
      ...theme.typography.Label12,
      color: theme.colors.text,
      paddingLeft: theme.spacing.sm,
    },

    textLogin: {
      ...theme.typography.body,
      color: theme.colors.text,
      paddingLeft: "3%",
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
    cardLogin: {
      width: "90%",
      marginLeft: "1%",
      marginRight: "1%",
      maxWidth: 500,
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.lg,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
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
    buttonB: {
      backgroundColor: theme.colors.buttontext,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xxl,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.colors.BorderButton,
      borderWidth: 1,
      flexDirection: "row",
    },

    buttonDisabled: {
      opacity: 0.6,
    },

    buttonText: {
      ...theme.typography.button,
      color: theme.colors.buttontext,
    },
    buttonTextB: {
      ...theme.typography.button,
      color: theme.colors.text,
    },
    /*------Others------ */
    LogoLogin: {
      width: "100%",
      height: 120,
      justifyContent: "center",
      alignItems: "center",
      maxWidth: 400,
    },
    logoImage: {
      width: "90%",
      height: "100%",
      //objectFit: "cover",
    },
    TextError: {
      color: theme.colors.textError,
      marginBottom: 12,
      textAlign: "center",
    },
    TextForgot: {
      color: theme.colors.highlight,
      marginBottom: 20,
      marginTop: -5,
      textAlign: "right",
    },
    input: {
      backgroundColor: "#f9fafb",
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 12,
      borderRadius: theme.radius.sm,
      marginBottom: 12,
      flex: 1,
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
    inputMail: {
      flex: 1,
      padding: 12,
      paddingLeft: 45,
      fontFamily: theme.typography.inputLabel.fontFamily,
      fontSize: theme.typography.inputLabel.fontSize,
    },

    viewPassButton: {
      position: "absolute",
      right: 12,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    iconmail: {
      position: "absolute",
      left: 12,
      top: 12,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      color: "#9ca3af",
    },
    /* ---------- Header ---------- */

    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    headerActions: {
      flexDirection: "row",
      alignItems: "center",
    },

    headerLogo: {
      ...theme.typography.title,
      color: theme.colors.primary,
    },
    headerLogoImg: {
      width: 150,
      height: "100%",
    },

    headerTitle: {
      ...theme.typography.title,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
    },

    headerTitleLogin: {
      ...theme.typography.title,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
      paddingLeft: "3%",
    },
    headerTitleLoginB: {
      ...theme.typography.heading,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
      paddingLeft: "3%",
    },
    headerTitleLogin2: {
      ...theme.typography.title,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
      paddingLeft: "3%",
      textAlign: "center",
    },

    headerSubtitle: {
      ...theme.typography.body,
      color: theme.colors.text,
      opacity: 0.75,
      marginTop: theme.spacing.xs,
      paddingLeft: "3%",
    },
    headerSubtitle2: {
      ...theme.typography.body,
      color: theme.colors.text,
      opacity: 0.75,
      marginTop: theme.spacing.xs,
      paddingLeft: "3%",
      textAlign: "center",
    },
    /* ---------- Icons ---------- */

    iconButton: {
      width: 42,
      height: 42,
      justifyContent: "center",
      alignItems: "center",
    },

    iconButtonSpacing: {
      marginLeft: theme.spacing.sm,
    },
    /* ---------- Badges ---------- */

    badge: {
      position: "absolute",
      right: 2,
      top: 2,

      minWidth: 18,
      height: 18,

      borderRadius: theme.radius.pill,

      backgroundColor: theme.colors.highlight,

      justifyContent: "center",
      alignItems: "center",
    },

    badgeText: {
      fontSize: 10,
      fontWeight: "700",
      color: theme.colors.text,
    },
    /* header menu */
    headerMenuOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.35)",
      alignItems: "flex-start",
    },
    headerMenu: {
      marginTop: 60,
      marginLeft: theme.spacing.sm,
      minWidth: 240,
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.card,
      paddingVertical: theme.spacing.xs,
    },
    headerMenuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    headerMenuItemIcon: { marginRight: theme.spacing.md },
    headerMenuItemText: { ...theme.typography.body, color: theme.colors.text },
    /* ---------- Language Selector ---------- */

    languageSelectorContainer: {
      position: "absolute",
      top: 20,
      right: 20,
      zIndex: 100,
    },

    languageSelector: {
      minWidth: 100,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: theme.colors.success,
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.background,
    },

    languageSelectorText: {
      ...theme.typography.body,
      color: theme.colors.success,
      marginLeft: 8,
      fontSize: 12,
    },

    languageSelectorOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },

    languageSelectorMenu: {
      position: "absolute",
      top: 60,
      right: 20,
      minWidth: 180,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      ...theme.shadows.card,
    },

    languageSelectorItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },

    languageSelectorItemText: {
      ...theme.typography.body,
      color: theme.colors.text,
    },

    languageSelectorItemActive: {
      color: theme.colors.primary,
      fontWeight: "700",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    textCenterContainer: {
      alignItems: "center",
      width: "100%",
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xs,
    },
    textCenterContainer2: {
      alignItems: "center",
      width: "100%",
      marginTop: theme.spacing.xs,
      marginBottom: theme.spacing.md,
    },
    textCenterContainer3: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xs,
    },
    textCenterContainer4: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: theme.spacing.xl,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xs,
      paddingHorizontal: theme.spacing.xl,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    textCenter: {
      ...theme.typography.inputLabel,
      color: theme.colors.text,
      marginHorizontal: theme.spacing.md,
      textAlign: "center",
    },
    textCenter2: {
      ...theme.typography.body,
      color: theme.colors.highlight,
      marginHorizontal: theme.spacing.md,
      textAlign: "center",
    },
    dividerText: {
      ...theme.typography.body,
      color: theme.colors.text,
      marginHorizontal: theme.spacing.md,
    },
    mailCheckIcon: {
      position: "relative",
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    forgotIcon: {
      position: "relative",
      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
      left: "38%",
    },
    secureBadge: {
      position: "absolute",
      right: -2,
      bottom: -2,
      width: 38,
      height: 39,
      borderRadius: 6,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    mailCheckBadge: {
      position: "absolute",
      right: -2,
      bottom: -2,
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    CheckSecure: {
      position: "absolute",
      left: 14,
      top: 8,
      width: 15,
      height: 15,
    },
    codeInputContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: theme.spacing.lg,
    },

    codeInput: {
      flex: 1,
      height: 64,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
    },
    resendContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing.sm,
      marginBottom: theme.spacing.lg,
    },

    resendRight: {
      flex: 1,
      alignItems: "flex-end",
      paddingRight: theme.spacing.md,
    },

    resendLeft: {
      flex: 2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },

    resendText: {
      ...theme.typography.body,
      color: theme.colors.text,
      textAlign: "left",
    },

    resendTimer: {
      ...theme.typography.body,
      color: theme.colors.text,
      marginRight: theme.spacing.xs,
    },

    resendButton: {
      ...theme.typography.body,
      color: theme.colors.primary,
      fontWeight: "700",
    },

    resendButtonDisabled: {
      color: theme.colors.accent,
    },
  });
