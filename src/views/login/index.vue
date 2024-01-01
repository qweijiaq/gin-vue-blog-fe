<template>
  <div class="login">
    <div class="login_mask">
      <gvb-login-form />
    </div>
  </div>
</template>

<script setup lang="ts">
import GvbLoginForm from "@/components/common/login_form.vue";
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
