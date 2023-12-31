<template>
  <div @click="store.setTheme()">
    <icon-moon-fill class="action_icon" v-if="store.theme" />
    <icon-sun-fill class="action_icon" v-else />
  </div>
</template>

<script setup lang="ts">
import { IconSunFill, IconMoonFill } from "@arco-design/web-vue/es/icon";
import { useStore } from "@/stores";

const store = useStore();
</script>

<style lang="scss" scoped>
.action_icon {
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
}
</style>
