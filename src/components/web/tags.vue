<template>
  <div class="tags">
    <div
      :class="{ item: true, active: active === item.tag }"
      v-for="item in list"
    >
      <a href="javascript:void (0)" @click="checkTag(item)">
        <span>{{ item.tag }}</span>
        <span>x{{ item.count }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import type { tagType } from "@/api/tag";
import { useRoute } from "vue-router";
import { tagArticleListApi } from "@/api/tag";

const route = useRoute();

const active = ref<string>(route.query.tag as string);

const list = ref<tagType[]>([]);

async function getData() {
  let res = await tagArticleListApi();
  list.value = res.data.list;
}

getData();

function checkTag(item: tagType) {
  if (active.value === item.tag) {
    // 第二次点一样的
    active.value = "";
  } else {
    active.value = item.tag;
  }

  router.push({
    query: {
      tag: active.value,
    },
  });
}
</script>

<style lang="scss" scoped>
.tags {
  position: relative;

  @keyframes box_move {
    0% {
      left: -20px;
      top: -20px;
    }
    25% {
      left: 100%;
      top: -20px;
    }
    50% {
      left: 100%;
      top: 100%;
    }
    75% {
      top: 100%;
      left: -20px;
    }
    100% {
      left: -20px;
      top: -20px;
    }
  }

  &::after {
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: var(--active);
    content: "";
    left: -20px;
    top: -20px;
    animation-name: box_move; // 应用哪个动画
    animation-duration: 5s; // 动画执行的时间
    animation-iteration-count: infinite; // 重复执行
  }

  .item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-2);
    background-color: var(--color-fill-1);
    width: 50%;
    height: 40px;

    &:nth-child(4n + 1),
    &:nth-child(4n + 2) {
      background-color: var(--color-fill-2);
    }

    &:nth-child(4n + 1),
    &:nth-child(4n + 3) {
      border-right: 1px solid var(--bg);
    }

    a {
      color: var(--color-text-2);
      text-decoration: none;
    }

    &.active {
      a {
        color: var(--active);
      }
    }

    span:nth-child(1) {
      margin-right: 5px;
    }

    span:nth-child(2) {
      font-size: 12px;
    }
  }
}
</style>
