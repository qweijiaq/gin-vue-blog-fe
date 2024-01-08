<template>
  <div>
    <Modal
      :title="`与${props.nickName}的聊天`"
      width="40%"
      :visible="props.visible"
      :footer="false"
      body-class="gvb_message_record_modal_body"
      @cancel="close"
    >
      <gvb-message-record
        ref="messageRecordRef"
        :userID="props.userID"
      ></gvb-message-record>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import GvbMessageRecord from "@/components/common/message_record.vue";
import { Modal } from "@arco-design/web-vue";
import { nextTick, ref } from "vue";

interface Props {
  visible: boolean;
  userID: number;
  nickName: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:visible", "close"]);

function close() {
  emits("update:visible", false);
  emits("close");
}

const messageRecordRef = ref();

function getData() {
  nextTick(() => {
    messageRecordRef.value.getRecordData();
  });
}

defineExpose({
  getData,
});
</script>

<style lang="scss">
.gvb_message_record_modal_body {
  padding: 0;
}
</style>
