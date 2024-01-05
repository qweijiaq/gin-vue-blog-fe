import { useStore } from "@/stores";
import type { optionType } from "@/types";
import { Message } from "@arco-design/web-vue";
import axios from "axios";

export const useAxios = axios.create({});

export interface baseResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface paramsType {
  page?: number;
  limit?: number;
  key?: string;
  sort?: string;
}

export interface listDataType<T> {
  count: number;
  list: T[];
}

useAxios.interceptors.request.use((config) => {
  const store = useStore();
  config.headers["token"] = store.userInfo.token;
  return config;
});

useAxios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      console.log("服务失败", response.status);
      Message.error(response.statusText);
      return Promise.reject(response.statusText);
    }
    return response.data;
  },
  (err) => {
    console.log("服务错误", err);
    Message.error(err.message);
    return Promise.reject(err.message);
  }
);

// 通用删除
export function defaultDeleteApi<T extends number | string>(
  url: string,
  idList: T[]
): Promise<baseResponse<string>> {
  return useAxios.delete(url, {
    data: {
      id_list: idList,
    },
  });
}

// 通用请求 option
export function defaultOptionApi(
  url: string,
  params?: paramsType
): Promise<baseResponse<optionType[]>> {
  return useAxios.get(url, { params });
}

export function cacheRequest<T>(func: () => Promise<T>): () => Promise<T> {
  let lastRequestTime: number = 0; // 存储上次请求的时间戳
  let cacheData: T | null = null; // 上次缓存的数据
  let currentRequest: Promise<T> | null = null;
  return function () {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastRequestTime;

    if (timeDiff < 1000 && cacheData) {
      return Promise.resolve(cacheData);
    }
    // 没有缓存数据，或者时间超过一秒，那就发起新的请求
    if (!currentRequest) {
      currentRequest = func().then((res: T) => {
        // 更新之前的数据和时间
        lastRequestTime = currentTime;
        cacheData = res;
        currentRequest = null; // 重置当前请求
        return res;
      });
    }
    return currentRequest;
  };
}
