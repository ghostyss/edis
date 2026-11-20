import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  LayoutChangeEvent,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { GetDataService } from "../../services/GetDataService";
import Avatar from "../../dashboard/screens/Avatar";
import Banner from "../../dashboard/screens/Banner";
import LoadingSpinner from "../Loading/LoadingSpinner";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type DashboardData = Record<string, unknown>;
type Notif = Record<string, unknown>;
//const ACCOUNT_TYPE_OPTIONS = ["Teacher", "Student", "Church"] as const;
export const ACCOUNT_TYPE_OPTIONS = [
  { key: "Basic", label: "Disciple" },
  { key: "Profesional", label: "Disciple-Maker" },
  /*{ key: "church", label: "Church" },*/
] as const;

export default function GroupHome() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { styles: appStyles, colors } = useAppTheme();
  const { user } = useAuthContext();
  const { languages } = useLanguageContext();
  const [containerSize, setContainerSize] = useState(0);
  const [search, setSearch] = useState("");
  const [inviteFormVisible, setInviteFormVisible] = useState(false);
  const [accountTypeOptionsVisible, setAccountTypeOptionsVisible] =
    useState(false);
  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    language: "",
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [data1, setData1] = useState<DashboardData>({});
  const [loading, setLoading] = useState(false);
  let count = 0;
  //const [data2, setData2] = useState<Notif>({});
  const [data2, setData2] = useState<Record<string, unknown>>({});
  const [data3, setData3] = useState("");
  const resultado = data3.split('"');
  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize(Math.min(width, height));
  }
  const Divider = () => (
    <View
      style={{
        height: 1,
        backgroundColor: colors.primary,
        width: "100%",
        marginVertical: 8,
      }}
    />
  );
  const handleGetData = async () => {
    const response = await GetDataService.GetGroups();
    //console.log(response);
    if (response.code === 200) {
      try {
        const parsedData = JSON.parse(response.data1) as DashboardData;
        //console.log(parsedData);
        //const parsedNotif = JSON.parse(response.data2) as Notif;
        setData1(parsedData);
        //console.log(data1);
        //setData2(parsedNotif);
        //setData3(response.data3);
      } catch (error) {
        console.error("No se pudo leer response.data1 como JSON:", error);
      }
    }
  };
  const handleSubmitInvite = async () => {
    const hasMissingFields = Object.values(inviteForm).some(
      (value) => !value.trim(),
    );

    if (hasMissingFields) {
      Alert.alert("Required fields", "Complete all fields before submitting.");
      return;
    }

    const email = inviteForm.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Invalid email", "Enter a valid email address.");
      return;
    }

    const inviteData = {
      language: Number(inviteForm.language),
      accountType: inviteForm.accountType,
      firstName: inviteForm.firstName,
      lastName: inviteForm.lastName,
      email,
    };

    //console.log("Invitation data:", JSON.stringify(inviteData, null, 2));
    setInviteFormVisible(false);
    setLoading(true);
    /**/
    const response = await GetDataService.NewDisciple(
      JSON.stringify(inviteData),
    );
    setLoading(false);
    console.log(response);
    if (response.code === 200) {
      try {
        /*const parsedData = JSON.parse(response.data2) as DashboardData;
        setData1(parsedData);*/
        console.log(data1);
        Alert.alert(
          "Success",
          "Invitation send Succfessfully. Check email for the invitation link.",
        );
        if (response.msj === "200") {
          handleGetData();
        }
      } catch (error) {
        console.error("No se pudo leer response.data1 como JSON:", error);
      }
    } else {
      Alert.alert(
        "Error",
        response.msj || "There was an error sending the invitation.",
      );
    }
    /**/
  };

  useEffect(() => {
    void handleGetData();
  }, []);

  const searchTerm = search.trim().toLowerCase();
  const filteredData = Object.entries(data1).filter(([key, value]) => {
    let searchableValue: unknown = value;

    if (typeof value === "string") {
      try {
        searchableValue = JSON.parse(value);
      } catch {
        // Usar el texto original si no es JSON.
      }
    }

    const name = String(
      (searchableValue as Record<string, unknown> | null)?.Name ?? "",
    ).toLowerCase();
    return name.includes(searchTerm);
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View>
      <Text style={appStyles.headerTitle} numberOfLines={2}>
        {t("DSH-ForAdd", {
          defaultValue: "Your Groups",
        })}
      </Text>
      <Text style={appStyles.text1} numberOfLines={1}>
        {t("DSH-ForAdd", {
          defaultValue: "Small groups and one-to-one relationships",
        })}
      </Text>
      <Text></Text>
      <TouchableOpacity
        style={appStyles.button}
        onPress={() => setInviteFormVisible(true)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={appStyles.buttonText}>
            <Feather
              name={"user-plus"}
              size={22}
              style={appStyles.footerIcon}
            />{" "}
            &nbsp;
            {t("MNU-ForAdd", {
              defaultValue: "Create a Group",
            })}
          </Text>
        )}
      </TouchableOpacity>
      <Modal
        visible={inviteFormVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setInviteFormVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 500,
              maxHeight: "90%",
              backgroundColor: colors.background,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text style={appStyles.headerTitle}>Invite new Disciple</Text>
              <TouchableOpacity
                onPress={() => setInviteFormVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Close invitation form"
              >
                <Feather name="x" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              {(
                [
                  ["language", "Language"],
                  ["accountType", "Account Type"],
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["email", "Email"],
                ] as const
              ).map(([key, label]) => (
                <View key={key} style={{ marginBottom: 12 }}>
                  <Text style={[appStyles.text2, { marginBottom: 4 }]}>
                    {label} *
                  </Text>
                  {key === "language" ? (
                    <>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: colors.border,
                          borderRadius: 6,
                          padding: 12,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onPress={() =>
                          setLanguageOptionsVisible((visible) => !visible)
                        }
                        accessibilityRole="button"
                      >
                        <Text
                          style={{
                            color: inviteForm.language
                              ? colors.text
                              : colors.secundary,
                          }}
                        >
                          {languages.find(
                            (language) =>
                              String(language.id) === inviteForm.language,
                          )?.name || "Select language *"}
                        </Text>
                        <Feather
                          name={
                            languageOptionsVisible
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={18}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                      {languageOptionsVisible &&
                        languages.map((language) => (
                          <TouchableOpacity
                            key={language.id}
                            style={{
                              padding: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: colors.border,
                            }}
                            onPress={() => {
                              setInviteForm((current) => ({
                                ...current,
                                language: String(language.id),
                              }));
                              setLanguageOptionsVisible(false);
                            }}
                          >
                            <Text style={{ color: colors.text }}>
                              {language.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </>
                  ) : key === "accountType" ? (
                    <>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: colors.border,
                          borderRadius: 6,
                          padding: 12,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onPress={() =>
                          setAccountTypeOptionsVisible((visible) => !visible)
                        }
                        accessibilityRole="button"
                      >
                        <Text
                          style={{
                            color: inviteForm.accountType
                              ? colors.text
                              : colors.secundary,
                          }}
                        >
                          {ACCOUNT_TYPE_OPTIONS.find(
                            (option) => option.key === inviteForm.accountType,
                          )?.label || "Select account type *"}
                        </Text>
                        <Feather
                          name={
                            accountTypeOptionsVisible
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={18}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                      {accountTypeOptionsVisible &&
                        ACCOUNT_TYPE_OPTIONS.map((option) => (
                          <TouchableOpacity
                            key={option.key}
                            style={{
                              padding: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: colors.border,
                            }}
                            onPress={() => {
                              setInviteForm((current) => ({
                                ...current,
                                accountType: option.key,
                              }));
                              setAccountTypeOptionsVisible(false);
                            }}
                          >
                            <Text style={{ color: colors.text }}>
                              {option.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </>
                  ) : (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 6,
                        padding: 12,
                        color: colors.text,
                      }}
                      value={inviteForm[key]}
                      onChangeText={(value) =>
                        setInviteForm((current) => ({
                          ...current,
                          [key]: value,
                        }))
                      }
                      placeholder={`${label} *`}
                      placeholderTextColor={colors.secundary}
                      keyboardType={
                        key === "email" ? "email-address" : "default"
                      }
                      autoCapitalize={key === "email" ? "none" : "words"}
                    />
                  )}
                </View>
              ))}
              <TouchableOpacity
                style={[appStyles.button, { marginTop: 8 }]}
                onPress={handleSubmitInvite}
                accessibilityRole="button"
              >
                <Text style={appStyles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Text></Text>
      <View style={appStyles.inputPassConteiner}>
        <Feather style={appStyles.iconmail} name="search" size={20} />
        <TextInput
          style={appStyles.inputMail}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          placeholder={t("MNU-ForAdd", {
            defaultValue: "Search Group",
          })}
          //keyboardType="email-address"
        />
      </View>
      <Text style={appStyles.text1} numberOfLines={1}>
        &nbsp;
        {t("DSH-ForAdd", {
          defaultValue: `${Object.keys(data1).length} Groups`,
        })}
      </Text>
      <View style={appStyles.rowcontent} key="searcheable">
        <View style={appStyles.col4p}>
          <View style={appStyles.CardView}>
            {Object.keys(data1).length === 0 ? (
              <Text>
                {t("MNU-ForAdd", {
                  defaultValue: "There are no Groups.",
                })}
              </Text>
            ) : (
              filteredData.map(([key, value]) => {
                count++;
                let div = null;
                if (count > 1) {
                  div = <Divider />;
                }
                let parsedValue: unknown = value;
                if (typeof value === "string") {
                  try {
                    parsedValue = JSON.parse(value);
                  } catch {
                    // Si no es JSON, conservar el valor original
                  }
                }
                const course = (parsedValue ?? {}) as Record<string, unknown>;
                const courseId = Number(course.IdCourse);
                const courseName = String(
                  course.CourseName ?? course.Name ?? "",
                );
                return (
                  <React.Fragment key={key}>
                    {div}
                    <View style={appStyles.rowcontent}>
                      <View style={appStyles.col15}>
                        <View style={appStyles.LogoBook}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            disabled={!Number.isFinite(courseId)}
                            onPress={() =>
                              navigation.navigate("Material", {
                                courseId,
                                courseName,
                              })
                            }
                          >
                            <Banner
                              Id={courseId}
                              imageStyle={appStyles.ImageBook}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={appStyles.col75}>
                        <Text style={appStyles.LetterBox}>
                          {String(
                            (parsedValue as Record<string, unknown>)?.Name ??
                              "",
                          )}{" "}
                        </Text>
                        <Text style={appStyles.LetterBox}>
                          {String(
                            (parsedValue as Record<string, unknown>)
                              ?.CourseName ?? "",
                          )}{" "}
                        </Text>
                        <Text style={appStyles.LetterBox}></Text>
                      </View>
                    </View>
                  </React.Fragment>
                );
              })
            )}
          </View>
        </View>
      </View>
      <Text></Text>
    </View>
  );
}
