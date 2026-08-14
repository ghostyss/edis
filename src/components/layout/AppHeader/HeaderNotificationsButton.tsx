import React from "react";
import { Feather } from "@expo/vector-icons";

import HeaderIconButton from "./HeaderIconButton";

import { useAppTheme } from "../../../hooks/useAppTheme";

interface Props {
  notifications: number;
  onPress?: () => void;
}

export default function HeaderNotificationsButton({
  notifications,
  onPress,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <HeaderIconButton badge={notifications} onPress={onPress}>
      <Feather name="bell" size={22} color={colors.text} />
    </HeaderIconButton>
  );
}
