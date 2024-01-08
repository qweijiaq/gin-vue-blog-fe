<template>
  <div class="home_view">
    <gvb-home-welcome></gvb-home-welcome>
    <div class="main">
      <div class="left">
        <gvb-card title="快捷入口" class="quick_entry">
          <div class="item" v-for="item in quickEntryList">
            <div class="icon" @click="goLink(item)">
              <component :is="item.font"></component>
            </div>
            <div class="text">{{ item.text }}</div>
          </div>
        </gvb-card>
        <gvb-card class="statistics" title="数据统计">
          <gvb-login-data-chart></gvb-login-data-chart>
        </gvb-card>
      </div>
      <div class="right">
        <gvb-card title="更新日志" class="update_log">
          <div class="item" v-for="(item, index) in updateLogList">
            <div class="line1">
              <span>
                <span class="index">{{ index + 1 }}.</span>
                <span class="content"
                  ><a-typography-paragraph
                    :ellipsis="{
                      rows: 1,
                      showTooltip: true,
                      css: true,
                    }"
                    >{{ item.title }}</a-typography-paragraph
                  ></span
                >
              </span>
              <span class="date" :title="dateFormat(item.created_at)">{{
                relativeCurrentTime(item.created_at)
              }}</span>
            </div>
            <ul class="line2" v-if="item.items">
              <li v-for="li in item.items">{{ li }}</li>
            </ul>
          </div>
        </gvb-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GvbCard from "@/components/common/card.vue";
import type { Component } from "vue";
import {
  IconSettings,
  IconUser,
  IconMessage,
  IconBook,
  IconUserGroup,
} from "@arco-design/web-vue/es/icon";
import router from "@/router";
import { relativeCurrentTime, dateFormat } from "@/utils/timeFormat";
import GvbLoginDataChart from "@/components/chart/login_data_chart.vue";
import GvbHomeWelcome from "@/components/admin/home_welcome.vue";
import { h } from "vue";
import { defineComponent } from "vue";
import { useStore } from "@/stores";

const store = useStore();
interface quickEntryType {
  font: Component;
  text: string; // 文字
  name?: string; // 路由的名称
  link?: string; // 可以跳外部链接
}

let quickEntryList: quickEntryType[] = [
  {
    font: IconUser,
    text: "个人信息",
    name: "mineInfo",
  },
  {
    font: IconMessage,
    text: "群聊管理",
    name: "chatList",
  },
  {
    font: IconSettings,
    text: "系统日志",
    name: "logList",
  },
  {
    font: defineComponent({
      render: () => {
        return h("i", { class: "fa fa-comments" });
      },
    }),
    text: "评论列表",
    name: "commentList",
  },
  {
    font: IconBook,
    text: "文章列表",
    name: "articleList",
  },
  {
    font: IconUserGroup,
    text: "用户列表",
    name: "userList",
  },
];

if (store.isGeneral) {
  quickEntryList = [
    {
      font: IconUser,
      text: "个人信息",
      name: "userInfo",
    },
  ];
}

function goLink(item: quickEntryType) {
  if (item.name) {
    router.push({
      name: item.name,
    });
    return;
  }
  if (item.link) {
    window.open(item.link, "_blank");
  }
}

interface updateLogType {
  id?: number;
  title: string;
  created_at: string;
  items?: string[];
}

const updateLogList: updateLogType[] = [
  {
    title: " 二代博客重磅更新，日志功能优化，群聊功能大更新",
    created_at: "2024-01-01",
    items: [
      "技术栈：Gin Vue3 TypeScript ArcoDesign",
      "经过原型设计，UI 设计的全新博客系统",
      "全新的后台管理系统",
      "丰富可玩的配置项功能",
      "聊天室可发图片，支持 Markdown 语法",
      "系统设置新增帮助",
      "前端 Mock 数据，可独立运行",
      "移动端单独开发",
    ],
  },
  {
    title: "一代博客，前后端不分离（基于django）",
    created_at: "2022-09-01",
    items: ["技术栈：Django Python Vue2 JavaScript ElementUI"],
  },
];
</script>

<style lang="scss">
.home_view {
  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .left {
      width: 70%;

      .quick_entry {
        .body {
          display: flex;
          overflow: hidden;
        }

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 50px;
          align-items: center;

          &:last-child {
            margin-right: 0;
          }

          .icon {
            background-color: var(--color-fill-2);
            border-radius: 10px;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            transition: all 0.3s;
            cursor: pointer;

            svg {
              transition: all 0.3s;
            }

            &:hover {
              transform: scale(1.05);

              svg {
                transform: scale(1.2);
              }
            }
          }

          .text {
            margin-top: 5px;
            color: var(--color-text-2);
          }
        }
      }

      .statistics {
        margin-top: 20px;
      }
    }

    .right {
      width: calc(30% - 20px);

      .update_log {
        .item {
          color: var(--color-text-2);
          margin-bottom: 15px;

          .line1 {
            display: flex;
            align-items: center;
            justify-content: space-between;

            > span {
              display: flex;
              align-items: center;
              white-space: nowrap;

              .index {
                margin-right: 10px;
              }
            }

            .content {
              display: flex;

              .arco-typography {
                margin-bottom: 0;
                display: inline-block;
              }
            }
          }

          .line2 {
            margin: 5px 0;
            line-height: 1.5rem;
          }
        }
      }
    }
  }
}
</style>
