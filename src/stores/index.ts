import { logoutApi, userInfoApi } from "@/api/user";
import { parseToken } from "@/utils/jwt";
import { Message } from "@arco-design/web-vue";
import { defineStore } from "pinia";
import { siteInfoApi, type siteInfoType } from "@/api/settings";

const theme: boolean = true; // true - light   false - dark
const isCollapsed: boolean = false;

export interface userStoreInfoType {
  user_name: string;
  nick_name: string;
  role: number; // 角色
  user_id: number; // 用户id
  avatar: string;
  token: string;
  exp: number; // 过期时间
}

const userInfo: userStoreInfoType = {
  user_name: "",
  nick_name: "xxx",
  role: 0,
  user_id: 0,
  avatar: "",
  token: "",
  exp: 0,
};

const siteInfo: siteInfoType = {
  addr: "",
  bei_an: "",
  csdn_url: "",
  created_at: "",
  email: "",
  gitee_url: "",
  github_url: "",
  job: "",
  name: "",
  qq_image: "",
  slogan: "",
  slogan_en: "",
  title: "",
  version: "",
  web: "",
  wechat_image: "",
};

export const useStore = defineStore("store", {
  state() {
    return {
      theme, // 主题
      isCollapsed, // 后台侧边栏的搜索状态，默认展开
      userInfo, // 用户信息
      siteInfo,
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
        user_name: data.user_name,
        nick_name: data.nick_name,
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

    setUserInfo(key: "nick_name" | "avatar", val: string) {
      this.userInfo[key] = val;
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },

    async loadSiteInfo() {
      const val = sessionStorage.getItem("siteInfo");
      if (val !== null) {
        try {
          this.siteInfo = JSON.parse(val);
          return;
        } catch (e) {}
      }
      let res = await siteInfoApi();
      this.siteInfo = res.data;

      sessionStorage.setItem("siteInfo", JSON.stringify(this.siteInfo));
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
