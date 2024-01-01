import { useAxios, type baseResponse } from ".";

export interface loginEmailType {
  user_name: string;
  password: string;
}

export function loginEmailApi(
  request: loginEmailType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/email_login", request);
}

export function logoutApi(): Promise<baseResponse<string>> {
  return useAxios.post("/api/logout");
}

export interface userInfoType {
  id: number;
  created_at: string;
  nick_name: string;
  user_name: string;
  avatar: string;
  email: string;
  tel: string;
  addr: string;
  token: string;
  ip: string;
  role: string;
  role_id: number;
  sign_status: "QQ" | "gitee" | "邮箱";
  integral: number; // 积分
  sign: string; // slogan
  link: string; // 跳转链接
}

export function userInfoApi(): Promise<baseResponse<userInfoType>> {
  return useAxios.get("/api/user_info");
}
