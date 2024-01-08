<template>
  <div>
    <a-modal
      title="修改密码"
      :visible="props.visible"
      @cancel="close"
      :on-before-ok="updatePassword"
    >
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="old_pwd"
          label="旧密码"
          :rules="[{ required: true, message: '请输旧密码' }]"
          :validate-trigger="['blur']"
        >
          <a-input
            v-model="form.old_pwd"
            type="password"
            placeholder="旧密码"
          ></a-input>
        </a-form-item>
        <a-form-item
          field="pwd"
          label="新密码"
          :rules="[{ required: true, message: '请输入新密码' }]"
          :validate-trigger="['blur']"
        >
          <a-input
            v-model="form.pwd"
            type="password"
            placeholder="新密码"
          ></a-input>
        </a-form-item>
        <a-form-item
          field="re_pwd"
          label="确认密码"
          :rules="[
            { required: true, message: '请输入确认密码' },
            { validator: rePasswordValidator },
          ]"
          :validate-trigger="['blur']"
        >
          <a-input
            v-model="form.re_pwd"
            type="password"
            placeholder="确认密码"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { userUpdatePasswordType } from "@/api/user";
import { userUpdatePasswordApi } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores";
import router from "@/router";

const store = useStore();
interface Props {
  visible: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:visible"]);

function close() {
  emits("update:visible", false);
}

const form = reactive<userUpdatePasswordType>({
  old_pwd: "",
  pwd: "",
  re_pwd: "",
});
const formRef = ref();

function rePasswordValidator(
  value: string,
  callback: (error?: string) => void
): void {
  if (value !== form.pwd) return callback("确认密码不一致");
}

async function updatePassword() {
  let val = await formRef.value.validate();
  if (val) return false;
  let res = await userUpdatePasswordApi(form);
  if (res.code) {
    Message.error(res.msg);
    return false;
  }
  Message.success(res.msg);
  emits("update:visible", false);

  store.logout();
  router.push({
    name: "login",
  });
}
</script>
