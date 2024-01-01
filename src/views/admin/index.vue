<template>
  <div class="admin">
    <aside :class="{ isCollapsed: store.isCollapsed }">
      <gvb-logo :hidden="store.isCollapsed" />
      <gvb-menu @collapse="onCollapse" />
    </aside>
    <main>
      <div class="head">
        <div class="breadcrumbs">
          <gvb-breadcrumb />
        </div>
        <div class="actions">
          <div class="action_home">
            <icon-home class="action_icon" @click="goHome" />
          </div>
          <div class="action_theme">
            <gvb-theme />
          </div>
          <gvb-user-info-menu />
        </div>
      </div>
      <gvb-tabs />
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
import { IconHome } from "@arco-design/web-vue/es/icon";
import GvbTabs from "@/components/admin/tabs.vue";
import GvbBreadcrumb from "@/components/admin/breadcrumb.vue";
import GvbMenu from "@/components/admin/menu.vue";
import GvbLogo from "@/components/admin/logo.vue";
import GvbTheme from "@/components/common/theme.vue";
import GvbUserInfoMenu from "@/components/common/user_info_menu.vue";
import router from "@/router";
import { useStore } from "@/stores";

const store = useStore();

// goHome 去首页
function goHome() {
  router.push({ name: "index" });
}

function onCollapse(isCollapsed: boolean) {
  // true 代表折叠
  // false 代表展开
  store.setCollapsed(isCollapsed);
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
    background-color: var(--color-bg-2);
    transition: all 0.3s;
    position: relative;

    > .menu {
      height: calc(100vh - 90px);

      .arco-menu {
        position: inherit;
      }

      .arco-menu-collapse-button {
        opacity: 0;
        transition: all 0.3s;
        position: absolute;
        left: 240px;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &:hover {
      .arco-menu-collapse-button {
        opacity: 1;
      }
    }
  }

  aside.isCollapsed {
    width: 48px;
    transition: all 0.3s;

    .arco-menu-collapse-button {
      left: 48px;
    }

    & ~ main {
      width: calc(100vw - 48px);
    }
  }

  main {
    width: calc(100% - 240px);
    transition: all 0.3s;

    .head {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      background-color: var(--color-bg-2);

      .actions {
        display: flex;
        align-items: center;

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
