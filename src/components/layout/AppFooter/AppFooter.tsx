import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../../hooks/useAppTheme";

interface Props {
  activeTab?: string;
  onHomePress?: () => void;
  onPeoplePress?: () => void;
  onGroupsPress?: () => void;
  onStudyPress?: () => void;
  onMorePress?: () => void;
}

export default function AppFooter({
  activeTab = "home",
  onHomePress,
  onPeoplePress,
  onGroupsPress,
  onStudyPress,
  onMorePress,
}: Props) {
  const { styles: appStyles } = useAppTheme();
  const { t } = useTranslation();
  const tabs = [
    {
      key: "home" as const,
      label: t("MNU-ForAdd", {
        defaultValue: "Home",
      }),
      icon: "home",
      iconActive: "home",
      onPress: onHomePress,
    },
    {
      key: "people" as const,
      label: t("MNU-ForAdd", {
        defaultValue: "People",
      }),
      icon: "user",
      iconActive: "person",
      onPress: onPeoplePress,
    },
    {
      key: "groups" as const,
      label: t("MNU-ForAdd", {
        defaultValue: "Groups",
      }),
      icon: "users",
      iconActive: "groups",
      onPress: onGroupsPress,
    },
    {
      key: "study" as const,
      label: t("MNU-ForAdd", {
        defaultValue: "Study",
      }),
      icon: "book-open",
      iconActive: "menu-book",
      onPress: onStudyPress,
    },
    {
      key: "more" as const,
      label: t("MNU-ForAdd", {
        defaultValue: "More",
      }),
      icon: "more-horizontal",
      iconActive: "more-horiz",
      onPress: onMorePress,
    },
  ];

  return (
    <View style={appStyles.footer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[appStyles.footerTab, isActive && appStyles.footerTabActive]}
            onPress={tab.onPress}
            activeOpacity={0.7}
          >
            {isActive ? (
              <MaterialIcons
                name={isActive ? tab.iconActive : tab.icon}
                size={25}
                style={
                  isActive ? appStyles.footerIconActive : appStyles.footerIcon
                }
              />
            ) : (
              <Feather
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                style={
                  isActive ? appStyles.footerIconActive : appStyles.footerIcon
                }
              />
            )}
            <Text
              style={
                isActive ? appStyles.footerLabelActive : appStyles.footerLabel
              }
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
