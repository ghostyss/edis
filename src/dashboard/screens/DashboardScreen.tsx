import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Text,
  Image,
} from "react-native";

import { useTranslation } from "react-i18next";

import { useAppTheme } from "../../hooks/useAppTheme";
import { useNetworkContext } from "../../context/NetworkContext";
import { useAuthContext } from "../../context/AuthContext";

import AppHeader from "../../components/layout/AppHeader/AppHeader";
import AppFooter from "../../components/layout/AppFooter/AppFooter";
import { Feather } from "@expo/vector-icons";
const DEFAULT_DISCIPLE = require("../../assets/images/disciple.png");
const DEFAULT_TEACHER = require("../../assets/images/dmaker.png");
const DEFAULT_COMMUNITY = require("../../assets/images/community.png");

export default function DashboardScreen() {
  const { styles: appStyles, colors } = useAppTheme();
  const [headerTitle, setHeaderTitle] = useState("Home");
  const [activeTab, setActiveTab] = useState("home");
  const { t } = useTranslation();
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const { isOnline } = useNetworkContext();

  const { user } = useAuthContext();
  console.log(user);
  /**/

  const notificationsCount = 3;
  const invitationsCount = 2;

  function onNotificationsPress() {
    console.log("Notifications");
  }

  function onInvitationsPress() {
    console.log("Invitations & Requests");
  }

  function onResourcesPress() {
    console.log("Resources");
  }

  function onVideosPress() {
    console.log("Videos");
  }

  function onPurchasesPress() {
    console.log("Purchases & Orders");
  }

  function onHelpPress() {
    console.log("Help & Security");
  }

  function onSignOutPress() {
    console.log("Sign Out");
  }
  /* */
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
  const capitalizeWords = (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };
  function getUserTypeLabel(adminType: string) {
    switch (adminType) {
      case "Admin":
      case "Teacher":
        return t("MNU-20", {
          defaultValue: "Teacher",
        });

      case "Student":
        return t("DSH-156", {
          defaultValue: "Disciple",
        });

      case "Church":
        return t("ACC-43", {
          defaultValue: "Community",
        });

      default:
        return "";
    }
  }
  function getUserTypeText(adminType: string) {
    switch (adminType) {
      case "Admin":
      case "Teacher":
        return t("MNU-ForAdd", {
          defaultValue: "Personal Ministry View",
        });

      case "Student":
        return t("MNU-ForAdd", {
          defaultValue: "Personal Ministry View",
        });

      case "Church":
        return t("MNU-ForAdd", {
          defaultValue: "Community View",
        });

      default:
        return "";
    }
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
              <View style={appStyles.HeaderMenuA}>
                <View style={appStyles.LogoUser}>
                  <Image
                    source={DEFAULT_TEACHER}
                    style={appStyles.ImageUser}
                    resizeMode="contain"
                  />
                </View>
                <View style={appStyles.HeaderTextMenu}>
                  <Text style={appStyles.MenuTitle}>
                    {user ? capitalizeWords(user.name) : "User Name"}
                  </Text>
                  <Text style={appStyles.MenuSubTitle}>
                    {user ? getUserTypeLabel(user.AdminType) : "User Type"}
                  </Text>
                  <Text>
                    {t("MNU-Foradd", {
                      defaultValue: "Tap photo to view profile",
                    })}
                  </Text>
                </View>
              </View>

              <View style={appStyles.HeaderMenuB}>
                <View style={appStyles.LogoComm}>
                  <Image
                    source={DEFAULT_DISCIPLE}
                    style={appStyles.ImageUser}
                    resizeMode="contain"
                  />
                </View>
                <View style={appStyles.HeaderTextMenu2}>
                  <Text style={appStyles.MenuSubTitle}>
                    {user ? getUserTypeLabel(user.AdminType) : "User Type"}
                  </Text>
                  <Text>
                    {user ? getUserTypeText(user.AdminType) : "User Type"}
                  </Text>
                  <View style={appStyles.CheckCenter}>
                    <Feather name="check" size={15} color={colors.success} />
                  </View>
                </View>
              </View>
              <Text></Text>
              <TouchableOpacity
                style={appStyles.TouchableOpacitySwitch}
                //onPress={() => LoginComm(!ocultarPassword)}
              >
                <View style={appStyles.HeaderMenuC}>
                  <View style={appStyles.CheckCenterLeft}>
                    <Feather name="repeat" size={20} color={colors.primary} />
                  </View>
                  <Text style={appStyles.MenuSubTitle2}>
                    {t("MNU-Foradd", {
                      defaultValue: "Switch to Community Admin View",
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text></Text>
              <View style={appStyles.HeaderMenuC}>
                <Text style={appStyles.MenuSubTitle2}>
                  {t("MNU-Foradd", {
                    defaultValue: "Current Community",
                  })}
                </Text>
              </View>
              <View style={appStyles.HeaderMenuB}>
                <View style={appStyles.LogoComm}>
                  <Image
                    source={DEFAULT_COMMUNITY}
                    style={appStyles.ImageUser}
                    resizeMode="contain"
                  />
                </View>
                <View style={appStyles.HeaderTextMenu2}>
                  <Text style={appStyles.MenuSubTitle}>
                    {user ? user.ChurchName : "Church Name"}
                  </Text>
                  <TouchableOpacity
                    style={appStyles.TouchableOpacitySwitch}
                    //onPress={() => LoginComm(!ocultarPassword)}
                  >
                    <Text style={appStyles.MenuText3}>
                      {t("MNU-Foradd", {
                        defaultValue: "Switch Community",
                      })}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text></Text>
              <TouchableOpacity
                style={appStyles.moreMenuItem}
                activeOpacity={0.7}
                onPress={onNotificationsPress}
              >
                <View style={appStyles.moreMenuItemIcon}>
                  <Feather
                    name="bell"
                    size={21}
                    style={appStyles.moreMenuIcon}
                  />
                </View>

                <View style={appStyles.moreMenuItemTextContainer}>
                  <Text style={appStyles.moreMenuItemText}>Notifications</Text>
                </View>

                <View style={appStyles.moreMenuItemBadgeContainer}>
                  {notificationsCount > 0 && (
                    <View style={appStyles.moreMenuBadge}>
                      <Text style={appStyles.moreMenuBadgeText}>
                        {notificationsCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={appStyles.moreMenuItem}
                activeOpacity={0.7}
                onPress={onInvitationsPress}
              >
                <View style={appStyles.moreMenuItemIcon}>
                  <Feather
                    name="user-plus"
                    size={21}
                    style={appStyles.moreMenuIcon}
                  />
                </View>

                <View style={appStyles.moreMenuItemTextContainer}>
                  <Text style={appStyles.moreMenuItemText}>
                    Invitations & Requests
                  </Text>
                </View>

                <View style={appStyles.moreMenuItemBadgeContainer}>
                  {invitationsCount > 0 && (
                    <View style={appStyles.moreMenuBadge}>
                      <Text style={appStyles.moreMenuBadgeText}>
                        {invitationsCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={appStyles.moreMenuItem}
                activeOpacity={0.7}
                onPress={onResourcesPress}
              >
                <View style={appStyles.moreMenuItemIcon}>
                  <Feather
                    name="book-open"
                    size={21}
                    style={appStyles.moreMenuIcon}
                  />
                </View>

                <View style={appStyles.moreMenuItemTextContainer}>
                  <Text style={appStyles.moreMenuItemText}>Resources</Text>
                </View>

                <View style={appStyles.moreMenuItemBadgeContainer} />
              </TouchableOpacity>

              <TouchableOpacity
                style={appStyles.moreMenuItem}
                activeOpacity={0.7}
                onPress={onVideosPress}
              >
                <View style={appStyles.moreMenuItemIcon}>
                  <Feather
                    name="video"
                    size={21}
                    style={appStyles.moreMenuIcon}
                  />
                </View>

                <View style={appStyles.moreMenuItemTextContainer}>
                  <Text style={appStyles.moreMenuItemText}>Videos</Text>
                </View>

                <View style={appStyles.moreMenuItemBadgeContainer} />
              </TouchableOpacity>

              <TouchableOpacity
                style={appStyles.moreMenuItem}
                activeOpacity={0.7}
                onPress={onPurchasesPress}
              >
                <View style={appStyles.moreMenuItemIcon}>
                  <Feather
                    name="shopping-bag"
                    size={21}
                    style={appStyles.moreMenuIcon}
                  />
                </View>

                <View style={appStyles.moreMenuItemTextContainer}>
                  <Text style={appStyles.moreMenuItemText}>
                    Purchases & Orders
                  </Text>
                </View>

                <View style={appStyles.moreMenuItemBadgeContainer} />
              </TouchableOpacity>

              <TouchableOpacity
                style={appStyles.moreMenuItem}
                activeOpacity={0.7}
                onPress={onHelpPress}
              >
                <View style={appStyles.moreMenuItemIcon}>
                  <Feather
                    name="help-circle"
                    size={21}
                    style={appStyles.moreMenuIcon}
                  />
                </View>

                <View style={appStyles.moreMenuItemTextContainer}>
                  <Text style={appStyles.moreMenuItemText}>
                    Help & Security
                  </Text>
                </View>

                <View style={appStyles.moreMenuItemBadgeContainer} />
              </TouchableOpacity>

              <TouchableOpacity
                style={appStyles.moreMenuItem}
                activeOpacity={0.7}
                onPress={onSignOutPress}
              >
                <View style={appStyles.moreMenuItemIcon}>
                  <Feather
                    name="log-out"
                    size={21}
                    style={appStyles.moreMenuIcon}
                  />
                </View>

                <View style={appStyles.moreMenuItemTextContainer}>
                  <Text style={appStyles.moreMenuItemText}>Sign Out</Text>
                </View>

                <View style={appStyles.moreMenuItemBadgeContainer} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
