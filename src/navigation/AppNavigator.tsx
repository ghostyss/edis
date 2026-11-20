import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../auth-module/screens/LoginScreen";
import ForgotPassScreen from "../auth-module/screens/ForgotPassScreen";
import CodePassScreen from "../auth-module/screens/CodePassScreen";
import CodePassScreenUpdate from "../auth-module/screens/CodePassScreenUpdate";
import PassScreenUpdate from "../auth-module/screens/UpdatePassScreen";
import DashboardScreen from "../dashboard/screens/DashboardScreen";
import Material from "../components/material/Material";

export type RootStackParamList = {
  Login: undefined;
  ForgotPass: undefined;
  CodePass: {
    email: string;
  };
  CodePassUpdate: {
    email: string;
  };
  PassUpdate: {
    token: string;
  };
  Dashboard: undefined;
  Material: {
    courseId: number;
    courseName: string;
    chapters?: Array<{ id: string | number; name: string }>;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  isAuthenticated: boolean;
}

const decodeBase64 = (value: string): string => {
  try {
    return atob(value);
  } catch {
    return value;
  }
};

const linking = {
  prefixes: ["edis://", "https://e-disciple.com", "https://www.e-disciple.com"],
  config: {
    screens: {
      PassUpdate: {
        path: "reset-password",
        parse: {
          token: (token: string) => decodeBase64(token),
        },
      },
    },
  },
};

export default function AppNavigator({ isAuthenticated }: Props) {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Material" component={Material} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />

            <Stack.Screen name="CodePass" component={CodePassScreen} />

            <Stack.Screen
              name="CodePassUpdate"
              component={CodePassScreenUpdate}
            />

            <Stack.Screen name="PassUpdate" component={PassScreenUpdate} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
