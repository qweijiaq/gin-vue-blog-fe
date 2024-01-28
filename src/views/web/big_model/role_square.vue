<template>
  <div class="role_square_view">
    <div class="banner">
      <!-- <div class="head">{{ store.bigModelInfo.title }}</div>
      <div class="slogan">{{ store.bigModelInfo.slogan }}</div> -->
    </div>
    <div class="role_tags">
      <span
        :class="{ item: true, active: item.id === activeTag }"
        @click="checkTag(item)"
        v-for="item in tagList"
        >{{ item.title }}</span
      >
    </div>
    <div class="role_list">
      <div class="item" @click="checkRole(item)" v-for="item in useRoleList">
        <img :src="item.icon" alt="" />
        <a-typography-text class="title" :ellipsis="{ rows: 1, css: true }">{{
          item.name
        }}</a-typography-text>
        <a-typography-text class="abs" :ellipsis="{ rows: 2, css: true }">{{
          item.abstract
        }}</a-typography-text>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@/assets/font.css";
import { useStore } from "@/stores";
import { squareListApi } from "@/api/big_model";
import { ref } from "vue";
import type { squareType, roleSampleType } from "@/api/big_model";
import { checkRole } from "@/service/checkRole";

const store = useStore();

const activeTag = ref<number>(0);
const tagList = ref<squareType[]>([]);
const useRoleList = ref<roleSampleType[]>([]);

async function getData() {
  let res = await squareListApi();
  tagList.value = res.data;
  if (tagList.value.length > 0) {
    checkTag(tagList.value[0]);
  }
}
getData();

function checkTag(record: squareType) {
  useRoleList.value = record.roleList;
  activeTag.value = record.id;
}
</script>

<style lang="scss" scoped>
.role_square_view {
  width: 100%;
  background-color: var(--color-bg-1);
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  border-radius: 5px;

  .banner {
    .head {
      text-align: center;
      font-size: 30px;
      margin-top: 20px;
      font-family: kuaikan;
      color: var(--active);
    }

    .slogan {
      margin-top: 30px;
      font-size: 20px;
      text-align: center;
      color: var(--color-text-2);
    }
  }

  .role_tags {
    margin-top: 60px;

    .item {
      cursor: pointer;
      margin-right: 20px;
      padding: 10px 30px;
      border-radius: 20px;
      background-color: var(--color-fill-2);
      color: var(--color-text-2);

      &:hover {
        background-color: var(--active);
        color: white;
      }
      &.active {
        background-color: var(--active);
        color: white;
      }
    }
  }

  .role_list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-row-gap: 40px;
    grid-column-gap: 40px;
    width: 100%;
    margin-top: 60px;
    justify-content: space-between;

    .item {
      height: 240px;
      background-color: var(--color-fill-1);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-10px);
        background-color: var(--color-fill-2);
        box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.05);
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .title {
        font-size: 18px;
        margin-top: 10px;
      }

      .abs {
        font-size: 14px;
        color: var(--color-text-2);
        margin-top: 5px;
      }
    }
  }
}
</style>
