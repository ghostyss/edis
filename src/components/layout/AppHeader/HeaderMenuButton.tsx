import React from "react";
import { Feather } from "@expo/vector-icons";

import HeaderIconButton from "./HeaderIconButton";

import { useAppTheme } from "../../../hooks/useAppTheme";

interface Props {
  onPress?: () => void;
}

export default function HeaderMenuButton({ onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <HeaderIconButton onPress={onPress}>
      <Feather name="menu" size={24} color={colors.text} />
    </HeaderIconButton>
  );
}
