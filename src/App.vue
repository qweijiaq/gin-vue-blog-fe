<template>
  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useStore } from "@/stores";

const store = useStore();

store.loadTheme();
store.loadToken();
store.getBigModelInfo();
</script>

<style scoped></style>
