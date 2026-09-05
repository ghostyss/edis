// src/theme/types.ts

import { TextStyle, ViewStyle } from "react-native";

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  accent: string;
  highlight: string;
  success: string;
  border: string;
  textError: string;
  buttontext: string;
  BorderButton: string;
  secundary: string;
}

export interface ThemeTypography {
  verse: TextStyle;
  quote: TextStyle;
  reflection: TextStyle;

  title: TextStyle;
  heading: TextStyle;
  body: TextStyle;

  button: TextStyle;
  inputLabel: TextStyle;
  Label12: TextStyle;
}

export interface ThemeSpacing {
  xs: number;

  sm: number;

  md: number;

  lg: number;

  xl: number;

  xxl: number;

  xxxl: number;

  huge: number;
}

export interface ThemeRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  pill: number;
}

export interface ThemeShadows {
  card: ViewStyle;
  cardLog: ViewStyle;
}

export interface AppTheme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadows: ThemeShadows;
}
