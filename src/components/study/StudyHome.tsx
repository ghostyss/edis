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
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { GetDataService } from "../../services/GetDataService";
import Avatar from "../../dashboard/screens/Avatar";
import LoadingSpinner from "../Loading/LoadingSpinner";

type DashboardData = Record<string, unknown>;
type Notif = Record<string, unknown>;
//const ACCOUNT_TYPE_OPTIONS = ["Teacher", "Student", "Church"] as const;
export const ACCOUNT_TYPE_OPTIONS = [
  { key: "Basic", label: "Disciple" },
  { key: "Profesional", label: "Disciple-Maker" },
  /*{ key: "church", label: "Church" },*/
] as const;

export default function StudyHome() {
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
    const response = await GetDataService.GetCourses();
    console.log(response);
    if (response.code === 200) {
      try {
        const parsedData = JSON.parse(response.data1) as DashboardData;
        //console.log(parsedData);
        //const parsedNotif = JSON.parse(response.data2) as Notif;
        //setData1(parsedData);
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
      <View style={appStyles.rowcontent}>
        <View style={appStyles.col4p}>
          <View style={appStyles.CardView}>
            <View style={appStyles.rowcontent}>
              <View style={appStyles.col15}>
                <View style={appStyles.IconRound} onLayout={handleLayout}>
                  <Feather name="book-open" size={45} color={colors.text} />
                </View>
              </View>
              <View style={appStyles.col75}>
                <Text style={appStyles.LetterBox}>
                  {t("DSH-ForAdd", {
                    defaultValue: "Available credits",
                  })}
                </Text>
                <Text style={appStyles.NumberBox}>
                  {data1.TotalDisciples != null
                    ? String(data1.TotalDisciples)
                    : "0"}
                </Text>
                <Text style={appStyles.LetterBox}>
                  {t("DSH-ForAdd", {
                    defaultValue: "Across 1 book type",
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text style={appStyles.headerTitle} numberOfLines={2}>
        {t("DSH-ForAdd", {
          defaultValue: "Your digital materials",
        })}
      </Text>
      <Text></Text>
      <View style={appStyles.rowcontent} key="searcheable">
        <View style={appStyles.col4p}>
          <View style={appStyles.CardView}>
            {Object.keys(data1).length === 0 ? (
              <Text>
                {t("MNU-ForAdd", {
                  defaultValue: "There are no Disciples.",
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
                return (
                  <React.Fragment key={key}>
                    {div}
                    <View style={appStyles.rowcontent}>
                      <View style={appStyles.col15}>
                        <View style={appStyles.LogoUserHeader}>
                          <Avatar
                            Id={
                              (parsedValue as Record<string, unknown>)
                                ?.Id as number
                            }
                            Type={user?.AdminType}
                            imageStyle={appStyles.ImageUserHeader}
                          />
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
                            (parsedValue as Record<string, unknown>)?.Active ??
                              "",
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
