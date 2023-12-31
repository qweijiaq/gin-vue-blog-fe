<template>
  <div class="tabs">
    <span
      :class="{ tab_item: true, active: route.name === item.name }"
      @click="clickItem(item)"
      @click.middle="closeItem(item)"
      v-for="item in tabList"
      :key="item.name"
      >{{ item.title
      }}<icon-close @click.stop="closeItem(item)" v-if="item.name !== 'home'"
    /></span>

    <span class="tab_item close_tab_item" @click="closeAllTab">全部关闭</span>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { IconClose } from "@arco-design/web-vue/es/icon";

const route = useRoute();

interface tabItem {
  name: string;
  title: string;
}

const tabList: Ref<tabItem[]> = ref([{ name: "home", title: "首页" }]);

function clickItem(item: tabItem) {
  router.push({ name: item.name });
}

// inList 判断名称在不在列表中
function inList(name: string): boolean {
  for (const tab of tabList.value) {
    if (tab.name === name) {
      return true;
    }
  }
  return false;
}

watch(
  () => route.name,
  () => {
    // 判断是否存在
    if (!inList(route.name as string)) {
      tabList.value.push({
        name: route.name as string,
        title: route.meta.title as string,
      });
      // 更新到store里面去
      setStoreByTabList();
    }
  }
);

// closeItem 点击关闭 tab
function closeItem(item: tabItem) {
  // 支持点击鼠标中键关闭
  // 这里主要是防止对「首页」点击鼠标中键时被删除
  if (item.name === "home") {
    return;
  }

  // 先删除点击的这个tab
  let index = tabList.value.findIndex((tab) => item.name === tab.name);
  tabList.value.splice(index, 1);
  setStoreByTabList();

  // 如果是点击当前所在页面
  if (item.name === (route.name as string)) {
    // 找到删除的那个tab的前一个
    let beforeIndex = index - 1;
    let beforeItem = tabList.value[beforeIndex];
    clickItem(beforeItem);
  }
}

// closeAllTab 关闭全部的tab
function closeAllTab() {
  tabList.value = [{ name: "home", title: "首页" }];
  // 如果当前页面路由不是「首页」，则跳转到「首页」
  if (route.name !== "home") {
    router.push({ name: "home" });
  }
  setStoreByTabList();
}

// setStoreByTabList 更新 tabs 到 store
function setStoreByTabList() {
  localStorage.setItem("tabList", JSON.stringify(tabList.value));
}

// loadStoreByTabList 加载 tabs
function loadStoreByTabList() {
  let val = localStorage.getItem("tabList");
  if (val === null) {
    return;
  }
  let tabs = [];
  try {
    tabs = JSON.parse(val);
  } catch (e) {
    return;
  }
  tabList.value = tabs;
}

loadStoreByTabList();
</script>

<style lang="scss" scoped>
.tabs {
  height: 30px;
  background-color: var(--color-bg-1);
  padding: 0 20px;
  border-bottom: 1px solid var(--bg);
  display: flex;
  align-items: center;
  position: relative;

  .tab_item {
    color: var(--color-text-1);
    background-color: var(--color-bg-1);
    border: 1px solid var(--bg);
    border-radius: 5px;
    height: 24px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;

    &.active {
      color: white;
      background-color: rgb(var(--arcoblue-6));

      &:hover {
        svg {
          background-color: rgb(var(--arcoblue-5));
        }
      }
    }

    &.close_tab_item {
      position: absolute;
      right: 20px;
      top: 3px;
    }

    svg {
      margin-left: 5px;
      font-size: 12px;
      border-radius: 50%;
    }

    &:hover {
      svg {
        background-color: var(--bg);
      }
    }
  }
}
</style>
