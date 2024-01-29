<template>
  <div class="big_model_view">
    <gvb-nav no-scroll></gvb-nav>
    <main>
      <div class="menu">
        <div class="head">
          <router-link :to="{ name: 'role_square' }">角色广场</router-link>
        </div>
        <div class="role_list">
          <div
            :class="{
              item: true,
              active: Number(route.query.roleID) === item.id,
            }"
            @click="checkRole(item)"
            v-for="item in store.userRoleHistoryList"
          >
            <img class="avatar" :src="item.icon" alt="" />
            <div class="content">
              <a-typography-text
                class="name"
                :ellipsis="{ rows: 1, css: true }"
                >{{ item.name }}</a-typography-text
              >
              <a-typography-text
                class="abs"
                :ellipsis="{ rows: 2, css: true }"
                >{{ item.abstract }}</a-typography-text
              >
            </div>
          </div>
        </div>
      </div>
      <div class="view">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import GvbNav from "@/components/web/nav.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { useStore } from "@/stores";
import { checkRole } from "@/service/checkRole";

const route = useRoute();
const store = useStore();

watch(
  () => store.isLogin,
  () => {
    store.getUserRoleHistoryList();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.big_model_view {
  main {
    margin-top: 60px;
    height: calc(100vh - 60px);
    padding: 20px 40px;
    display: flex;
    .menu {
      width: 240px;
      background-color: var(--color-bg-1);
      height: 100%;
      border-radius: 5px;

      .head {
        padding: 20px 20px 10px 20px;
        border-bottom: 1px solid var(--bg);
        display: flex;
        justify-content: center;
      }
    }

    .view {
      margin-left: 20px;
      width: calc(100% - 240px);
    }

    .role_list {
      overflow-y: auto;
      height: calc(100% - 50px);

      .item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 20px;

        &.active {
          background-color: var(--color-fill-4);
        }

        &:hover {
          background-color: var(--color-fill-1);
        }

        &:last-child {
          margin-bottom: 0;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .content {
          margin-left: 10px;

          .name {
            margin-bottom: 0;
          }

          .abs {
            font-size: 12px;
            color: var(--color-text-2);
            margin-top: 5px;
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
@/service/checkRole
