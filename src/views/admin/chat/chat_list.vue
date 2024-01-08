<template>
  <div class="chat_list_view">
    <gvb-chat-group class="record_list_view"></gvb-chat-group>
    <div class="config">
      <gvb-chat-group-config></gvb-chat-group-config>
    </div>
  </div>
</template>

<script setup lang="ts">
import GvbChatGroupConfig from "@/components/admin/chat_group_config.vue";
import GvbChatGroup from "@/components/common/chat_group.vue";
</script>

<style lang="scss">
.chat_list_view {
  display: flex;
  height: calc(100vh - 130px);
  justify-content: space-between;

  .record_list_view {
    width: calc(100% - 400px);
    height: 100%;
  }

  .config {
    width: 380px;
    height: 100%;
    background-color: var(--color-bg-1);
    border-radius: 5px;
    padding: 20px;
    overflow-y: auto;
  }
}
</style>
