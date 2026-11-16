import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { GetData } from "../types/getdata";
import { API } from "../config/api";
import { SessionStorage } from "./SessionStorage";

const DASHBOARD_DATA_KEY = "GET_DATA_DASH1";

function cacheKey(userId?: number): string {
  return `${DASHBOARD_DATA_KEY}_${userId ?? "anonymous"}`;
}

function emptyResponse(code: number, msj: string): GetData {
  return { code, msj, data1: "", data2: "", data3: "", data4: "", data5: "" };
}

async function getCachedData(key: string): Promise<GetData | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    const cachedData = JSON.parse(value) as GetData;
    return { ...cachedData, data2: "" };
    /*const value2 = value ? (JSON.parse(value) as GetData) : null;
    return value2;*/
  } catch {
    return null;
  }
}

async function GetDataDashh1(): Promise<GetData> {
  let storageKey = cacheKey();

  try {
    const session = await SessionStorage.get();
    storageKey = cacheKey(session?.userId);

    const network = await NetInfo.fetch();
    const isOnline =
      network.isConnected === true && network.isInternetReachable !== false;
    //console.log(isOnline);
    if (!isOnline) {
      return (
        (await getCachedData(storageKey)) ??
        emptyResponse(503, "No internet connection and no saved data")
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    let Id;
    if (session?.token) {
      headers.Authorization = `Bearer ${session.token}`;
    }
    if (session?.userId) {
      Id = session.userId;
    }
    const response = await fetch(`${API.BASE_URL}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        Id: Id,
        action: "GetDataDash1",
      }),
    });
    //console.log(headers);
    //const responseBody = await response.text();
    //console.log("SaveFB response body:", responseBody);
    const json = await response.json();
    //console.log(json);
    const result: GetData = {
      code: json.Code,
      msj: json.Msj,
      data1: json.Data1,
      data2: json.Data2,
      data3: json.Data3,
      data4: json.Data4,
      data5: json.Data5,
    };

    if (json.Code !== 200) {
      if (json.Code === 401) {
        await SessionStorage.remove();
      }
      return result;
    }

    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(result));
    } catch {
      // El resultado de red sigue siendo válido aunque el almacenamiento falle.
    }

    return result;
  } catch {//console.log('aqui?');
    return (
      (await getCachedData(storageKey)) ??
      emptyResponse(500, "It was not possible to connect to the server")
    );
  }
}

async function SaveFB(code: string): Promise<GetData> {
  //let storageKey = cacheKey();
  try {
    const session = await SessionStorage.get();
    //storageKey = cacheKey(session?.userId);

    const network = await NetInfo.fetch();
    const isOnline =
      network.isConnected === true && network.isInternetReachable !== false;
    //console.log(isOnline);
    if (!isOnline) {
      const result: GetData = {
        code: 400,
        msj: "It was not possible to connect to the server",
        data1: '',
        data2: '',
        data3: '',
        data4: '',
        data5: '',
      };
      return result;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    let Id;
    if (session?.token) {
      headers.Authorization = `Bearer ${session.token}`;
    }
    if (session?.userId) {
      Id = session.userId;
    }
    //console.log(Id);
    const response = await fetch(`${API.BASE_URL}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        Id: Id,
        Code: code,
        action: "SetCodeFB",
      }),
    });
    const responseBody = await response.text();
    //console.log("SaveFB response body:", responseBody);

    let json: any;
    try {
      json = JSON.parse(responseBody.replace(/^\uFEFF/, "").trim());
    } catch (error) {
      console.error("SaveFB: el servidor no devolvió JSON válido:", error);
      return {
        code: response.status,
        msj: responseBody || "El servidor devolvió una respuesta vacía",
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        data5: "",
      };
    }
    const result: GetData = {
      code: json.Code,
      msj: json.Msj,
      data1: json.Data1,
      data2: json.Data2,
      data3: json.Data3,
      data4: json.Data4,
      data5: json.Data5,
    };

    if (json.Code !== 200) {
      if (json.Code === 401) {
        await SessionStorage.remove();
      }
      return result;
    }

    try {
      //await AsyncStorage.setItem(storageKey, JSON.stringify(result));
    } catch {
      // El resultado de red sigue siendo válido aunque el almacenamiento falle.
    }

    return result;
  } catch (error) {
    console.error("SaveFB falló:", error);
    const result: GetData = {
      code: 501,
      msj:
        error instanceof Error
          ? error.message
          : "It was not possible to connect to the server",
      data1: '',
      data2: '',
      data3: '',
      data4: '',
      data5: '',
    };
    return result;
    /*return (
      (await getCachedData(storageKey)) ??
      emptyResponse(500, "It was not possible to connect to the server")
    );*/
  }
}

async function logout(): Promise<void> {
  // Más adelante notificaremos al servidor.
  await SessionStorage.remove();
}

export const GetDataService = {
  GetDataDashh1,
  SaveFB,
  logout,
};
