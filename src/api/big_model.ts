import { useAxios } from "@/api";
import type {
  baseResponse,
  listDataType,
  optionsResponse,
  paramsType,
} from "@/api";

// 大模型配置
export interface bigModelSettingsType {
  name: string; // 当前正在使用的大模型名字
  enable: boolean; // 是否启用
  order: number; // 菜单序号
  access_key_id: string;
  access_key_secret: string;
  agent_key: string;
  app_id: string;
  title: string; // 大模型名称
  prompt: string; // 提示词
  slogan: string; // 介绍
  help: string;
}

// 获取大模型配置
export function bigModelSettingsApi(): Promise<
  baseResponse<bigModelSettingsType>
> {
  return useAxios.get("/api/bigModel/setting");
}

// 更新大模型配置
export function bigModelSettingsUpdateApi(
  data: bigModelSettingsType
): Promise<baseResponse<bigModelSettingsType>> {
  return useAxios.put("/api/bigModel/setting", data);
}

// 大模型列表
export interface bigModelUsableType {
  label: string;
  value: string;
  disable: boolean; // 是否不可以选择这个大模型
}

// 获取大模型列表
export function bigModelUsableApi(): Promise<
  baseResponse<bigModelUsableType[]>
> {
  return useAxios.get("/api/bigModel/usable");
}

// 会话配置
export interface sessionOptionType {
  chat_scope: number; // 对话积分消耗
  session_scope: number; // 创建会话积分消耗
  day_scope: number; // 每日赠送积分
}

// 获取会话配置
export function sessionOptionApi(): Promise<baseResponse<sessionOptionType>> {
  return useAxios.get("/api/bigModel/session_setting");
}

// 更新会话配置
export function sessionOptionUpdateApi(
  data: sessionOptionType
): Promise<baseResponse<string>> {
  return useAxios.put("/api/bigModel/session_setting", data);
}

// 自动回复的参数
export interface autoReplyType {
  id: number; // 通过id判断是更新还是创建
  created_at?: string;
  name: string;
  mode: number; // 匹配模式  1 精确匹配  2 模糊匹配  3 前缀匹配  4 正则匹配
  rule: string; // 匹配规则
  reply_content: string;
}

// 自动回复列表
export function autoReplyListApi(
  params?: paramsType
): Promise<baseResponse<listDataType<autoReplyType>>> {
  return useAxios.get("/api/bigModel/auto_reply", { params });
}

// 更新或创建自动回复
export function autoReplyUpdateApi(
  data: autoReplyType
): Promise<baseResponse<string>> {
  return useAxios.put("/api/bigModel/auto_reply", data);
}

// 角色标签类型
export interface bigModelRoleTagType {
  id: number;
  created_at?: string;
  title: string;
  color: string; // 颜色  没什么实际用途
  roleCount: number; // 标签下的角色个数
}

// 获取角色标签列表
export function bigModelRoleTagListApi(
  params?: paramsType
): Promise<baseResponse<listDataType<bigModelRoleTagType>>> {
  return useAxios.get("/api/bigModel/tags", { params });
}

// 更新或创建角色标签
export function bigModelRoleTagUpdateApi(
  data: bigModelRoleTagType
): Promise<baseResponse<string>> {
  return useAxios.put("/api/bigModel/tags", data);
}

// 角色类型
export interface bigModelRoleType {
  id: number;
  created_at: string;
  name: string;
  enable: boolean; // 是否启用角色
  icon: string; // 角色图标
  abstract: string; // 角色简介
  tags: bigModelRoleTagType[];
  scope: number; // 角色消耗的积分
  prologue: string; // 角色开场白
  prompt: string; // 角色限定词
  auto_reply: boolean; // 是否启用自动回复
  tagList: number[]; // 标签列表
}

// 获取角色列表
export function bigModelRoleListApi(
  params?: paramsType
): Promise<baseResponse<listDataType<bigModelRoleType>>> {
  return useAxios.get("/api/bigModel/roles", { params });
}

// 创建角色
export function bigModelRoleCreateApi(
  data: bigModelRoleType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/bigModel/roles", data);
}

// 更新角色
export function bigModelRoleUpdateApi(
  data: bigModelRoleType
): Promise<baseResponse<string>> {
  return useAxios.put("/api/bigModel/roles", data);
}

// 角色标签options列表
export function bigModelRoleTagOptionsApi(): Promise<
  baseResponse<optionsResponse<number>[]>
> {
  return useAxios.get("/api/bigModel/tags/options");
}

// 角色icon列表
export function bigModelRoleIconOptionsApi(): Promise<
  baseResponse<optionsResponse<string>[]>
> {
  return useAxios.get("/api/bigModel/icons");
}
