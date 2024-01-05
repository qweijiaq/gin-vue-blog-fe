import type { baseResponse, listDataType, paramsType } from "@/api/index";
import { useAxios } from "@/api/index";

export interface logRequest extends paramsType {
  level?: number; // 1 2 3 info  warn error
  type?: number; // 1 登录日志  2 操作日志  3 运行日志
  ip?: string;
  userID?: number;
  addr?: string;
  date?: string;
  status?: boolean | ""; // true  成功  false 失败
  userName?: string;
}

export type logLevel = "info" | "warning" | "error";
export type logT = "loginType | actionType" | "runtimeType";

export interface logType {
  readonly id: number;
  created_at: string;
  updated_at: string;
  ip: string;
  addr: string;
  level: logLevel; // 日志的等级
  title: string;
  content: string;
  userID: number;
  userName: string;
  serviceName: string;
  status: boolean;
  type: logT; // 日志类型
  readStatus: boolean;
}

export function logListApi(
  params: logRequest
): Promise<baseResponse<listDataType<logType>>> {
  return useAxios.get("/api/logs/v2", { params: params });
}

export function logReadApi(id: number): Promise<baseResponse<string>> {
  return useAxios.get("/api/logs/v2/read", { params: { id: id } });
}
