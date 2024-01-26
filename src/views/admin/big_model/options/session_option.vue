<template>
  <div class="big_model_session_option">
    <div class="left">
      <a-alert>用户使用大模型，每一个会话就是全新的聊天</a-alert>
      <a-form ref="formRef" :model="form">
        <a-form-item label="对话积分消耗">
          <a-input-number
            v-model="form.session_scope"
            placeholder="对话积分消耗"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="会话积分消耗">
          <a-input-number
            v-model="form.chat_scope"
            placeholder="会话积分消耗"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="每日积分领取">
          <a-input-number
            v-model="form.day_scope"
            placeholder="每日积分领取"
          ></a-input-number>
        </a-form-item>
        <a-form-item>
          <a-button @click="update" type="primary"> 更新</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="right">
      <gvb-title title="帮助"></gvb-title>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GvbTitle from "@/components/common/title.vue";
import { reactive } from "vue";
import { useStore } from "@/stores/index";
import { sessionOptionApi, sessionOptionUpdateApi } from "@/api/big_model";
import { Message } from "@arco-design/web-vue";
import type { sessionOptionType } from "@/api/big_model";

const store = useStore();

const form = reactive<sessionOptionType>({
  chat_scope: 0,
  session_scope: 0,
  day_scope: 0,
});

async function getData() {
  let res = await sessionOptionApi();
  Object.assign(form, res.data);
}
getData();

const update = async () => {
  let res = await sessionOptionUpdateApi(form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  getData();
};
</script>

<style lang="scss" scoped>
.big_model_session_option {
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
