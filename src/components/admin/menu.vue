<template>
  <div class="menu">
    <a-menu
      @menu-item-click="clickMenuItem"
      v-model:selected-keys="selectedKeys"
      v-model:open-keys="openKeys"
      show-collapse-button
      @collapse="onCollapse"
    >
      <template v-for="item in menuList" :key="item.name">
        <a-menu-item :key="item.name" v-if="item.children?.length === 0">
          <template #icon><component :is="item.icon"></component></template>
          {{ item.title }}
        </a-menu-item>
        <a-sub-menu :key="item.name" v-if="item.children?.length !== 0">
          <template #icon><component :is="item.icon"></component></template>
          <template #title>{{ item.title }}</template>
          <a-menu-item :key="child.name" v-for="child in item.children">{{
            child.title
          }}</a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {
  IconApps,
  IconUser,
  IconBook,
  IconUserGroup,
  IconMessage,
  IconSettings,
} from "@arco-design/web-vue/es/icon";
import { watch, type Component } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();

interface MenuType {
  title: string;
  icon?: Component;
  name?: string; // 路由名字
  children: MenuType[];
}

const menuList: MenuType[] = [
  {
    title: "首页",
    icon: IconApps,
    name: "home",
    children: [],
  },
  {
    title: "个人中心",
    icon: IconUser,
    name: "center",
    children: [
      {
        title: "个人信息",
        name: "mineInfo",
        children: [],
      },
    ],
  },
  {
    title: "文章管理",
    icon: IconBook,
    name: "article",
    children: [
      {
        title: "文章列表",
        name: "articleList",
        children: [],
      },
    ],
  },
  {
    title: "用户管理",
    icon: IconUserGroup,
    name: "user",
    children: [
      {
        title: "用户列表",
        name: "userList",
        children: [],
      },
    ],
  },
  {
    title: "群聊管理",
    icon: IconMessage,
    name: "chat",
    children: [
      {
        title: "群聊记录",
        name: "chatList",
        children: [],
      },
    ],
  },
  {
    title: "系统管理",
    icon: IconSettings,
    name: "system",
    children: [
      {
        title: "菜单列表",
        name: "menuList",
        children: [],
      },
      {
        title: "日志列表",
        name: "logList",
        children: [],
      },
    ],
  },
];

const emits = defineEmits(["collapse"]);

function onCollapse(value: boolean, type: string) {
  emits("collapse", value);
}

const selectedKeys = ref([route.name]);
const openKeys = ref([route.matched[1].name]);

function clickMenuItem(name: string) {
  router.push({ name });
}

// 监听页面路由的变化，从而更改菜单栏对应的状态
watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name];
    openKeys.value = [route.matched[1].name];
  }
);
</script>

<style lang="scss" scoped></style>
