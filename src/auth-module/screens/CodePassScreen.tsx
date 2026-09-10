import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContext";
import { useAppTheme } from "../../hooks/useAppTheme";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Theme } from "../../theme/styles_Back";
import { AuthService } from "../../services/AuthService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "CodePass">;

export default function CodePassScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [resendTimer, setResendTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, "CodePass">>();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { email } = route.params;
  const { t } = useTranslation();
  const { login } = useAuthContext();

  const { styles: appStyles, colors } = useAppTheme();
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);
  const formatTimer = (totalSeconds: number) => {
    //const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      //hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };
  const handleCodeChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleCode = async () => {
    setLoading(true);
    try {
      const response = await AuthService.GetCode(email, "login");
      console.log(response);
      if (response.code === 200) {
        setResendTimer(30);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleReviewCode = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await AuthService.ReviewCode(email, code.join(""));
      console.log(response);
      if (response.code === 200) {
        await login(response.session!);
      } else {
        setError(response.msj || "Code Wrong");
      }
    } catch (err) {
      setError("Server connection error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={appStyles.containerApp}>
      <View style={appStyles.LogoLogin}>
        <Image
          source={{ uri: t("LogoLan") }}
          style={appStyles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={appStyles.cardLogin}>
        <View style={appStyles.forgotIcon}>
          <Feather name="mail" size={80} color={colors.text} />
          <View style={appStyles.secureBadge}>
            <Feather
              name="check"
              size={35}
              color={colors.success}
              borderRadius={20}
              borderColor={colors.success}
              borderWidth={2}
            />
          </View>
        </View>
        <Text style={appStyles.headerTitleLogin2}>
          {t("MNU-ForAdd", {
            defaultValue: "Check your email",
          })}
        </Text>

        <Text style={appStyles.headerSubtitle2}>
          {t("MNU-214", {
            defaultValue: "We sent a six-digit sign-in code to verify to",
          })}
        </Text>
        <Text style={appStyles.textCenter2}>{email}</Text>
        {error ? <Text style={appStyles.TextError}>{error}</Text> : null}
        <View style={appStyles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={appStyles.codeInput}
              value={digit}
              onChangeText={(value) => handleCodeChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity
          style={appStyles.button}
          onPress={() => {
            handleReviewCode();
          }}
          disabled={code.join("").length !== 6}
        >
          {loading ? (
            <ActivityIndicator color="{colors.primary}" />
          ) : (
            <Text style={appStyles.buttonText}>
              {t("MNU-ForAdd", {
                defaultValue: "Verify & Sign In",
              })}
            </Text>
          )}
        </TouchableOpacity>
        <View style={appStyles.resendContainer}>
          <View style={appStyles.resendLeft}>
            <Text style={appStyles.resendText}>
              {t("MNU-ForAdd", {
                defaultValue: "Didn't receive the code?",
              })}
            </Text>
          </View>

          <View style={appStyles.resendRight}>
            <TouchableOpacity
              disabled={resendTimer !== 0}
              onPress={() => {
                handleCode();
              }}
            >
              {loading ? (
                <ActivityIndicator color="{colors.primary}" />
              ) : (
                <Text
                  style={[
                    appStyles.resendButton,
                    resendTimer !== 0 && appStyles.resendButtonDisabled,
                  ]}
                >
                  {t("MNU-218", {
                    defaultValue: "Resend in",
                  })}
                </Text>
              )}
            </TouchableOpacity>
            <Text style={appStyles.resendTimer}>
              {formatTimer(resendTimer)}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={appStyles.textCenterContainer2}>
            <Text style={appStyles.textCenter2}>
              {t("MNU-ForAdd", {
                defaultValue: "Change email Address",
              })}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={appStyles.dividerContainer}>
          <View style={appStyles.dividerLine} />

          <Text style={appStyles.dividerText}>or</Text>

          <View style={appStyles.dividerLine} />
        </View>
        <TouchableOpacity
          style={appStyles.buttonB}
          onPress={() => navigation.goBack()}
        >
          <Text style={appStyles.buttonTextB}>
            {t("MNU-ForAdd", {
              defaultValue: "User password instated",
            })}
          </Text>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <View style={appStyles.textCenterContainer4}>
        <View>
          <Feather name="lock" size={30} color={colors.success} />
        </View>
        <Text style={appStyles.text12}>
          {t("MNU-ForAdd", {
            defaultValue:
              "For your security, this code will can be used only once and expire shortly.\nNever share a code with anyone.",
          })}
        </Text>
      </View>
      <Text></Text>
    </View>
  );
}
