import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  LayoutChangeEvent,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthContext } from "../../context/AuthContext";
import { GetDataService } from "../../services/GetDataService";
import Avatar from "../../dashboard/screens/Avatar";

type DashboardData = Record<string, unknown>;
type Notif = Record<string, unknown>;

export default function PeopleHome() {
  const { t } = useTranslation();
  const { styles: appStyles, colors } = useAppTheme();
  const { user } = useAuthContext();
  const [containerSize, setContainerSize] = useState(0);
  const [search, setSearch] = useState("");
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
    const response = await GetDataService.GetDisciples();
    console.log(response);
    if (response.code === 200) {
      try {
        const parsedData = JSON.parse(response.data1) as DashboardData;
        //console.log(parsedData);
        //const parsedNotif = JSON.parse(response.data2) as Notif;
        setData1(parsedData);
        console.log(data1);
        //setData2(parsedNotif);
        //setData3(response.data3);
      } catch (error) {
        console.error("No se pudo leer response.data1 como JSON:", error);
      }
    }
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

  return (
    <View>
      <Text style={appStyles.headerTitle} numberOfLines={2}>
        {t("DSH-ForAdd", {
          defaultValue: "Current Disciples",
        })}
      </Text>
      <Text style={appStyles.text1} numberOfLines={1}>
        {t("DSH-ForAdd", {
          defaultValue: "People you are discipling",
        })}
      </Text>
      <Text></Text>
      <TouchableOpacity
        style={appStyles.button}
        //onPress={handleLogin}
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
              defaultValue: "Invite new Disciple",
            })}
          </Text>
        )}
      </TouchableOpacity>
      <Text></Text>
      <View style={appStyles.inputPassConteiner}>
        <Feather style={appStyles.iconmail} name="search" size={20} />
        <TextInput
          style={appStyles.inputMail}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          placeholder={t("MNU-ForAdd", {
            defaultValue: "Search People",
          })}
          //keyboardType="email-address"
        />
      </View>
      <Text style={appStyles.text1} numberOfLines={1}>
        &nbsp;
        {t("DSH-ForAdd", {
          defaultValue: "2 Disciples",
        })}
      </Text>
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
