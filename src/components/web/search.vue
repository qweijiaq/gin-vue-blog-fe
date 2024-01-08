<template>
  <a-modal
    title="全文搜索"
    width="40%"
    v-model:visible="visible"
    :footer="false"
    body-class="gvb_search_body"
  >
    <div class="head">
      <a-input-search
        v-model="params.key"
        @keydown.enter="search"
        @search="search"
        ref="searchRef"
        placeholder="全文搜索"
        search-button
      ></a-input-search>
    </div>
    <template v-if="data.list.length">
      <div class="body">
        <div class="item" @click="goTo(item)" v-for="item in data.list">
          <div class="title">{{ item.title }}</div>
          <div class="content" v-html="item.body"></div>
        </div>
      </div>
      <div class="footer">共搜索到结果{{ data.count }}条</div>
    </template>
  </a-modal>
  <div class="gvb_search">
    <IconSearch @click="showSearch"></IconSearch>
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";
import { nextTick } from "vue";
import type { listDataType, paramsType } from "@/api";
import type { articleSearchType } from "@/api/article";
import { articleSearchApi } from "@/api/article";

const visible = ref(false);
const params = reactive<paramsType>({});

const searchRef = ref();
const data = reactive<listDataType<articleSearchType>>({
  list: [],
  count: 0,
});

function showSearch() {
  visible.value = true;
  nextTick(() => {
    searchRef.value.focus();
  });
}

async function search() {
  let res = await articleSearchApi(params);
  data.count = res.data.count;
  data.list = res.data.list;
}

function goTo(item: articleSearchType) {
  window.open(`/article/${item.slug}`, "_blank");
}
</script>
<style lang="scss">
.gvb_search_body {
  padding: 0;

  .head {
    padding: 20px;
  }

  .body {
    max-height: 50vh;
    overflow-y: auto;
    color: var(--color-text-2);

    .item {
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-fill-2);
      }

      .title {
        color: var(--color-text-1);
        font-size: 16px;
        margin-bottom: 5px;
      }

      em {
        color: var(--hightColor);
      }
    }
  }

  .footer {
    text-align: center;
    padding: 10px 0;
    color: var(--color-text-2);
  }
}
</style>
