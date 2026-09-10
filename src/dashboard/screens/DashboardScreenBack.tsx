import React, { useState } from "react";
import { View, TouchableOpacity, Modal, ScrollView } from "react-native";

import { useTranslation } from "react-i18next";

import { useAppTheme } from "../../hooks/useAppTheme";
import { useNetworkContext } from "../../context/NetworkContext";
import { useAuthContext } from "../../context/AuthContext";

import AppHeader from "../../components/layout/AppHeader/AppHeader";
import AppFooter from "../../components/layout/AppFooter/AppFooter";

export default function DashboardScreen() {
  const { styles: appStyles } = useAppTheme();
  const [headerTitle, setHeaderTitle] = useState("Home");
  const [activeTab, setActiveTab] = useState("home");
  const { t } = useTranslation();
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const { isOnline } = useNetworkContext();

  const { user } = useAuthContext();
  function onHomePress() {
    setActiveTab("home");
    setHeaderTitle("Home");
    console.log("h");
  }

  function onPeoplePress() {
    setActiveTab("people");
    setHeaderTitle("People");
    console.log("p");
  }

  function onGroupsPress() {
    setActiveTab("groups");
    setHeaderTitle("Groups");
  }

  function onStudyPress() {
    setActiveTab("study");
    setHeaderTitle("Study");
  }

  function onMorePress() {
    setActiveTab("more");
    //setHeaderTitle("More");
    setMoreMenuVisible(true);
  }
  return (
    <View style={appStyles.screen}>
      <AppHeader
        /*title={`${t("MSJ-500")}, ${user?.name ?? ""}`}*/
        title={headerTitle}
        notifications={3}
        cart={2}
      />

      <View style={appStyles.container}>{/* Aquí irá el DashboardHome */}</View>

      {/* Aquí irá el AppBottomTabs */}
      <AppFooter
        activeTab={activeTab}
        onHomePress={onHomePress}
        onPeoplePress={onPeoplePress}
        onGroupsPress={onGroupsPress}
        onStudyPress={onStudyPress}
        onMorePress={onMorePress}
      />
      <Modal
        visible={moreMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMoreMenuVisible(false)}
      >
        <View style={appStyles.moreMenuOverlay}>
          <TouchableOpacity
            style={appStyles.moreMenuBackdrop}
            activeOpacity={1}
            onPress={() => setMoreMenuVisible(false)}
          />

          <View style={appStyles.moreMenu}>
            <ScrollView
              contentContainerStyle={appStyles.moreMenuContent}
              showsVerticalScrollIndicator={false}
            >
              {/* elementos del menú */}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
