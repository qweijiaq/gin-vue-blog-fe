<template>
  <div class="big_model_base_option">
    <div class="left">
      <a-alert>使用大模型必须的配置项</a-alert>
      <a-form ref="formRef" :model="form">
        <a-form-item label="大模型选择">
          <a-select
            v-model="form.name"
            placeholder="大模型选择"
            :options="bigModelList"
          ></a-select>
        </a-form-item>
        <a-form-item label="accessKeyId" v-if="form.name === 'qwen'">
          <a-input
            v-model="form.access_key_id"
            placeholder="accessKeyId"
          ></a-input>
        </a-form-item>
        <a-form-item label="accesskeySecret" v-if="form.name === 'qwen'">
          <a-input
            v-model="form.access_key_secret"
            placeholder="accesskeySecret"
          ></a-input>
        </a-form-item>
        <a-form-item label="agentKey" v-if="form.name === 'qwen'">
          <a-input v-model="form.agent_key" placeholder="agentKey"></a-input>
        </a-form-item>
        <a-form-item label="appId" v-if="form.name === 'qwen'">
          <a-input v-model="form.app_id" placeholder="appId"></a-input>
        </a-form-item>
        <a-form-item label="大模型名称">
          <a-input v-model="form.title" placeholder="大模型名称"></a-input>
        </a-form-item>
        <a-form-item label="大模型提示词">
          <a-textarea
            v-model="form.prompt"
            :auto-size="{ minRows: 4, maxRows: 5 }"
            placeholder="大模型提示词"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="slogan">
          <a-textarea
            v-model="form.slogan"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="slogan"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="菜单序号">
          <a-input-number v-model="form.order"></a-input-number>
        </a-form-item>
        <a-form-item label="是否启用">
          <a-switch v-model="form.enable"></a-switch>
        </a-form-item>
        <a-form-item>
          <a-button @click="update" type="primary"> 更新</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="right">
      <gvb-title title="帮助"></gvb-title>
      <md-preview
        :model-value="form.help"
        :theme="store.themeString"
      ></md-preview>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GvbTitle from "@/components/common/title.vue";
import { reactive, ref } from "vue";
import type { bigModelSettingsType, bigModelUsableType } from "@/api/big_model";
import { useStore } from "@/stores/index";
import {
  bigModelSettingsApi,
  bigModelSettingsUpdateApi,
  bigModelUsableApi,
} from "@/api/big_model";
import { MdPreview } from "md-editor-v3";
import { Message } from "@arco-design/web-vue";

const store = useStore();

const form = reactive<bigModelSettingsType>({
  name: "",
  enable: false,
  order: 0,
  access_key_id: "",
  access_key_secret: "",
  agent_key: "",
  app_id: "",
  title: "",
  prompt: "",
  slogan: "",
  help: "",
});

async function getData() {
  let res = await bigModelSettingsApi();
  Object.assign(form, res.data);
}
getData();

const bigModelList = ref<bigModelUsableType[]>([]);
async function getBigModelList() {
  let res = await bigModelUsableApi();
  bigModelList.value = res.data;
}
getBigModelList();

const update = async () => {
  let res = await bigModelSettingsUpdateApi(form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  getData();
};
</script>

<style lang="scss" scoped>
.big_model_base_option {
  display: flex;
  padding: 20px;
  .left {
    width: 40%;

    .arco-form {
      margin-top: 20px;
    }
  }
  .right {
    width: 40%;
    margin-left: 20px;
  }
}
</style>
