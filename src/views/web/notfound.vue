<template>
  <div>404 - 全局</div>
  <a-button @click="clickBtn">点击</a-button>
</template>

<script setup lang="ts">
import router from "@/router";

function clickBtn() {
  router.push({
    name: "chat",
  });
}
</script>

<style lang="scss" scoped></style>
