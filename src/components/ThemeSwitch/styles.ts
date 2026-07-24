import { StyleSheet } from 'react-native';

import { ThemeColors, ThemeSpacing } from '../../theme/types';

export const createStyles = (
    colors: ThemeColors,
    spacing: ThemeSpacing,
) =>
    StyleSheet.create({

        container: {

            flexDirection: 'row',

            alignItems: 'center',

            justifyContent: 'space-between',

            paddingVertical: spacing.md,

        },

        label: {

            color: colors.text,

        },

    });