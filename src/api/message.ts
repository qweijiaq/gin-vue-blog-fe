import type { baseResponse, listDataType, paramsType } from "@/api/index";
import { useAxios } from "@/api/index";

export interface messageParams extends paramsType {
  nickName?: string;
}

export interface messageType {
  avatar: string;
  count: number;
  nickName: string;
  userID: number;
  userName: string;
}

export interface messageRecordType {
  id: number;
  content: string;
  created_at: string;
  message_count: number;
  rev_user_avatar: string;
  rev_user_id: number;
  rev_user_nick_name: string;
  send_user_avatar: string;
  send_user_id: number;
  send_user_nick_name: string;
  isMe?: boolean; // 手动加上的
}

export function messageUserListApi(
  params?: messageParams
): Promise<baseResponse<listDataType<messageType>>> {
  return useAxios.get("/api/message_users", { params: params });
}

export function messageUserListByUserApi(
  userID: number
): Promise<baseResponse<listDataType<messageType>>> {
  return useAxios.get("/api/message_users/user", { params: { userID } });
}

export function messageUserRecordApi(
  sendUserID: number,
  revUserID: number
): Promise<baseResponse<listDataType<messageRecordType>>> {
  return useAxios.get("/api/message_users/record", {
    params: { sendUserID, revUserID },
  });
}

// 我的消息列表
export function messageUserListByMeApi(): Promise<
  baseResponse<listDataType<messageType>>
> {
  return useAxios.get("/api/message_users/me");
}

export interface userRecordRequestType extends paramsType {
  userID: number;
}

// 我与某个用户的聊天列表
export function messageUserMeRecordApi(
  params: userRecordRequestType
): Promise<baseResponse<listDataType<messageRecordType>>> {
  return useAxios.get("/api/message_users/record/me", { params });
}

export interface messagePublishType {
  content: string;
  rev_user_id: number;
}
export function messagePublishApi(
  data: messagePublishType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/messages", data);
}

export function messageRemoveApi(
  id_list: number[]
): Promise<baseResponse<string>> {
  return useAxios.delete("/api/message_users", { data: { id_list } });
}
