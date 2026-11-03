import { GetData } from "../types/getdata";
import { API } from "../config/api";
import { SessionStorage } from "./SessionStorage";

async function GetData(email: string, password: string): Promise<GetData> {
  try {
    const session = await SessionStorage.get();
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

    const json = await response.json();
    if (json.Code !== 200) {
      return {
        code: json.Code,
        msj: json.Msj,
        data1: json.Data1,
        data2: json.Data2,
        data3: json.Data3,
        data4: json.Data4,
        data5: json.Data5,
      };
    }
    return {
      code: json.Code,
      msj: json.Msj,
      data1: json.Data1,
      data2: json.Data2,
      data3: json.Data3,
      data4: json.Data4,
      data5: json.Data5,
    };
  } catch {
    return {
      code: 500,
      msj: "It was not possible to connect to the server",
      data1: "",
      data2: "",
      data3: "",
      data4: "",
      data5: "",
    };
  }
}

async function logout(): Promise<void> {
  // Más adelante notificaremos al servidor.
  await SessionStorage.remove();
}

export const AuthService = {
  GetData,
  logout,
};
