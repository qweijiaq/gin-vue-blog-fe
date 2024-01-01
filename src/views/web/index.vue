<template>
  <div>
    <a-button type="primary" @click="visible = true">点我</a-button>
    <gvb-login-modal v-model:visible="visible" />
  </div>
</template>

<script setup lang="ts">
import GvbLoginModal from "@/components/common/login_modal.vue";
import { ref } from "vue";

const visible = ref(false);
</script>

<style lang="scss"></style>
