import React, { useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthContext } from "../../context/AuthContext";

export default function DashboardHome() {
  const { t } = useTranslation();
  const { styles: appStyles, colors } = useAppTheme();
  const { user } = useAuthContext();
  const [containerSize, setContainerSize] = useState(0);
  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize(Math.min(width, height));
  }

  return (
    <View>
      <Text style={appStyles.headerTitle} numberOfLines={1}>
        {t("DSH-135", {
          defaultValue: "Welcome Back {nameuser}",
        }).replace(/\{nameuser\}/g, user?.name ?? "")}
      </Text>
      <Text style={appStyles.text1} numberOfLines={1}>
        {user?.ChurchName}
      </Text>
      <Text></Text>
      <Text style={appStyles.headerSubtitle3} numberOfLines={1}>
        {t("DSH-ForAdd", {
          defaultValue: "Your Ministry",
        })}
      </Text>
      <Text></Text>
      <View style={appStyles.rowcontent}>
        <View style={appStyles.col2p}>
          <View style={appStyles.CardView}>
            <View style={appStyles.rowcontent}>
              <View style={appStyles.col1}>
                <View style={appStyles.IconRound} onLayout={handleLayout}>
                  <Feather name="user" size={32} color={colors.text} />
                </View>
              </View>
              <View style={appStyles.col3}>
                <Text style={appStyles.NumberBox}>1</Text>
                <Text style={appStyles.LetterBox}>
                  {t("DSH-ForAdd", {
                    defaultValue: "Disciples",
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={appStyles.col2p}>
          <View style={appStyles.CardView}>
            <View style={appStyles.rowcontent}>
              <View style={appStyles.col1}>
                <View style={appStyles.IconRound} onLayout={handleLayout}>
                  <Feather name="users" size={32} color={colors.text} />
                </View>
              </View>
              <View style={appStyles.col3}>
                <Text style={appStyles.NumberBox}>1</Text>
                <Text style={appStyles.LetterBox}>
                  {t("DSH-ForAdd", {
                    defaultValue: "Groups",
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
