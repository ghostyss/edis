import { LoginResponse } from "../types/auth";
import { API } from "../config/api";
import { SessionStorage } from "./SessionStorage";

async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API.BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
        action: "login",
      }),
    });

    const json = await response.json();
    if (json.Code !== 200) {
      return {
        code: json.Code,
        msj: json.Msj,
      };
    }
    return {
      code: json.Code,
      msj: json.Msj,
      session: {
        token: json.Token,
        userId: Number(json.Id),
        name: json.Name,
        email: json.Email,
        idLang: json.IdLan,
        isAdmin: json.IsAdmin,
        AdminId: json.IdChurch,
        ChurchName: json.ChurchName,
        AdminType: json.AdminType,
      },
    };
  } catch {
    return {
      code: 500,
      msj: "It was not possible to connect to the server",
    };
  }
}

async function logout(): Promise<void> {
  // Más adelante notificaremos al servidor.
  await SessionStorage.remove();
}

export const AuthService = {
  login,

  logout,
};
