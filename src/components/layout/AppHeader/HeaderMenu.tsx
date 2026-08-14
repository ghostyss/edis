import React from "react";
import { Modal, Pressable, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { useAuthContext } from "../../../context/AuthContext";

interface Props {
  visible: boolean;
  onClose: () => void;
  onLogout?: () => void | Promise<void>;
}

interface MenuItemProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  onPress?: () => void | Promise<void>;
}

export default function HeaderMenu({ visible, onClose, onLogout }: Props) {
  const { styles: appStyles, colors } = useAppTheme();
  const { user } = useAuthContext();
  //console.log(user);
  function handleItemPress(onPress?: () => void | Promise<void>) {
    onClose();
    onPress?.();
  }

  function MenuItem({ icon, label, onPress }: MenuItemProps) {
    return (
      <Pressable
        style={appStyles.headerMenuItem}
        onPress={() => handleItemPress(onPress)}
      >
        <Feather
          name={icon}
          size={20}
          color={colors.text}
          style={appStyles.headerMenuItemIcon}
        />

        <Text style={appStyles.headerMenuItemText}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={appStyles.headerMenuOverlay} onPress={onClose}>
        <Pressable
          style={appStyles.headerMenu}
          onPress={(event) => event.stopPropagation()}
        >
          <MenuItem icon="user" label="My Profile" />

          {user?.isAdmin === true && (
            <MenuItem
              icon="briefcase"
              label={`View as ${user?.ChurchName || "Church Admin"}`}
            />
          )}

          <MenuItem icon="clock" label="Order History" />

          <MenuItem icon="help-circle" label="Help" />

          <MenuItem icon="lock" label="Lock Screen" />

          <MenuItem icon="log-out" label="Logout" onPress={onLogout} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
