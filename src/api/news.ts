import { useAxios } from "@/api/index";
import type { baseResponse } from "@/api/index";

export interface newsType {
  hotValue: string;
  index: string | number;
  link: string;
  title: string;
}

export interface newsParamsType {
  id: string;
  size: number;
}

export function newsListApi(
  data: newsParamsType
): Promise<baseResponse<newsType[]>> {
  return useAxios.post("/api/news", data);
}
