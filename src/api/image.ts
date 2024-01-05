import { cacheRequest, useAxios } from "@/api/index";
import type { baseResponse, listDataType, paramsType } from "@/api/index";
import { Message } from "@arco-design/web-vue";

export interface imageIdType {
  id: number;
  path: string;
  name: string;
}

export const imageIdListApi: () => Promise<baseResponse<imageIdType[]>> =
  cacheRequest(() => useAxios.get("/api/image_names"));

export interface imageType {
  id: number;
  created_at: string;
  path: string;
  hash: string;
  name: string;
  image_type: "本地" | "七牛云";
  bannerCount: number; // 关联 banner 的个数
  articleCount: number; // 关联文章的个数
}

export function imageListApi(
  params: paramsType
): Promise<baseResponse<listDataType<imageType>>> {
  return useAxios.get("/api/images", { params: params });
}

export interface imagesUploadResponse {
  file_name: string;
  is_success: boolean;
  msg: string;
}

export function uploadImageApi(file: File): Promise<baseResponse<string>> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set("image", file);
    useAxios
      .post("/api/image", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: any) => resolve(res))
      .catch((err) => reject(err));
  });
}

export async function onUploadImg(
  files: Array<File>,
  callback: (urls: Array<string>) => void
): Promise<void> {
  let resList: baseResponse<string>[] = [];

  try {
    resList = await Promise.all(files.map((file) => uploadImageApi(file)));
  } catch (e) {
    // Message.error(e.message)
    return;
  }

  const urlList: string[] = [];
  resList.forEach((res) => {
    if (res.code) {
      Message.error(res.msg);
      return;
    }
    urlList.push(res.data);
  });
  callback(urlList);
}
