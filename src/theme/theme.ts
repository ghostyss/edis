import { useColorScheme } from 'react-native';

import { LightColors, DarkColors } from './colors';

export function useAppTheme() {
  const scheme = useColorScheme();

  return scheme === 'dark'
    ? DarkColors
    : LightColors;
}