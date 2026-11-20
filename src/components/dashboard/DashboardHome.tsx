import React, { useEffect, useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthContext } from "../../context/AuthContext";
import { GetDataService } from "../../services/GetDataService";

type DashboardData = Record<string, unknown>;
type Notif = Record<string, unknown>;

export default function DashboardHome() {
  const { t } = useTranslation();
  const { styles: appStyles, colors } = useAppTheme();
  const { user } = useAuthContext();
  const [containerSize, setContainerSize] = useState(0);
  const [data1, setData1] = useState<DashboardData>({});
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
        backgroundColor: colors.text,
        width: "100%",
        marginVertical: 8,
      }}
    />
  );
  const handleGetData = async () => {
    const response = await GetDataService.GetDataDashh1();
    if (response.code === 200) {
      try {
        //console.log(response);
        const parsedData = JSON.parse(response.data1) as DashboardData;
        //console.log(parsedData);
        const parsedNotif = JSON.parse(response.data2) as Notif;
        //console.log(parsedNotif);
        setData1(parsedData);
        setData2(parsedNotif);
        setData3(response.data3);

        //console.log(parsedData.TotalGroups);
      } catch (error) {
        console.error("No se pudo leer response.data1 como JSON:", error);
      }
    }
  };
  useEffect(() => {
    void handleGetData();
  }, []);
  return (
    <View>
      <Text style={appStyles.headerTitle} numberOfLines={2}>
        {t("DSH-135", {
          defaultValue: "Welcome Back {nameuser}",
        }).replace(/\{nameuser\}/g, user?.name ?? "")}
      </Text>
      <Text style={appStyles.text1} numberOfLines={1}>
        {user?.ChurchName}
      </Text>
      <Text></Text>
      <Text style={appStyles.headerSubtitle3} numberOfLines={1}>
        &nbsp;
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
                <Text style={appStyles.NumberBox}>
                  {data1.TotalDisciples != null
                    ? String(data1.TotalDisciples)
                    : "0"}
                </Text>
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
                <Text style={appStyles.NumberBox}>
                  {data1.TotalGroups != null ? String(data1.TotalGroups) : "0"}
                </Text>
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
      <Text></Text>
      <Text style={appStyles.headerSubtitle3} numberOfLines={1}>
        {" "}
        &nbsp;
        {t("DSH-ForAdd", {
          defaultValue: "Needs your attention",
        })}
      </Text>
      <View style={appStyles.rowcontent}>
        <View style={appStyles.col4p}>
          <View style={appStyles.CardView}>
            {Object.keys(data2).length === 0 ? (
              <Text>
                {t("MNU-ForAdd", {
                  defaultValue:
                    "There are no notifications, or there is no internet connection.",
                })}
              </Text>
            ) : (
              Object.entries(data2).map(([key, value]) => {
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
                      <View style={appStyles.col05}>
                        <Feather
                          name="message-square"
                          size={30}
                          color={colors.success}
                        />
                      </View>
                      <Text style={appStyles.col305}>
                        {String(
                          (parsedValue as Record<string, unknown>)?.Name ?? "",
                        )}{" "}
                        -{" "}
                        {String(
                          (parsedValue as Record<string, unknown>)
                            ?.CourseName ?? "",
                        )}
                      </Text>
                      <Text style={appStyles.col05}></Text>
                      <Text style={appStyles.col305}>
                        {String(
                          (parsedValue as Record<string, unknown>)?.GroupName ??
                            "",
                        )}
                      </Text>
                    </View>
                  </React.Fragment>
                );
              })
            )}
          </View>
        </View>
      </View>
      <Text></Text>
      <Text style={appStyles.headerSubtitle3} numberOfLines={1}>
        &nbsp;
        {t("DSH-ForAdd", {
          defaultValue: "Countinue with your groups",
        })}
      </Text>
      <View style={appStyles.rowcontent}>
        <View style={appStyles.col4p}>
          <View style={appStyles.CardView}></View>
        </View>
      </View>
      <Text></Text>
      <View style={appStyles.rowcontent}>
        <View style={appStyles.col4p}>
          <View style={appStyles.CardView}>
            <Text style={appStyles.text1b}>
              {resultado[2] != null
                ? String(resultado[2]).trim().slice(1).trim()
                : ""}
              {""}
            </Text>
            <Text style={appStyles.text1}>
              {resultado[1] != null ? String(resultado[1]) : ""}{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
