import type { baseResponse, listDataType, paramsType } from ".";
import { useAxios } from ".";

export interface bannerType {
  id: number;
  path: string;
}

export interface menuType {
  abstract: string[];
  abstract_time?: number;
  banner_time: number;
  banners: bannerType[];
  created_at: string;
  id: number;
  path: string;
  slogan: string;
  sort: number;
  title: string;
}

export function menuListApi(
  params: paramsType
): Promise<baseResponse<listDataType<menuType>>> {
  return useAxios.get("/api/menus", { params: params });
}
