import type { optionType } from "@/types";
import { useAxios, type baseResponse, type paramsType } from ".";

export function roleIdListApi(
  params?: paramsType
): Promise<baseResponse<optionType[]>> {
  return useAxios.get("/api/role_ids", { params });
}
