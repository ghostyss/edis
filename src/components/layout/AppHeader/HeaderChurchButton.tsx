import React from "react";
import { Feather } from "@expo/vector-icons";

import HeaderIconButton from "./HeaderIconButton";

import { useAppTheme } from "../../../hooks/useAppTheme";

interface Props {
  cart: number;
  onPress?: () => void;
}

export default function HeaderCartButton({ cart, onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <HeaderIconButton badge={cart} onPress={onPress}>
      <Feather name="shopping-cart" size={22} color={colors.text} />
    </HeaderIconButton>
  );
}
