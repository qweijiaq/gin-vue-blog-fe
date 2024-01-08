<template>
  <div class="user_info_view">
    <div class="left">
      <gvb-cropper
        ref="clipperRef"
        :type="clipperData.type"
        :allow-type-list="clipperData.allowTypeList"
        :limit-size="clipperData.limitSize"
        :fixed-number="clipperData.fixedNumber"
        :fixed-number-aider="clipperData.fixedNumberAider"
        :preview-width="clipperData.previewWidth"
        @confirm="onConfirm"
      >
      </gvb-cropper>
      <gvb-title title="用户信息"></gvb-title>
      <a-form
        ref="formRef"
        :model="form"
        :label-col-props="{ span: isLaptops1 ? 5 : 3 }"
        :wrapper-col-props="{ span: isLaptops1 ? 19 : 21 }"
      >
        <a-form-item label="用户名" v-if="form.sign_status === '邮箱'">
          <span>{{ form.user_name }}</span>
        </a-form-item>
        <a-form-item label="头像">
          <a-avatar @click="showCropper" :image-url="form.avatar"></a-avatar>
        </a-form-item>
        <a-form-item
          field="nick_name"
          label="昵称"
          :rules="[{ required: true, message: '请输入昵称' }]"
          :validate-trigger="['blur']"
        >
          <a-input
            @change="userInfoUpdate"
            v-model="form.nick_name"
            placeholder="昵称"
          ></a-input>
        </a-form-item>
        <a-form-item label="个性签名">
          <a-textarea
            @change="userInfoUpdate"
            v-model="form.sign"
            placeholder="个性签名"
            :auto-size="{ minRows: 3, maxRows: 3 }"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="Github地址">
          <a-input
            @change="userInfoUpdate"
            v-model="form.link"
            placeholder="Github地址"
          ></a-input>
        </a-form-item>
        <a-form-item label="邮箱">
          <span>{{ form.email }}</span>
        </a-form-item>
        <a-form-item label="当前角色">
          <span>{{ form.role }}</span>
        </a-form-item>
        <a-form-item label="注册来源">
          <span>{{ form.sign_status }}</span>
        </a-form-item>
        <a-form-item label="用户积分">
          <span>{{ form.integral }}</span>
        </a-form-item>
      </a-form>
      <gvb-title title="操作"></gvb-title>

      <gvb-update-password
        v-model:visible="updatePasswordVisible"
      ></gvb-update-password>

      <gvb-bind-email v-model:visible="bindEmailVisible"></gvb-bind-email>
      <div class="action_group">
        <a-button type="primary" @click="bindEmailVisible = true"
          >绑定邮箱</a-button
        >
        <a-button type="primary" @click="updatePasswordVisible = true"
          >修改密码</a-button
        >
        <a-button type="primary" status="danger">注销退出</a-button>
      </div>
    </div>
    <div class="right">
      <gvb-title title="预览"></gvb-title>
      <div class="user_info_preview" style="width: 300px; margin-top: 20px">
        <gvb-user-info-preview
          :data="{
            avatar: form.avatar,
            nick_name: form.nick_name,
            sign: form.sign,
            link: form.link,
            collects_count: Random.integer(1, 200),
            comment_count: Random.integer(1, 200),
            digg_count: Random.integer(1, 200),
            look_count: Random.integer(1, 200),
          }"
        ></gvb-user-info-preview>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { userInfoType } from "@/api/user";
import { userInfoApi, userInfoUpdateApi } from "@/api/user";
import GvbTitle from "@/components/common/title.vue";
import type { userInfoUpdateType } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import GvbUpdatePassword from "@/components/common/update_password.vue";
import GvbBindEmail from "@/components/common/bind_email.vue";
import GvbCropper from "@/components/common/cropper.vue";
import GvbUserInfoPreview from "@/components/common/user_info_preview.vue";
import { Random } from "mockjs";
import { useStore } from "@/stores";

const isLaptops1 = (window as any).isLaptops;
const formRef = ref();
const store = useStore();

interface IClipper {
  type: string; // 上传类型
  allowTypeList: string[]; // 接收允许上传的图片类型
  limitSize: number; // 限制大小
  fixedNumber: number[]; // 截图框的宽高比例
  fixedNumberAider?: number[]; // 侧边栏收起截图框的宽高比例
  previewWidth: number; // 预览宽度
  previewWidthAider?: number; // 侧边栏收起预览宽度
}

const clipperData = ref<IClipper>({
  type: "",
  allowTypeList: [],
  limitSize: 1,
  fixedNumber: [],
  previewWidth: 0,
});

const clipperRef = ref();

function showCropper() {
  clipperData.value = {
    type: "browserLogo", // 该参数可根据实际要求修改类型
    allowTypeList: ["png", "jpg", "jpeg"], // 允许上传的图片格式
    limitSize: 1, // 限制的大小
    fixedNumber: [1, 1], // 截图比例，可根据实际情况进行修改
    previewWidth: 100, // 预览宽度
  };
  // 打开裁剪组件
  clipperRef.value.uploadFile();
}

const form = reactive<userInfoType>({
  id: 0,
  created_at: "",
  nick_name: "",
  user_name: "",
  avatar: "",
  email: "",
  tel: "",
  addr: "",
  token: "",
  ip: "",
  role: "",
  role_id: 0,
  sign_status: "邮箱",
  integral: 0,
  sign: "",
  link: "",
});

function onConfirm(val: any) {
  form.avatar = val[0].file_name;
  userInfoUpdate();
}

async function getData() {
  let res = await userInfoApi();
  Object.assign(form, res.data);
}

async function userInfoUpdate() {
  let val = await formRef.value.validate();
  if (val) return;

  let data: userInfoUpdateType = {
    link: form.link,
    nick_name: form.nick_name,
    sign: form.sign,
    avatar: form.avatar,
  };
  let res = await userInfoUpdateApi(data);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  // 同步到store里面
  store.setUserInfo("nick_name", form.nick_name);
  store.setUserInfo("avatar", form.avatar);
}

getData();

const updatePasswordVisible = ref(false);
const bindEmailVisible = ref(false);
</script>

<style lang="scss">
.user_info_view {
  display: flex;
  background-color: var(--color-bg-1);
  padding: 20px;
  border-radius: 5px;
  height: calc(100vh - 130px);

  .left {
    width: 40%;

    .arco-form {
      margin-top: 10px;
    }

    .action_group {
      margin-top: 10px;

      > button {
        margin-right: 10px;
      }
    }
  }

  .right {
    margin-left: 20px;
    width: calc(60% - 20px);
  }
}
</style>
