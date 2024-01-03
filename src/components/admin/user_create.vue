<template>
  <a-modal
    title="创建用户"
    v-model:visible="props.visible"
    :on-before-ok="createUser"
  >
    <a-form ref="formRef" :model="form">
      <a-form-item
        field="user_name"
        label="用户名"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        :validate-trigger="['blur', 'input']"
      >
        <a-input v-model="form.user_name" placeholder="请输入用户名 ...">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="nick_name"
        label="昵称"
        :rules="[{ required: true, message: '昵称不能为空' }]"
        :validate-trigger="['blur', 'input']"
      >
        <a-input v-model="form.nick_name" placeholder="请输入昵称 ...">
          <template #prefix>
            <icon-robot />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="password"
        label="密码"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['blur', 'input']"
      >
        <a-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码 ..."
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="re_password"
        label="确认密码"
        :rules="[
          { required: true, message: '确认密码不能为空' },
          { validator: rePasswordValidator },
        ]"
        :validate-trigger="['blur', 'input']"
      >
        <a-input
          type="password"
          v-model="form.re_password"
          placeholder="请再次输入密码 ..."
        >
          <template #prefix>
            <icon-check />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item field="role" label="权限">
        <a-select
          v-model="form.role"
          :options="roleOptions"
          placeholder="请选择权限"
        >
          <template #prefix>
            <icon-safe />
          </template>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {
  IconUser,
  IconLock,
  IconSafe,
  IconRobot,
  IconCheck,
} from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";
import type { userCreateRequest } from "@/api/user";
import { userCreateApi } from "../../api/user";
import { Message } from "@arco-design/web-vue";
import { roleOptions } from "@/global";

const props = defineProps({
  visible: {
    type: Boolean,
  },
});

const emits = defineEmits(["update:visible", "ok"]);

// 默认表单数据
const defaultFormData = {
  user_name: "",
  nick_name: "",
  password: "",
  re_password: "",
  role: 2,
};

// 表单数据
const form = reactive<userCreateRequest & { re_password: string }>({
  nick_name: "",
  password: "",
  re_password: "",
  user_name: "",
  role: 2,
});

const formRef = ref();

// 校验确认密码
function rePasswordValidator(
  value: string,
  callback: (error?: string) => void
): void {
  if (value !== form.password) return callback("两次输入密码不一致");
}

// 创建用户
async function createUser() {
  let val = await formRef.value.validate();
  if (val) return;
  let res = await userCreateApi(form);

  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  emits("update:visible", false);
  emits("ok");
  Object.assign(form, defaultFormData);
  return;
}
</script>

<style lang="scss"></style>
