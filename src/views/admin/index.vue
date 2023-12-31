<template>
  <div class="admin">
    <aside>
      <div class="logo">
        <img src="https://skyao.io/learning-go/images/logo.png" alt="" />
        <div class="logo_title">
          <div>个人博客</div>
          <div>GopherBlog</div>
        </div>
      </div>
      <div class="menu">
        <a-menu
          @menu-item-click="clickMenuItem"
          v-model:selected-keys="selectedKeys"
          v-model:open-keys="openKeys"
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
    </aside>
    <main>
      <div class="head">
        <div class="breadcrumbs">
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>Channel</a-breadcrumb-item>
            <a-breadcrumb-item>News</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="actions">
          <div class="action_home"><icon-home class="action_icon" /></div>
          <div class="action_theme">
            <icon-sun-fill class="action_icon" />
            <icon-moon-fill class="action_icon" />
          </div>
          <div class="action_user_info_menu">
            <a-dropdown>
              <div class="dropdown">
                <img src="/image/logo1.png" alt="" />
                <span>xxx</span>
                <icon-down />
              </div>
              <template #content>
                <a-doption>Option 1</a-doption>
                <a-doption disabled>Option 2</a-doption>
                <a-doption>Option 3</a-doption>
                <a-doption>Option 4</a-doption>
                <a-doption>Option 5</a-doption>
                <a-doption>Option 6</a-doption>
                <a-doption>Option 7</a-doption>
                <a-doption>Option 8</a-doption>
                <a-doption>Option 9</a-doption>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
      <div class="tabs">
        <gvb-tabs />
      </div>
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  IconHome,
  IconSunFill,
  IconMoonFill,
  IconApps,
  IconUser,
  IconBook,
  IconUserGroup,
  IconMessage,
  IconSettings,
  IconDown,
} from "@arco-design/web-vue/es/icon";
import GvbTabs from "@/components/admin/tabs.vue";
import { type Component } from "vue";
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
    ],
  },
];

const selectedKeys = ref([route.name]);
const openKeys = ref([route.matched[1].name]);

function clickMenuItem(name: string) {
  router.push({ name });
}
</script>

<style lang="scss">
.admin {
  display: flex;
  color: var(--color-text-1);
  height: 100vh;

  aside {
    width: 240px;
    height: 100vh;
    border-right: 1px solid var(--bg);
    height: 100vh;

    .logo {
      height: 90px;
      display: flex;
      padding: 20px 0 20px 20px;
      align-items: center;
      border-bottom: 1px solid var(--bg);

      img {
        width: 60px;
        height: 60px;
      }

      .logo_title {
        margin-left: 20px;
        > div:nth-child(1) {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        > div:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }

  main {
    width: calc(100% - 240px);
    overflow-x: hidden;

    .head {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;

      .actions {
        display: flex;
        align-items: center;

        .action_user_info_menu {
          display: flex;
          align-items: center;

          .dropdown {
            display: flex;
            align-items: center;
            cursor: pointer;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }

            span {
              font-size: 14px;
              color: var(--text);
              margin: 0 5px;
            }
          }
        }

        .action_icon {
          margin-right: 10px;
          cursor: pointer;
          font-size: 16px;
        }
      }
    }

    .container {
      background-color: var(--bg);
      min-height: calc(100vh - 90px);
      padding: 20px;
    }
  }
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-out;
}
</style>
