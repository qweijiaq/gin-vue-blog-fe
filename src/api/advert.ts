import type { baseResponse, listDataType, paramsType } from "@/api/index";
import { useAxios } from "@/api/index";

export interface advertType {
  created_at: string;
  href: string;
  id: number;
  images: string;
  is_show: boolean;
  title: string;
}

export function advertListApi(
  params?: paramsType
): Promise<baseResponse<listDataType<advertType>>> {
  return useAxios.get("/api/adverts", {
    params: params,
    headers: {
      GvbReferer: location.pathname,
    },
  });
}

export interface advertCreateType {
  href: string;
  images: string;
  is_show: boolean;
  title: string;
  id?: number;
}

export const defaultAdvertForm = {
  href: "",
  images: "",
  is_show: false,
  title: "",
};

export function advertCreateApi(
  data: advertCreateType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/adverts", data);
}

export function advertUpdateApi(
  id: number,
  data: advertCreateType
): Promise<baseResponse<string>> {
  return useAxios.put("/api/adverts/" + id.toString(), data);
}
