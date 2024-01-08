import type { baseResponse, listDataType, paramsType } from "@/api/index";
import { useAxios } from "@/api/index";
import type { optionType } from "@/types";
import { cacheRequest } from "@/api/index";

export interface articleItem {
  id: string;
  title: string;
}

export interface articleType {
  abstract: string;
  banner_id: number;
  banner_url: string;
  category: string;
  collects_count: number;
  comment_count: number;
  created_at: string;
  digg_count: number;
  id: string;
  link: string;
  look_count: number;
  source: string;
  tags: string[];
  title: string;
  updated_at: string;
  user_avatar: string;
  user_id: number;
  user_nick_name: string;
  content?: string;
  is_collect?: boolean;
  is_recommend?: boolean;

  is_digg?: boolean;
  next?: articleItem | null;
  prev?: articleItem | null;
}

export interface articleItemType {
  abstract: string;
  banner_id?: number;
  banner_url: string;
  category: string;
  collects_count: number;
  comment_count: number;
  created_at: string;
  digg_count: number;
  id: string;
  link?: string;
  look_count: number;
  source?: string;
  tags?: string[];
  title: string;
  updated_at?: string;
  user_avatar?: string;
  user_id?: number;
  user_nick_name?: string;
}

export interface articleDataType {
  collects_count: number;
  comment_count: number;
  created_at: string;
  digg_count: number;
  look_count: number;
  is_coll?: boolean;
}

export interface articleParamsType extends paramsType {
  date?: string;
  tag?: string;
  category?: string;
}

export function articleListApi(
  params: articleParamsType
): Promise<baseResponse<listDataType<articleType>>> {
  return useAxios.get("/api/articles", { params: params });
}

// export function articleCategoryListApi(): Promise<baseResponse<optionType[]>> {
//     return useAxios.get("/api/categorys")
// }

export const articleCategoryListApi: () => Promise<baseResponse<optionType[]>> =
  cacheRequest(() => useAxios.get("/api/categories"));

export interface articleUpdateType {
  abstract?: string;
  banner_id?: number;
  category?: string;
  content?: string;
  id?: string;
  link?: string;
  source?: string;
  tags?: string[];
  title?: string;
  is_recommend?: boolean;
  banner_url?: string;
}

export function articleUpdateApi(
  data: articleUpdateType
): Promise<baseResponse<string>> {
  return useAxios.put("/api/articles", data);
}

export function articleCreateApi(
  data: articleUpdateType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/articles", data);
}

export function articleContentApi(id: string): Promise<baseResponse<string>> {
  return useAxios.get("/api/articles/content/" + id);
}

export function articleCollectsApi(
  params: paramsType
): Promise<baseResponse<listDataType<articleType>>> {
  return useAxios.get("/api/articles/collections", { params: params });
}

export interface articleCalendarType {
  count: number;
  date: string;
}

export function articleCalendarApi(): Promise<
  baseResponse<articleCalendarType[]>
> {
  return useAxios.get("/api/articles/calendar");
}

export function articleDetailApi(
  id: string
): Promise<baseResponse<articleType>> {
  return useAxios.get("/api/articles/" + id);
}

export function articleCollectsPostApi(
  id: string
): Promise<baseResponse<string>> {
  return useAxios.post("/api/articles/collections", { id });
}

export function articleDiggApi(id: string): Promise<baseResponse<string>> {
  return useAxios.post("/api/articles/digg", { id });
}

export interface articleSearchType {
  body: string;
  id: string;
  key: string;
  slug: string;
  title: string;
}

export function articleSearchApi(
  params: paramsType
): Promise<baseResponse<listDataType<articleSearchType>>> {
  return useAxios.get("/api/articles/text", { params });
}

// 文章推荐列表
export function articleRecommendListApi(
  params: articleParamsType
): Promise<baseResponse<listDataType<articleType>>> {
  return useAxios.get("/api/articles/recommend", { params });
}
