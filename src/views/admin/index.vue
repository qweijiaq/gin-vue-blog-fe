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
        <a-menu :default-open-keys="['0']" :default-selected-keys="['0_2']">
          <a-sub-menu key="0">
            <template #icon><icon-apps></icon-apps></template>
            <template #title>Navigation 1</template>
            <a-menu-item key="0_0">Menu 1</a-menu-item>
            <a-menu-item key="0_1">Menu 2</a-menu-item>
            <a-menu-item key="0_2">Menu 3</a-menu-item>
            <a-menu-item key="0_3">Menu 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="1">
            <template #icon><icon-bug></icon-bug></template>
            <template #title>Navigation 2</template>
            <a-menu-item key="1_0">Menu 1</a-menu-item>
            <a-menu-item key="1_1">Menu 2</a-menu-item>
            <a-menu-item key="1_2">Menu 3</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="2">
            <template #icon><icon-bulb></icon-bulb></template>
            <template #title>Navigation 3</template>
            <a-menu-item key="2_0">Menu 1</a-menu-item>
            <a-menu-item key="2_1">Menu 2</a-menu-item>
            <a-sub-menu key="2_2" title="Navigation 4">
              <a-menu-item key="2_2_0">Menu 1</a-menu-item>
              <a-menu-item key="2_2_1">Menu 2</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
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
        <router-view></router-view>
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
  IconBug,
  IconBulb,
  IconDown,
} from "@arco-design/web-vue/es/icon";
import GvbTabs from "@/components/admin/tabs.vue";
</script>

<style lang="scss">
.admin {
  display: flex;
  color: var(--color-text-1);

  aside {
    width: 240px;
    height: 100vh;
    border-right: 1px solid var(--bg);

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
</style>
