import "@/assets/base.css";
import "@/assets/theme.css";
import "@/assets/font.css";
import "@arco-design/web-vue/dist/arco.css";

import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(ArcoVue);
app.use(createPinia());
app.use(router);

app.mount("#app");
