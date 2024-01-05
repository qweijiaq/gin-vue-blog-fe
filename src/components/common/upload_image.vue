<template>
  <div class="upload_image">
    <div class="line">
      <a-input :placeholder="props.placeholder" v-model="text"></a-input>
      <a-upload
        @success="imageSuccessEvent"
        :show-file-list="false"
        action="/api/image"
        name="image"
        :headers="headers"
      />
    </div>
    <a-image :src="text" height="80px" v-if="text"></a-image>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import type { FileItem } from "@arco-design/web-vue";
import type { baseResponse } from "@/api";
import { Message } from "@arco-design/web-vue";
import { ref, watch } from "vue";

const store = useStore();
const headers = {
  token: store.userInfo.token,
};

const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "图片链接",
  },
});

const text = ref("");
watch(
  () => props.modelValue,
  () => {
    text.value = props.modelValue as string;
  }
);
const emits = defineEmits(["update:modelValue"]);

function imageSuccessEvent(file: FileItem) {
  const response = file.response as baseResponse<string>;
  if (response.code) {
    Message.error(response.msg);
    return;
  }
  Message.success(response.msg);
  text.value = response.data;
}

watch(text, () => {
  emits("update:modelValue", text.value);
});
</script>
<style lang="scss">
.upload_image {
  width: 100%;

  .line {
    display: flex;

    .arco-upload-wrapper {
      width: inherit;
    }

    .arco-btn {
      margin-left: 10px;
    }
  }

  .arco-image {
    margin-top: 10px;

    .arco-image-img {
      border-radius: 5px;
      height: 80px;
      object-fit: cover;
      max-width: 100%;
    }
  }
}
</style>
