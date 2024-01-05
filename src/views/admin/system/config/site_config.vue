<template>
  <div class="site_config">
    <div class="left">
      <div class="site_info">
        <gvb-title title="站点配置"></gvb-title>
        <a-form
          ref="formRef"
          :model="siteForm"
          :label-col-props="{ span: isLaptops1 ? 5 : 4 }"
          :wrapper-col-props="{ span: isLaptops1 ? 18 : 19 }"
        >
          <a-form-item
            field="title"
            label="网站标题"
            :rules="[{ required: true, message: '请输入网站标题' }]"
            :validate-trigger="['blur']"
          >
            <a-input v-model="siteForm.title" placeholder="网站标题"></a-input>
          </a-form-item>
          <a-form-item
            field="slogan"
            label="slogan"
            :rules="[{ required: true, message: '请输入slogan' }]"
            :validate-trigger="['blur']"
          >
            <a-input v-model="siteForm.slogan" placeholder="slogan"></a-input>
          </a-form-item>
          <a-form-item
            field="slogan_en"
            label="英文slogan"
            :rules="[{ required: true, message: '请输入英文slogan' }]"
            :validate-trigger="['blur']"
          >
            <a-input
              v-model="siteForm.slogan_en"
              placeholder="英文slogan"
            ></a-input>
          </a-form-item>
          <a-form-item field="bei_an" label="备案号">
            <a-input v-model="siteForm.bei_an" placeholder="备案号"></a-input>
          </a-form-item>
          <a-form-item field="version" label="版本号">
            <a-input v-model="siteForm.version" placeholder="版本号"></a-input>
          </a-form-item>
          <a-form-item field="created_at" label="建站日期">
            <a-input
              v-model="siteForm.created_at"
              placeholder="建站日期"
            ></a-input>
          </a-form-item>
          <a-form-item field="qq_image" label="qq二维码">
            <gvb-upload-image
              v-model="siteForm.qq_image"
              placeholder="qq二维码"
            ></gvb-upload-image>
          </a-form-item>
          <a-form-item field="wechat_image" label="微信二维码">
            <gvb_upload_image
              v-model="siteForm.wechat_image"
              placeholder="微信二维码"
            ></gvb_upload_image>
          </a-form-item>
        </a-form>
      </div>
      <div class="site_config_update">
        <a-button type="primary" @click="siteInfoUpdate">更新</a-button>
      </div>
    </div>
    <div class="right">
      <div class="user_info">
        <gvb-title title="用户信息"></gvb-title>
        <a-form
          :model="siteForm"
          :label-col-props="{ span: 3 }"
          :wrapper-col-props="{ span: 20 }"
        >
          <a-form-item label="昵称">
            <a-input v-model="siteForm.name" placeholder="昵称"></a-input>
          </a-form-item>
          <a-form-item label="工作">
            <a-input v-model="siteForm.job" placeholder="工作"></a-input>
          </a-form-item>
          <a-form-item label="地址">
            <a-input v-model="siteForm.addr" placeholder="地址"></a-input>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model="siteForm.email" placeholder="邮箱"></a-input>
          </a-form-item>
        </a-form>
      </div>
      <div class="link_info">
        <gvb-title title="链接信息"></gvb-title>
        <a-form
          :model="siteForm"
          :label-col-props="{ span: isLaptops1 ? 4 : 3 }"
          :wrapper-col-props="{ span: isLaptops1 ? 19 : 20 }"
        >
          <a-form-item label="CSDN">
            <a-input v-model="siteForm.csdn_url" placeholder="CSDN"></a-input>
          </a-form-item>
          <a-form-item label="Gitee">
            <a-input v-model="siteForm.gitee_url" placeholder="Gitee"></a-input>
          </a-form-item>
          <a-form-item label="GitHub">
            <a-input
              v-model="siteForm.github_url"
              placeholder="GitHub"
            ></a-input>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import GvbTitle from "@/components/common/title.vue";
import { reactive, ref } from "vue";
import type { siteInfoType } from "@/api/settings";
import GvbUploadImage from "@/components/common/upload_image.vue";
import { siteInfoApi, siteInfoUpdateApi } from "@/api/settings";
import { Message } from "@arco-design/web-vue";

const isLaptops1 = (window as any).isLaptops;
const siteForm = reactive<siteInfoType>({
  addr: "",
  bei_an: "",
  csdn_url: "",
  created_at: "",
  email: "",
  gitee_url: "",
  github_url: "",
  job: "",
  name: "",
  qq_image: "",
  slogan: "",
  slogan_en: "",
  title: "",
  version: "",
  web: "",
  wechat_image: "",
});

async function getData() {
  let res = await siteInfoApi();
  Object.assign(siteForm, res.data);
}

getData();

const formRef = ref();

async function siteInfoUpdate() {
  let val = await formRef.value.validate();
  if (val) return;
  let res = await siteInfoUpdateApi(siteForm);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
}
</script>
<style lang="scss">
.site_config {
  display: flex;

  .left {
    width: 50%;

    .site_config_update {
      margin-top: 10px;
    }
  }

  .arco-form {
    margin-top: 20px;
  }

  .right {
    width: 50%;
  }
}
</style>
