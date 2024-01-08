<template>
  <div class="article_list_view">
    <gvb-table
      :url="articleCollectsApi"
      :columns="columns"
      default-delete
      no-confirm
      no-add
      no-edit
      :filter-group="filterGroup"
      ref="gvbTable"
      search-placeholder="搜索文章标题"
    >
      <template #banner_url="{ record }: { record: articleType }">
        <a-image
          :src="record.banner_url"
          height="50px"
          style="border-radius: 5px"
        ></a-image>
      </template>
      <template #data="{ record }: { record: articleType }">
        <div class="article_data_col">
          <span>
            <i class="fa fa-eye"></i>
            <span>{{ record.look_count }}</span>
          </span>
          <span>
            <i class="fa fa-thumbs-o-up"></i>
            <span>{{ record.digg_count }}</span>
          </span>
          <span>
            <i class="fa fa-comments"></i>
            <span>{{ record.comment_count }}</span>
          </span>
          <span>
            <i class="fa fa-star"></i>
            <span>{{ record.collects_count }}</span>
          </span>
        </div>
      </template>
      <template #tags="{ record }: { record: articleType }">
        <div class="article_tags_col">
          <a-tag
            v-for="(item, index) in record.tags"
            :color="colorList[index]"
            >{{ item }}</a-tag
          >
        </div>
      </template>
      <template #title="{ record }: { record: articleType }">
        <div class="article_title_col" v-html="record.title"></div>
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import GvbTable from "@/components/admin/table.vue";
import { ref } from "vue";
import type { articleType } from "@/api/article";
import type { filterOptionType } from "@/components/admin/table.vue";
import { articleCategoryListApi } from "@/api/article";
import { tagOptionsApi } from "@/api/tag";
import { articleCollectsApi } from "@/api/article";

const gvbTable = ref();

const colorList = [
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray",
];

const filterGroup: filterOptionType[] = [
  {
    label: "文章分类",
    column: "category",
    source: articleCategoryListApi,
  },
  {
    label: "文章标签",
    column: "tag",
    source: tagOptionsApi,
  },
];

const columns = [
  { title: "标题", slotName: "title" },
  { title: "分类", dataIndex: "category" },
  { title: "封面", slotName: "banner_url" },
  { title: "作者", dataIndex: "user_nick_name" },
  { title: "标签", slotName: "tags" },
  { title: "文章数据", slotName: "data" },
  { title: "收藏时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];
</script>

<style lang="scss">
@mixin marginRight($width) {
  margin-right: $width;
  &:last-child {
    margin-right: 0;
  }
}

.article_list_view {
  .article_data_col {
    > span {
      color: var(--color-text-2);
      @include marginRight(10px);

      i {
        margin-right: 5px;
      }
    }
  }

  .article_tags_col {
    .arco-tag {
      @include marginRight(5px);
    }
  }

  .article_title_col {
    em {
      color: rgb(var(--red-6));
    }
  }
}
</style>
