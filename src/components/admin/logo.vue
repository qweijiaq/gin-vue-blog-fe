<template>
  <div class="logo">
    <img src="https://skyao.io/learning-go/images/logo.png" alt="" />
    <div class="logo_title">
      <div>个人博客</div>
      <div>GopherBlog</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.logo {
  height: 90px;
  display: flex;
  padding: 20px 0 20px 20px;
  align-items: center;
  border-bottom: 1px solid var(--bg);

  img {
    width: 60px;
    height: 60px;
  }

  .logo_title {
    margin-left: 20px;
    > div:nth-child(1) {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 2px;
    }

    > div:nth-child(2) {
      font-size: 14px;
    }
  }
}
</style>
