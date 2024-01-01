<template>
  <div :class="{ logo: true, hidden: props.hidden }">
    <img src="https://skyao.io/learning-go/images/logo.png" alt="" />
    <div class="logo_title">
      <div>个人博客</div>
      <div>GopherBlog</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  hidden: Boolean,
});
</script>

<style lang="scss">
.logo {
  height: 90px;
  display: flex;
  padding: 20px 0 20px 20px;
  align-items: center;
  border-bottom: 1px solid var(--bg);
  transition: all 0.3s;

  img {
    width: 60px;
    height: 60px;
    transition: all 0.3s;
  }

  .logo_title {
    margin-left: 20px;
    transition: all 0.3s;
    transform: scale(1);
    transform-origin: left;

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

.logo.hidden {
  padding: 2px;
  transition: all 0.3s;

  img {
    width: 40px;
    height: 40px;
  }

  .logo_title {
    transform: scale(0);
  }
}
</style>
