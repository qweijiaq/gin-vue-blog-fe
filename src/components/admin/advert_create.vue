<template>
  <div>
    <a-modal
      :title="editId ? '编辑广告' : '创建广告'"
      :visible="props.visible"
      @before-open="beforeOpen"
      @cancel="emits('update:visible', false)"
      :on-before-ok="okHandler"
    >
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="title"
          label="广告名称"
          :rules="[{ required: true, message: '请输入广告名称' }]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="广告名称"></a-input>
        </a-form-item>
        <a-form-item
          field="href"
          label="跳转链接"
          :rules="[{ required: true, message: '请输入跳转链接' }]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.href" placeholder="跳转链接"></a-input>
        </a-form-item>
        <a-form-item
          field="images"
          label="图片链接"
          :rules="[{ required: true, message: '请输入图片链接' }]"
          :validate-trigger="['blur']"
        >
          <gvb-upload-image v-model="form.images"></gvb-upload-image>
        </a-form-item>
        <a-form-item label="是否显示">
          <a-switch v-model="form.is_show"></a-switch>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { advertCreateApi, advertUpdateApi } from "@/api/advert";
import type { advertCreateType } from "@/api/advert";
import { Message } from "@arco-design/web-vue";
import { defaultAdvertForm } from "@/api/advert";
import type { baseResponse } from "@/api";
import GvbUploadImage from "@/components/common/upload_image.vue";

interface Props {
  visible: boolean;
  record: advertCreateType;
}

const props = defineProps<Props>();

const emits = defineEmits(["update:visible", "ok"]);

const form = reactive<advertCreateType>({
  href: "",
  images: "",
  is_show: false,
  title: "",
});

const editId = ref<number | undefined>(undefined);

function beforeOpen() {
  Object.assign(form, props.record);
  editId.value = props.record.id;
}

const formRef = ref();

async function okHandler() {
  let val = await formRef.value.validate();
  if (val) return false;
  let res: baseResponse<string>;
  if (editId.value) {
    res = await advertUpdateApi(editId.value, form);
  } else {
    res = await advertCreateApi(form);
  }
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  Object.assign(form, defaultAdvertForm);
  emits("update:visible", false);
  emits("ok");
}
</script>
