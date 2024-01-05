<template>
  <gvb-config
    title="QQ配置"
    name="qq"
    :left-width="45"
    :right-with="55"
    :label-span="isLaptops1 ? 6 : 4"
    :wrapper-span="isLaptops1 ? 18 : 20"
    :column="column"
    :help-data="helpList"
  >
    <template #alert>
      <a-alert style="margin-top: 20px"
        >配置qq代登录之后，登录页面点击qq才会有反应</a-alert
      >
    </template>
  </gvb-config>
</template>

<script setup lang="ts">
import GvbConfig from "@/components/admin/config.vue";
import type { configColumnType } from "@/types";
import type { qqType } from "@/api/settings";

const isLaptops1 = (window as any).isLaptops;

const column: configColumnType<qqType>[] = [
  {
    label: "appID",
    field: "app_id",
    rules: [{ required: true, message: "请输入appID" }],
    placeholder: "appID",
  },
  {
    label: "appKey",
    iptType: "password",
    field: "key",
    rules: [{ required: true, message: "请输入appKey" }],
    placeholder: "appKey",
  },
  {
    label: "回调地址",
    field: "redirect",
    rules: [{ required: true, message: "请输入回调地址" }],
    placeholder: "回调地址",
  },
];

const helpList = [
  {
    title: "appID，appKey",
    abs: "QQ互联中去申请",
    content: `
<p>先去qq互联（<a href="https://connect.qq.com/" target="_blank">https://connect.qq.com/</a>）进行实名认证</p>
<p>然后创建一个网站应用，等待审核</p>
<p>审核成功之后，就会有app ID，APP Key</p>
<p>
<img src="https://image.fengfengzhidao.com/pic/20230930170351.png" alt="">
</p>
`,
  },
  {
    title: "回调地址",
    abs: "qq登录成功之后，回调的地址",
    content: `
    <img src="https://image.fengfengzhidao.com/pic/20231015125350.png">
    `,
  },
];
</script>
