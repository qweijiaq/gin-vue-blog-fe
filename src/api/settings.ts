import type { baseResponse, listDataType } from "@/api/index";
import { useAxios } from "@/api/index";
import type { chatGroupConfigType } from "@/api/chat";

export interface siteInfoType {
  addr: string;
  bei_an: string;
  bilibili_url: string;
  created_at: string;
  email: string;
  gitee_url: string;
  github_url: string;
  job: string;
  name: string;
  qq_image: string;
  slogan: string;
  slogan_en: string;
  title: string;
  version: string;
  web: string;
  wechat_image: string;
}

export function siteInfoApi(): Promise<baseResponse<siteInfoType>> {
  return useAxios.get("/api/settings/site");
}

export function siteInfoUpdateApi(
  data: siteInfoType
): Promise<baseResponse<string>> {
  return useAxios.put("/api/settings/site", data);
}

export interface emailType {
  host: string;
  port: number;
  user: string;
  password: string;
  default_from_email: string;
  use_ssl: boolean;
  user_tls: boolean;
}

export interface qqType {
  app_id: string;
  key: string;
  redirect: string;
}

export interface jwtType {
  secret: string;
  expires: number;
  issuer: string;
}

export interface qiniuType {
  enable: boolean;
  access_key: string;
  secret_key: string;
  bucket: string;
  cdn: string;
  zone: string;
  prefix: string;
  size: number;
}

export interface gaodeType {
  enable: boolean;
  key: string;
}

export type settingsName =
  | "qq"
  | "email"
  | "qiniu"
  | "jwt"
  | "chat_group"
  | "gaode";

export type settingsType =
  | emailType
  | qqType
  | jwtType
  | qiniuType
  | chatGroupConfigType
  | gaodeType;

export function settingsInfoApi<T extends settingsType>(
  name: settingsName
): Promise<baseResponse<T>> {
  return useAxios.get("/api/settings/" + name.toString());
}

export function settingsInfoUpdateApi<T extends settingsType>(
  name: settingsName,
  data: T
): Promise<baseResponse<string>> {
  return useAxios.put("/api/settings/" + name.toString(), data);
}

export interface helpType {
  title: string;
  abs?: string;
  content?: string;
}
