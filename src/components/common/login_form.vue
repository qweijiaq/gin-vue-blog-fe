<template>
  <a-form
    ref="formRef"
    :model="form"
    :label-col-props="{ span: 0 }"
    :wrapper-col-props="{ span: 24 }"
  >
    <div class="title">用户登录</div>
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

    <a-button type="primary" @click="loginEmail">登录</a-button>

    <div class="other_login">
      <div class="label">第三方登录</div>
      <div class="icon">
        <a href="javascript:void(0)" @click="qqLogin">
          <img src="/image/icon/qq.png" alt="" />
        </a>
      </div>
    </div>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { IconLock, IconUser } from "@arco-design/web-vue/es/icon";
import type { loginEmailType } from "@/api/user";
import { loginEmailApi } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores";
import { loginQQPathApi } from "@/api/user";

const store = useStore();

const props = defineProps({
  qqRedirectPath: {
    type: String,
  },
});

const emits = defineEmits(["ok"]);

const form = reactive<loginEmailType>({
  user_name: "",
  password: "",
});

const formRef = ref();

function formReset() {
  formRef.value.resetFields(Object.keys(form));
  formRef.value.clearValidate(Object.keys(form));
}

defineExpose({
  formReset,
});

async function loginEmail() {
  let value = await formRef.value.validate();
  if (value) return;
  let res = await loginEmailApi(form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  store.setToken(res.data);
  emits("ok");
  Message.success(res.msg);
}

async function qqLogin() {
  let res = await loginQQPathApi();
  localStorage.setItem("qqres", JSON.stringify(res));
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  if (res.data === "") {
    Message.warning("未配置qq登录");
    return;
  }

  // 存一下当前点登录的路径
  // 判断是不是login页面来的
  let path = location.pathname;
  if (props.qqRedirectPath) {
    path = props.qqRedirectPath;
  }
  localStorage.setItem("redirectPath", path);

  window.open(res.data, "_self");
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: var(--active);
  font-family: kuaikan;
}

.other_login {
  margin-top: 20px;

  .label {
    display: flex;
    align-items: center;
    color: var(--color-text-2);
    justify-content: space-between;

    &::before {
      display: inline-flex;
      width: 35%;
      height: 1px;
      content: "";
      background-color: var(--color-text-4);
    }

    &::after {
      display: inline-flex;
      width: 35%;
      height: 1px;
      content: "";
      background-color: var(--color-text-4);
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    > a {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }

    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
