import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../auth-module/screens/LoginScreen";
import ForgotPassScreen from "../auth-module/screens/ForgotPassScreen";
import DashboardScreen from "../dashboard/screens/DashboardScreen";

export type RootStackParamList = {
  Login: undefined;
  ForgotPass: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  isAuthenticated: boolean;
}

export default function AppNavigator({ isAuthenticated }: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
