<template>
  <div class="notfound_view">
    <gvb-nav no-scroll></gvb-nav>
    <main>
      <div class="container">
        <img src="/image/Learning-rafiki.svg" alt="" />
        <div>文章找不到了哟</div>
        <router-link to="/">
          <a-button size="large" type="primary">返回首页</a-button>
        </router-link>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import GvbNav from "@/components/web/nav.vue";
</script>
<style lang="scss">
.notfound_view {
  background-color: var(--bg);
  height: 100vh;

  main {
    padding-top: 100px;
    display: flex;
    justify-content: center;

    .container {
      width: var(--container_width);
      background-color: var(--color-bg-1);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .info {
        margin-top: 20px;
      }

      div {
        color: var(--color-text-2);
      }

      img {
        width: 400px;
      }

      button {
        margin-top: 10px;
        margin-bottom: 40px;
      }
    }
  }
}
</style>
