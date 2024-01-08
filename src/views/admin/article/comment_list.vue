<template>
  <div class="comment_list_view">
    <div class="article">
      <div class="head">
        <a-input-search placeholder="搜索文章标题"></a-input-search>
      </div>
      <div class="article_list">
        <div
          :class="{ item: true, active: articleID === item.id }"
          @click="checkItem(item)"
          v-for="item in articleList.list"
        >
          <div class="title">
            <a-typography-paragraph
              :ellipsis="{
                rows: 1,
                showTooltip: true,
                css: true,
              }"
              >{{ item.title }}
            </a-typography-paragraph>
          </div>
          <div class="count">{{ item.count }}</div>
          <div class="action">
            <IconDelete></IconDelete>
          </div>
        </div>
      </div>
      <div class="page">
        <a-pagination simple :total="articleList.count"></a-pagination>
      </div>
    </div>
    <div class="comment" v-if="articleID">
      <gvb-comment :article-id="articleID"></gvb-comment>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import type { listDataType, paramsType } from "@/api";
import type { commentArticleType } from "@/api/comment";
import { ref } from "vue";
import { IconDelete } from "@arco-design/web-vue/es/icon";
import { commentArticleListApi } from "@/api/comment";
import GvbComment from "@/components/common/comment.vue";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const articleID = ref<string>(route.query.id as string);

const articleList = reactive<listDataType<commentArticleType>>({
  list: [],
  count: 0,
});

const articleParams = reactive<paramsType>({});

async function getArticleList() {
  let res = await commentArticleListApi(articleParams);
  articleList.list = res.data.list;
  articleList.count = res.data.count;
}

getArticleList();

function checkItem(record: commentArticleType) {
  articleID.value = record.id;
  router.push({
    query: {
      id: record.id,
    },
  });
}
</script>
<style lang="scss">
.comment_list_view {
  display: flex;

  > div {
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .article {
    width: 280px;
    padding: 20px;
    position: relative;

    .head {
      margin-bottom: 10px;
    }

    .page {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

    .item {
      width: 100%;
      height: 60px;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      .title {
        width: 8rem;

        .arco-typography {
          margin-bottom: 0;
        }
      }

      &.active {
        background-color: var(--color-fill-2);
        border-radius: 5px;
      }
    }
  }

  .comment {
    width: calc(100% - 300px);
    margin-left: 20px;
  }
}
</style>
