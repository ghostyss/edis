import React from "react";
import { Feather } from "@expo/vector-icons";

import HeaderIconButton from "./HeaderIconButton";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { useThemeContext } from "../../../context/ThemeContext";

export default function HeaderThemeButton() {
  const { colors } = useAppTheme();

  const { isDark, toggleTheme } = useThemeContext();

  return (
    <HeaderIconButton onPress={toggleTheme}>
      <Feather name={isDark ? "sun" : "moon"} size={22} color={colors.text} />
    </HeaderIconButton>
  );
}
