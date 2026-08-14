export interface UserSession {
  token: string;

  userId: number;

  email: string;

  name: string;

  idLang: string;

  isAdmin: boolean;

  AdminId: number;

  ChurchName: string;

  AdminType: string;
}
export interface LoginResponse {
  code: number;

  msj: string;

  session?: UserSession;
}
