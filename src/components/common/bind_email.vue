<template>
  <div>
    <a-modal
      title="绑定邮箱"
      :visible="props.visible"
      body-class="gvb_bind_email_modal_body"
      @cancel="close"
    >
      <a-steps v-model:current="step" type="navigation">
        <a-step>输入邮箱</a-step>
        <a-step>输入验证码</a-step>
      </a-steps>
      <a-form ref="formRef" :model="form">
        <a-form-item
          v-if="step === 1"
          field="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输邮箱' },
            { type: 'email', message: '邮箱格式错误' },
          ]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.email" placeholder="邮箱"></a-input>
        </a-form-item>
        <a-form-item
          v-if="step === 2"
          field="code"
          label="验证码"
          :rules="[{ required: true, message: '请输验证码' }]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.code" placeholder="验证码"></a-input>
          <template #extra>请输入发送到你邮箱的验证码</template>
        </a-form-item>
        <a-form-item
          v-if="step === 2"
          field="password"
          label="登录密码"
          :rules="[{ required: true, message: '请输登录密码' }]"
          :validate-trigger="['blur']"
        >
          <a-input
            v-model="form.password"
            type="password"
            placeholder="登录密码"
          ></a-input>
          <template #extra>绑定邮箱之后，可使用 邮箱+密码 登录</template>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="close">取消</a-button>
        <a-button type="primary" v-if="step === 1" @click="next"
          >下一步</a-button
        >
        <a-button type="primary" v-if="step === 2" @click="bindEmail"
          >绑定邮箱</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { userBindEmailType } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import { userBindEmailApi } from "@/api/user";

interface Props {
  visible: boolean;
}

const step = ref<number>(1);

const props = defineProps<Props>();
const emits = defineEmits(["update:visible"]);

const defaultBindEmail = {
  code: undefined,
  email: "",
  password: "",
};
const form = reactive<userBindEmailType>({
  code: undefined,
  email: "",
  password: "",
});
const formRef = ref();

function close() {
  emits("update:visible", false);
  // formRef.value.resetFields(["email", "code", "password"])
  formRef.value.clearValidate(["email", "code", "password"]);
  Object.assign(form, defaultBindEmail);
  form.code = undefined;
  step.value = 1;
}

async function next() {
  let val = await formRef.value.validateField(["email"]);
  if (val) return;
  let res = await userBindEmailApi(form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  step.value += 1;
}

async function bindEmail() {
  let val = await formRef.value.validateField(["code", "password"]);
  if (val) return;
  let res = await userBindEmailApi(form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  emits("update:visible", false);
}
</script>

<style lang="scss">
.gvb_bind_email_modal_body {
  .arco-form {
    margin-top: 20px;
  }
}
</style>
