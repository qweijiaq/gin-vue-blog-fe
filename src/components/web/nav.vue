<template>
  <div :class="{ nav: true, isShow: isShow }">
    <div class="nav_container">
      <div class="left">
        <a class="nav_logo" href="/">
          <div class="slogan">{{ store.siteInfo.slogan }}</div>
          <div class="en_slogan">{{ store.siteInfo.slogan_en }}</div>
        </a>
        <div class="nav_list">
          <template v-for="item in navList">
            <a
              target="_blank"
              :href="item.path"
              v-if="item.path.startsWith('http')"
              :title="item.title"
              >{{ item.title }}</a
            >
            <a
              :href="item.path"
              :title="item.title"
              v-else-if="item.title === '大模型'"
              :class="{
                'router-link-active router-link-exact-active':
                  (route.path as string).startsWith('/bigModel'),
              }"
              >{{ item.title }}</a
            >
            <router-link :to="item.path" v-else>{{ item.title }}</router-link>
          </template>
        </div>
        <gvb-search></gvb-search>
      </div>
      <div class="right">
        <div class="theme">
          <gvb-theme />
        </div>
        <div class="login" v-if="!store.isLogin">
          <router-link :to="{ name: 'login' }">登录</router-link>
        </div>
        <div class="user_info" v-else>
          <gvb-user-info-menu></gvb-user-info-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GvbTheme from "@/components/common/theme.vue";
import { useStore } from "@/stores";
import GvbUserInfoMenu from "@/components/common/user_info_menu.vue";
import { menuNameListApi } from "@/api/menu";
import type { menuNameType } from "@/api/menu";
import { ref, reactive } from "vue";
import { onUnmounted } from "vue";
import GvbSearch from "@/components/web/search.vue";
import { bigModelSettingsApi } from "@/api/big_model";
import type { bigModelSettingsType } from "@/api/big_model";
import { useRoute } from "vue-router";

const route = useRoute();

interface Props {
  noScroll?: boolean; // 不需要滚动监听
}

const props = defineProps<Props>();
const { noScroll = false } = props;

const store = useStore();

const navList = ref<menuNameType[]>([]);

const isShow = ref(true);

if (!noScroll) {
  isShow.value = false;
  window.addEventListener("scroll", scroll);
  scroll();
}

function scroll() {
  let top = document.documentElement.scrollTop;
  if (top >= 200) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
}

onUnmounted(() => {
  if (!noScroll) {
    window.removeEventListener("scroll", scroll);
  }
});

const bigModelData = reactive<bigModelSettingsType>({
  name: "",
  enable: false,
  order: 0,
  access_key_id: "",
  access_key_secret: "",
  agent_key: "",
  app_id: "",
  title: "",
  prompt: "",
  slogan: "",
  help: "",
});

async function getData() {
  const val = sessionStorage.getItem("navList");
  if (val !== null) {
    try {
      navList.value = JSON.parse(val);
      return;
    } catch (e) {}
  }
  let res = await menuNameListApi();
  navList.value = res.data;
  // 请求大模型参数
  let bigModelRes = await bigModelSettingsApi();
  Object.assign(bigModelData, bigModelRes.data);
  if (bigModelData.enable) {
    // 大模型启用
    navList.value.splice(bigModelData.order, 0, {
      id: 12345,
      title: "大模型",
      path: "/bigModel/square",
    });
  }
  sessionStorage.setItem("navList", JSON.stringify(navList.value));
}

getData();
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  position: fixed;
  transition: all 0.3s;
  color: var(--nav_text_color);
  z-index: 100;

  &.isShow {
    background-color: var(--color-bg-1);
    color: var(--color-text-1);
    box-shadow: 5px 0 5px 0 rgba(0, 0, 0, 0.1);

    a {
      color: var(--color-text-1);
    }
  }

  a {
    text-decoration: none;
    color: var(--nav_text_color);

    &.router-link-exact-active {
      color: var(--active);
    }
  }

  .nav_container {
    width: var(--container_width);
    height: 60px;
    display: flex;
    align-items: center;

    .left {
      width: 70%;
      display: flex;
      align-items: center;

      .nav_logo {
        margin-right: 40px;

        .slogan {
          font-size: 21px;
        }

        .en_slogan {
          font-size: 12px;
          margin-top: 2px;
        }
      }

      .nav_list {
        > a {
          margin-right: 30px;
          font-size: 16px;
        }
      }

      .search {
        svg {
          cursor: pointer;
        }
      }
    }

    .right {
      width: 30%;
      display: flex;
      justify-content: end;

      .theme {
        margin-left: 20px;
        display: flex;
        align-items: center;

        svg {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
