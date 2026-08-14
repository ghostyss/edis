import { useMemo } from 'react';

import { useThemeContext } from '../context/ThemeContext';
import { Themes } from '../theme';
import { createGlobalStyles } from '../theme/globalStyles';

export function useAppTheme() {

    const {

        mode,

        isDark,

        toggleTheme,

        setTheme,

    } = useThemeContext();

    const theme = useMemo(
        () => Themes[mode],
        [mode]
    );

    const styles = useMemo(
        () => createGlobalStyles(theme),
        [theme]
    );

    return {

        mode,

        isDark,

        toggleTheme,

        setTheme,

        styles,

        colors: theme.colors,

        typography: theme.typography,

        spacing: theme.spacing,

        radius: theme.radius,

        shadows: theme.shadows,

    };

}