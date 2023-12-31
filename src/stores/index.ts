import { defineStore } from "pinia";

const theme: boolean = true; // true - light   false - dark

export const useStore = defineStore("store", {
  state() {
    return {
      theme: theme, // 主题
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
  },
  getters: {
    themeString(): string {
      return this.theme ? "light" : "dark";
    },
  },
});
