import * as Notifications from "expo-notifications";
import { GetDataService } from "../services/GetDataService";

import {
  getMessaging,
  getToken,
  onMessage,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status: currentStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = currentStatus;

  if (currentStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function getFCMToken() {
  const messagingInstance = getMessaging();
  const tkn = await getToken(messagingInstance);
  /**/
  //console.log(tkn);
  const response = await GetDataService.SaveFB(tkn);
  //console.log(response);
    if (response.code === 200) {
      try {
        //const parsedData = JSON.parse(response.data1) as DashboardData;
        
        //console.log(parsedData.TotalGroups);
      } catch (error) {
        console.error("No se pudo leer response.data1 como JSON:", error);
      }
  }
  /**/
  return tkn;
}

export function listenForForegroundMessages() {
  const messagingInstance = getMessaging();

  return onMessage(messagingInstance, async (remoteMessage) => {
    console.log("Notificación recibida:", remoteMessage);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title ?? "Edis",
        body: remoteMessage.notification?.body ?? "",
        data: remoteMessage.data ?? {},
        sound: true,
      },
      trigger: null,
    });
  });
}
export function registerBackgroundMessageHandler() {
  const messagingInstance = getMessaging();

  setBackgroundMessageHandler(
    messagingInstance,
    async (remoteMessage) => {
      console.log("Notificación recibida en segundo plano:", remoteMessage);
    }
  );
}
