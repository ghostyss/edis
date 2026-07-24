// /src/theme/styles.ts
import { StyleSheet } from 'react-native';

export const Theme = {
  fonts: {
    serif: 'Lora_400Regular',
    serifBold: 'Lora_700Bold',
    sans: 'Inter_400Regular',
    sansBold: 'Inter_600SemiBold',
    sizeTitle: 22,
    sizeBody: 14,
    sizeSmall: 13,
  },
  modes: {
    claro: {
      background: '#F5F2E7',
      text: '#0B0A0A',
      buttonBg: '#605147',
      buttonText: '#F5F2E7',
      accent: '#D4CAA6',
      highlight: '#E3965D',
      completed: '#358A1B',
      border: '#B2A79A',
      cardBg: '#FCFAF2',
    },
    oscuro: {
      background: '#1A1A1E',
      text: '#EAE5DB',
      buttonBg: '#605147',
      buttonText: '#EAE5DB',
      accent: '#D4CAA6',
      highlight: '#E3965D',
      completed: '#358A1B',
      border: '#3A3A3E',
      cardBg: '#252529',
    }
  },
  roundness: 10
};

export const getGlobalStyles = (mode: 'claro' | 'oscuro') => {
  const colors = Theme.modes[mode];

  return StyleSheet.create({
    centeredContainer: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    card: {
      backgroundColor: colors.cardBg,
      borderColor: colors.border,
      width: '85%',
      maxWidth: 380,
      padding: 24,
      borderRadius: Theme.roundness,
      borderWidth: 1,
    },
    titlePremium: {
      fontFamily: Theme.fonts.serifBold,
      fontSize: Theme.fonts.sizeTitle,
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    errorText: {
      fontFamily: Theme.fonts.sans,
      color: '#ef4444',
      marginBottom: 12,
      textAlign: 'center',
      fontSize: Theme.fonts.sizeSmall,
    },
    inputField: {
      fontFamily: Theme.fonts.sans,
      backgroundColor: mode === 'claro' ? '#FFFFFF' : '#2A2A2E',
      borderColor: colors.border,
      color: colors.text,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      fontSize: Theme.fonts.sizeBody,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: mode === 'claro' ? '#FFFFFF' : '#2A2A2E',
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 16,
      position: 'relative',
    },
    passwordInput: {
      flex: 1,
      fontFamily: Theme.fonts.sans,
      color: colors.text,
      padding: 12,
      paddingRight: 45,
      fontSize: Theme.fonts.sizeBody,
    },
    viewPassButton: {
      position: 'absolute',
      right: 12,
      height: '100%',
      justifyContent: 'center',
    },
    buttonPrimary: {
      backgroundColor: colors.buttonBg,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonPrimaryText: {
      fontFamily: Theme.fonts.sansBold,
      color: colors.buttonText,
      fontSize: 15,
    },
    langContainer: {
      flexDirection: 'row',
      marginBottom: 24,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    langLink: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginHorizontal: 4,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    langText: {
      fontFamily: Theme.fonts.sans,
      fontSize: Theme.fonts.sizeSmall,
      color: colors.text,
    }
  });
};