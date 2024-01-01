import { useStore } from "@/stores";
import { Message } from "@arco-design/web-vue";
import axios from "axios";

export const useAxios = axios.create({});

export interface baseResponse<T> {
  code: number;
  data: T;
  msg: string;
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
