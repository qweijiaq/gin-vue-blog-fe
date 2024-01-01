<template>
  <div class="user_info_menu">
    <a-dropdown @select="select" class="drop">
      <div class="dropdown">
        <img :src="store.userInfo.avatar" alt="" />
        <span>{{ store.userInfo.nickname }}</span>
        <icon-down />
      </div>
      <template #content>
        <template v-for="(item, index) in dopList" :key="index">
          <a-dgroup v-if="item.type === 'line'"></a-dgroup>
          <a-doption v-else :value="item.name">{{ item.title }}</a-doption>
        </template>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { IconDown } from "@arco-design/web-vue/es/icon";
import { useStore } from "@/stores";
import type { tabType } from "@/types";
import router from "@/router";

const store = useStore();

interface dopType extends tabType {
  type?: string;
}

let dopList: dopType[] = [
  {
    name: "home",
    title: "管理系统",
  },
  {
    name: "",
    title: "",
    type: "line",
  },
  {
    name: "articleList",
    title: "文章列表",
  },
  {
    name: "userList",
    title: "用户列表",
  },
  {
    name: "logList",
    title: "系统日志",
  },
  {
    name: "",
    title: "",
    type: "line",
  },
  {
    name: "logout",
    title: "注销退出",
  },
];

function select(value: any) {
  let val = value as string;
  if (val === "logout") {
    store.logout();
    router.push({ name: "index" });
    return;
  }
  router.push({
    name: val,
  });
}
</script>

<style lang="scss">
.user_info_menu {
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

.drop {
  .arco-dropdown-group-title {
    margin-top: 0;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--bg);
      position: absolute;
      left: 0;
    }
  }
}
</style>
