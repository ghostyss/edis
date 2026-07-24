import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useNetworkContext } from "../../context/NetworkContext";

export default function DashboardScreen() {
  const { styles: appStyles } = useAppTheme();
  const { isOnline, connectionType } = useNetworkContext();
  console.log(isOnline);
  console.log(connectionType);
  return (
    <View style={appStyles.screen}>
      <Text>Dashboard 2</Text>
      <Text>{isOnline ? "ONLINE" : "OFFLINE"}</Text>
    </View>
  );
}
