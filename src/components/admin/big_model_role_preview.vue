<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import { useStore } from "@/stores";
import { IconSend } from "@arco-design/web-vue/es/icon";
import { dateTimeFormat } from "@/utils/timeFormat";
import type { bigModelRoleType } from "@/api/big_model";

interface Props {
  data: bigModelRoleType;
}
const props = defineProps<Props>();
const store = useStore();
</script>

<template>
  <div class="big_model_role_preview_view">
    <div class="head">
      <div>预览角色</div>
      <div>{{ props.data.name }}</div>
    </div>
    <div class="body">
      <div class="item">
        <div class="avatar">
          <img :src="props.data.icon" alt="" />
        </div>
        <div class="main">
          <div class="date">
            {{ dateTimeFormat(new Date().toLocaleString()) }}
          </div>
          <div class="content">
            <md-preview
              :model-value="props.data.prologue"
              :theme="store.themeString"
            ></md-preview>
          </div>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="btn">新话题</div>
      <div class="ipt">
        <IconSend></IconSend>
        <a-input placeholder="来说点什么吧...(Shift + Enter = 换行)"></a-input>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.big_model_role_preview_view {
  border: 1px solid var(--bg);
  border-radius: 5px;

  .head {
    border-bottom: 1px solid var(--bg);
    padding: 5px 0;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      &:last-child {
        font-size: 12px;
      }
    }
  }

  .body {
    padding: 20px;
    min-height: 500px;

    .item {
      display: flex;

      .avatar {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .main {
        margin-left: 10px;

        .date {
          font-size: 12px;
        }

        .content {
          background-color: var(--bg);
          padding: 5px;
          border-radius: 5px;
          margin-top: 5px;

          article > p:first-child {
            margin-top: 5px;
          }
        }
      }
    }
  }

  .menu {
    padding: 20px;
    display: flex;
    align-items: center;
    width: 100%;

    .btn {
      width: 80px;
      height: 30px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--active);
      color: white;
    }

    .ipt {
      width: 100%;
      position: relative;
      margin-left: 10px;

      svg {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-text-2);
      }

      .arco-input-wrapper {
        border-radius: 10px;
        pointer-events: none;
      }
    }
  }
}
</style>
