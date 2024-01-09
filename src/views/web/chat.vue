<template>
  <div class="chat_view">
    <gvb-nav no-scroll></gvb-nav>
    <main>
      <div class="container">
        <gvb-chat-group></gvb-chat-group>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import GvbNav from "@/components/web/nav.vue";
import GvbChatGroup from "@/components/common/chat_group.vue";
</script>

<style lang="scss" scoped>
.chat_view {
  height: 100vh;

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 80px;

    .container {
      width: var(--container_width);
    }
  }
}
</style>
