<template>
  <div class="login">
    <div class="login_mask">
      <gvb-login-form @ok="ok" :qq-redirect-path="back" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GvbLoginForm from "@/components/common/login_form.vue";
import { useRoute } from "vue-router";
import { qqLoginApi } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores";
import router from "@/router";

const store = useStore();
const route = useRoute();

interface routerQuery {
  flag?: string;
  code?: string;
}

interface historyState {
  back: string;
}

const back = (window.history.state as historyState).back;

function ok() {
  let back = (window.history.state as historyState).back;
  // 拿不到之前的路径，就跳转首页
  if (back === null) {
    router.push({ name: "index" });
    return;
  }
  router.push(back);
}

async function init(query: routerQuery) {
  if (!query.code || !query.flag) {
    return;
  }
  let res = await qqLoginApi(query.code);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  store.setToken(res.data);

  // 重定向到点击登录的页面
  let path = localStorage.getItem("redirectPath");
  if (path === null) {
    path = "/";
  }
  router.push(path);
}

init(route.query);
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url(/image/bg.jpeg) 50% / cover no-repeat;

  .login_mask {
    position: absolute;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: var(--login_bg);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
  }
}
</style>
