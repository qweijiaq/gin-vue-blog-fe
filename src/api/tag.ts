import type { baseResponse, listDataType } from "@/api/index";
import type { optionType } from "@/types";
import { cacheRequest, useAxios } from "@/api/index";

export const tagOptionsApi: () => Promise<baseResponse<optionType[]>> =
  cacheRequest(() => useAxios.get("/api/tag_names"));

export interface tagType {
  tag: string;
  count: number;
}

export function tagArticleListApi(): Promise<
  baseResponse<listDataType<tagType>>
> {
  return useAxios.get("/api/articles/tags");
}
