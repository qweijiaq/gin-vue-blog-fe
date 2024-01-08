<template>
  <div class="chat_group_config_view">
    <gvb-title title="群聊设置"></gvb-title>
    <div class="chat_group" v-if="isShow" style="margin-top: 20px">
      <a-form
        :model="form"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item label="匿名群聊">
          <a-switch v-model="form.isAnonymous"></a-switch>
          <template #extra>开启后，用户不用登录也能聊</template>
        </a-form-item>
        <a-form-item label="显示时间">
          <a-switch v-model="form.isShowTime"></a-switch>
          <template #extra>悬浮消息，显示时间</template>
        </a-form-item>
        <a-form-item label="初始条数">
          <a-input-number v-model="form.defaultLimit" placeholder="初始条数" />
          <template #extra>聊天记录的条数</template>
        </a-form-item>
        <a-form-item label="欢迎语">
          <a-input v-model="form.welcomeTitle" placeholder="欢迎语" />
          <template #extra>聊天头部显示的文字</template>
        </a-form-item>
        <a-form-item label="显示人数">
          <a-switch v-model="form.isOnlinePeople"></a-switch>
          <template #extra>聊天头部下方显示在线人数</template>
        </a-form-item>
        <a-form-item label="可发图片">
          <a-switch v-model="form.isSendImage"></a-switch>
          <template #extra>用户可在聊天界面上传图片</template>
        </a-form-item>
        <a-form-item label="可发文件">
          <a-switch v-model="form.isSendFile"></a-switch>
          <template #extra>用户可在聊天界面上传文件</template>
        </a-form-item>
        <a-form-item label="支持MD">
          <a-switch v-model="form.isMd"></a-switch>
          <template #extra>用户可在聊天输入输入markdown语法</template>
        </a-form-item>
        <a-form-item label="文本长度">
          <a-input-number v-model="form.contentLength" placeholder="文本长度" />
          <template #extra>可以发送文本的最大长度</template>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="updateConfig">更新配置</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import GvbTitle from "@/components/common/title.vue";
import { reactive, ref } from "vue";
import type { chatGroupConfigType } from "@/api/chat";
import { settingsInfoApi, settingsInfoUpdateApi } from "@/api/settings";
import type { baseResponse } from "@/api";
import { Message } from "@arco-design/web-vue";

const form = reactive<chatGroupConfigType>({
  isAnonymous: true,
  isShowTime: false,
  defaultLimit: 50,
  welcomeTitle: "【枫枫知道】在线聊天室",
  isOnlinePeople: true,
  isSendImage: false,
  isSendFile: false,
  isMd: false,
  contentLength: 100,
});
const isShow = ref(false);
async function getConfig() {
  let res = (await settingsInfoApi(
    "chat_group"
  )) as baseResponse<chatGroupConfigType>;
  isShow.value = true;
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Object.assign(form, res.data);
}
getConfig();

async function updateConfig() {
  let res = await settingsInfoUpdateApi("chat_group", form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  getConfig();
}
</script>
