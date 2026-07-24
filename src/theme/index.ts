// src/theme/index.ts

import { LightColors, DarkColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';


export const Themes = {

    light: {

        colors: LightColors,

        typography,

        spacing,

        radius,

        shadows,

    },


    dark: {

        colors: DarkColors,

        typography,

        spacing,

        radius,

        shadows,

    },

};