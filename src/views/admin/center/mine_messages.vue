<template>
  <div class="user_message_list_view">
    <div class="user_menu">
      <gvb-message-list
        @check="messageUserCheck"
        :data="messageData.list"
      ></gvb-message-list>
    </div>
    <gvb-message-record
      is-head
      :userID="userID"
      :nick-name="nickName"
    ></gvb-message-record>
  </div>
</template>

<script setup lang="ts">
import GvbMessageRecord from "@/components/common/message_record.vue";
import GvbMessageList from "@/components/common/message_list.vue";
import { reactive } from "vue";
import type { listDataType } from "@/api";
import { messageUserListByMeApi } from "@/api/message";
import type { messageType } from "@/api/message";
import { ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const messageData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
});

async function getMessageData() {
  let res = await messageUserListByMeApi();
  messageData.list = res.data.list;
  messageData.count = res.data.count;

  if (isNaN(userID.value)) {
    return;
  }
  const item = messageData.list.find((item) => item.userID === userID.value);
  if (item) {
    nickName.value = item.nickName;
  }
}

getMessageData();

const userID = ref<number>(Number(route.query.user_id));
const nickName = ref<string>("");

async function messageUserCheck(data: messageType) {
  userID.value = data.userID;
  nickName.value = data.nickName;

  router.push({
    query: {
      user_id: userID.value,
    },
  });
}
</script>

<style lang="scss">
.user_message_list_view {
  display: flex;

  > div {
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .user_menu {
    width: 280px;
    padding: 20px;
  }

  .gvb_message_record_component {
    width: calc(100% - 300px);
    margin-left: 20px;
  }
}
</style>
