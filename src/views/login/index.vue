<template>
  <div class="login">
    <div class="login_mask">
      <gvb-login-form @ok="ok" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GvbLoginForm from "@/components/common/login_form.vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface historyState {
  back: string;
}

function ok() {
  let back = (window.history.state as historyState).back;
  // 拿不到之前的路径，就跳转首页
  if (back === null) {
    router.push({ name: "index" });
    return;
  }
  router.push(back);
}
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
