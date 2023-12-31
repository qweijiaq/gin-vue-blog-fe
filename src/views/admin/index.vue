<template>
  <div class="admin">
    <aside>
      <gvb-logo />
      <gvb-menu />
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
import { IconHome, IconDown } from "@arco-design/web-vue/es/icon";
import GvbTabs from "@/components/admin/tabs.vue";
import GvbBreadcrumb from "@/components/admin/breadcrumb.vue";
import GvbMenu from "@/components/admin/menu.vue";
import GvbLogo from "@/components/admin/logo.vue";
import GvbTheme from "@/components/common/theme.vue";
import router from "@/router";

// goHome 去首页
function goHome() {
  router.push({ name: "index" });
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
    background-color: var(--color-bg-1);
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
      background-color: var(--color-bg-1);

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
