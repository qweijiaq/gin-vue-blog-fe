<template>
  <gvb-config
    title="高德配置"
    name="gaode"
    :left-width="40"
    :right-with="60"
    :label-span="isLaptops1 ? 4 : 3"
    :wrapper-span="isLaptops1 ? 20 : 21"
    :column="column"
    :help-data="helpList"
  >
    <template #alert>
      <a-alert style="margin-top: 20px"
        >高德key，获取用户所在城市的天气数据</a-alert
      >
    </template>
  </gvb-config>
</template>
<script setup lang="ts">
import GvbConfig from "@/components/admin/config.vue";
import type { configColumnType } from "@/types";
import type { gaodeType } from "@/api/settings";

const isLaptops1 = (window as any).isLaptops;

const column: configColumnType<gaodeType>[] = [
  {
    label: "启用",
    field: "enable",
    type: "boolean",
  },
  {
    label: "key",
    iptType: "password",
    field: "key",
    rules: [{ required: true, message: "请输入key" }],
    placeholder: "key",
  },
];

const helpList = [
  {
    title: "key",
    abs: "高德开放平台申请",
    content: `
<p>先去高德开放平台（<a href="https://lbs.amap.com/" target="_blank">https://lbs.amap.com/</a>）进行申请</p>
<p>然后创建一个web服务应用，勾选ip定位和天气查询，然后提交，等待审核</p>
<p>审核成功之后，就会 key这个参数</p>
<p>
<img src="https://image.fengfengzhidao.com/pic/20231005150903.png" alt="">
</p>
`,
  },
];
</script>
