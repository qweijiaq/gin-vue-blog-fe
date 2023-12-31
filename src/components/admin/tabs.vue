<template>
  <div class="tabs">
    <swiper :slides-per-view="slidesPerView" class="mySwiper">
      <swiper-slide v-for="(item, index) in tabList" :key="item.name">
        <span
          :class="{ tab_item: true, active: route.name === item.name }"
          @click="clickItem(item)"
          @click.middle="closeItem(item)"
        >
          {{ item.title }}
          <IconClose
            @click.stop="closeItem(item)"
            v-if="item.name !== 'home'"
          ></IconClose>
        </span>
      </swiper-slide>
    </swiper>

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
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted } from "vue";

const route = useRoute();

const slidesPerView = ref(12);

onMounted(() => {
  // 总宽度
  let mySwiper = document.querySelector(".mySwiper") as Element;
  let mySwiperWith = 1200;
  if (mySwiper != null) {
    mySwiperWith = mySwiper.clientWidth;
  }
  // 实际宽度
  let actual = document.querySelector(".swiper-wrapper") as Element;
  let actualWidth = 1200;
  if (mySwiper != null) {
    actualWidth = actual.scrollWidth;
  }

  if (actualWidth <= mySwiperWith) {
    return;
  }
  let swiperSlideList = document.querySelectorAll(
    ".swiper-wrapper .swiper-slide"
  );

  let sum = 0;
  let count = 0;

  for (const slide of swiperSlideList) {
    sum += slide.clientWidth;
    if (sum > mySwiperWith) {
      break;
    }
    count++;
  }
  slidesPerView.value = count;
});

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
    }
  }
);

watch(
  () => tabList.value.length,
  () => setStoreByTabList()
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

<style lang="scss">
.tabs {
  height: 30px;
  width: 100%;
  border-bottom: 1px solid var(--bg);
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--color-bg-1);

  .mySwiper {
    width: calc(100% - 94px);
    overflow: hidden;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;

    .swiper-wrapper {
      display: flex;
      justify-content: start;
      width: 100%;

      .swiper-slide {
        width: auto !important;
      }
    }
  }

  .tab_item {
    border-radius: 5px;
    border: 1px solid var(--bg);
    padding: 2px 8px;
    margin-right: 10px;
    cursor: pointer;

    &.active {
      background-color: var(--active);
      color: white;
      border: none;

      svg:hover {
        background-color: rgb(var(--arcoblue-4));
      }
    }

    svg {
      font-size: 12px;
      border-radius: 50%;

      &:hover {
        background-color: var(--bg);
      }
    }
  }

  .close_tab_item {
    position: absolute;
    right: 20px;
    margin-right: 0;
  }
}
</style>
