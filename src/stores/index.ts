import { logoutApi, userInfoApi } from "@/api/user";
import { parseToken } from "@/utils/jwt";
import { Message } from "@arco-design/web-vue";
import { defineStore } from "pinia";

const theme: boolean = true; // true - light   false - dark
const isCollapsed: boolean = false;

export interface userStoreInfoType {
  username: string;
  nickname: string;
  role: number; // 角色
  user_id: number; // 用户id
  avatar: string;
  token: string;
  exp: number; // 过期时间
}

const userInfo: userStoreInfoType = {
  username: "",
  nickname: "xxx",
  role: 0,
  user_id: 0,
  avatar: "/image/logo1.png",
  token: "",
  exp: 0,
};

export const useStore = defineStore("store", {
  state() {
    return {
      theme, // 主题
      isCollapsed, // 后台侧边栏的搜索状态，默认展开
      userInfo, // 用户信息
    };
  },
  actions: {
    setTheme(localTheme?: boolean) {
      if (localTheme !== undefined) {
        this.theme = localTheme;
      } else {
        this.theme = !this.theme;
      }
      document.documentElement.style.colorScheme = this.themeString;
      document.body.setAttribute("arco-theme", this.themeString);

      localStorage.setItem("theme", JSON.stringify(this.theme));
    },

    loadTheme() {
      let val = localStorage.getItem("theme");
      if (val === null) {
        return;
      }
      try {
        this.theme = JSON.parse(val);
        this.setTheme(this.theme);
      } catch (e) {
        return;
      }
    },

    setCollapsed(isCollapsed: boolean) {
      this.isCollapsed = isCollapsed;
    },

    async setToken(token: string) {
      this.userInfo.token = token;
      // 调用户信息的接口
      let res = await userInfoApi();
      let info = parseToken(token);
      let data = res.data;
      this.userInfo = {
        username: data.user_name,
        nickname: data.nick_name,
        role: info.role,
        user_id: info.user_id,
        avatar: data.avatar,
        token: token,
        exp: info.exp,
      };
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },

    loadToken() {
      let val = localStorage.getItem("userInfo");
      if (val === null) {
        return;
      }
      try {
        this.userInfo = JSON.parse(val);
      } catch (e) {
        this.clearUserInfo();
        return;
      }
      // 判断token是不是过期了
      let exp = Number(this.userInfo.exp) * 1000;
      let nowTime = new Date().getTime();
      if (exp - nowTime <= 0) {
        // 过期
        Message.warning("登录已过期");
        this.clearUserInfo();
        return;
      }
    },

    clearUserInfo() {
      this.userInfo = userInfo;
      localStorage.removeItem("userInfo");
    },

    async logout() {
      await logoutApi();
      this.clearUserInfo();
    },
  },
  getters: {
    themeString(): string {
      return this.theme ? "light" : "dark";
    },
    // 是否登录
    isLogin(): boolean {
      return this.userInfo.role !== 0;
    },
    // 判断是不是管理员
    isAdmin(): boolean {
      return this.userInfo.role == 1;
    },
    // 判断是不是普通用户
    isGeneral(): boolean {
      return this.userInfo.role == 2;
    },
    // 判断是不是游客
    isTourist(): boolean {
      return this.userInfo.role == 3;
    },
  },
});
