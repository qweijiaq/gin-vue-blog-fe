import type { baseResponse, listDataType, paramsType } from "@/api/index";
import { useAxios } from "@/api/index";

export interface feedbackCreateType {
  email: string;
  content: string;
}

export interface feedbackType {
  id?: number;
  content: string;
  created_at: string;
  email?: string;
}

export function feedbackCreateApi(
  data: feedbackCreateType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/feedbacks", data);
}

export function feedbackListApi(
  params?: paramsType
): Promise<baseResponse<listDataType<feedbackType>>> {
  return useAxios.get("/api/feedbacks", { params });
}
