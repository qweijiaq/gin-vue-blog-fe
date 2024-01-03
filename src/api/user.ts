import {
  useAxios,
  type baseResponse,
  type paramsType,
  type listDataType,
} from ".";

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

export function loginQQPathApi(): Promise<baseResponse<string>> {
  return useAxios.get("/api/qq_login_path");
}

export function qqLoginApi(code: string): Promise<baseResponse<string>> {
  return useAxios.post("/api/login", null, { params: { code } });
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

export function userListApi(
  params: paramsType
): Promise<baseResponse<listDataType<userInfoType>>> {
  return useAxios.get("/api/users", { params });
}

// 创建用户接口
export interface userCreateRequest {
  nick_name: string;
  password: string;
  role: number;
  user_name: string;
}
export function userCreateApi(
  data: userCreateRequest
): Promise<baseResponse<string>> {
  return useAxios.post("/api/users", data);
}
