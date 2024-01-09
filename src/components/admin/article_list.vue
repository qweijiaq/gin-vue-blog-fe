<template>
  <div class="article_list_view">
    <gvb-article-update
      v-model:visible="updateVisible"
      :data="recordData"
      @ok="getList"
    ></gvb-article-update>
    <gvb-article-drawer
      v-model:visible="createVisible"
      @ok="getList"
    ></gvb-article-drawer>
    <gvb-article-content-drawer
      v-model:visible="articleContentVisible"
      :id="articleUpdateId"
    ></gvb-article-content-drawer>
    <gvb-table
      :url="articleListApi"
      :columns="columns"
      default-delete
      add-label="发布文章"
      no-confirm
      :filter-group="filterGroup"
      ref="gvbTable"
      :default-params="params"
      @edit="editArticleInfo"
      @add="createVisible = true"
      search-placeholder="搜索文章标题"
    >
      <template #title="{ record }: { record: articleType }">
        <div class="article_title_col">
          <div v-html="record.title"></div>
          <a :href="`/detail/${record.id}`" target="_blank">访问</a>
        </div>
      </template>
      <template #banner_url="{ record }: { record: articleType }">
        <a-image
          :src="record.banner_url"
          height="50px"
          style="border-radius: 5px"
        ></a-image>
      </template>
      <template #article_data="{ record }: { record: articleType }">
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
      <template #article_tags="{ record }: { record: articleType }">
        <div class="article_tags_col">
          <a-tag
            v-for="(item, index) in record.tags"
            :color="articleTagColorList[index]"
            >{{ item }}</a-tag
          >
        </div>
      </template>
      <template #action_middle="{ record }: { record: articleType }">
        <a-button type="outline" @click="editArticleContent(record)"
          >编辑正文</a-button
        >
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import GvbTable from "@/components/admin/table.vue";
import { reactive, ref } from "vue";
import { articleListApi } from "@/api/article";
import type { articleType, articleUpdateType } from "@/api/article";
import type { filterOptionType } from "@/components/admin/table.vue";
import { articleCategoryListApi } from "@/api/article";
import { tagOptionsApi } from "@/api/tag";
import GvbArticleUpdate from "@/components/common/article_update.vue";
import GvbArticleDrawer from "@/components/common/article_drawer.vue";
import GvbArticleContentDrawer from "@/components/common/article_content_drawer.vue";
import type { paramsType } from "@/api";
import { articleTagColorList } from "@/global";

interface Props {
  isUser?: boolean;
}

const props = defineProps<Props>();

const { isUser = false } = props;

const gvbTable = ref();

const params = reactive<paramsType & { is_user: boolean }>({
  is_user: isUser,
});
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
  { title: "标签", slotName: "article_tags" },
  { title: "文章数据", slotName: "article_data" },
  { title: "发布时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];

const updateVisible = ref(false);
const recordData = reactive<articleUpdateType>({
  id: "",
});

function editArticleInfo(record: articleType) {
  updateVisible.value = true;
  recordData.abstract = record.abstract;
  recordData.banner_id = record.banner_id;
  recordData.category = record.category;
  recordData.id = record.id;
  recordData.link = record.link;
  recordData.source = record.source;
  recordData.tags = record.tags;
  recordData.title = record.title;
  recordData.banner_url = record.banner_url;
  recordData.is_recommend = record.is_recommend;
}

function getList() {
  gvbTable.value.getList();
}

const createVisible = ref(false);
const articleContentVisible = ref(false);
const articleUpdateId = ref<string | undefined>(undefined);

function editArticleContent(record: articleType) {
  articleContentVisible.value = true;
  articleUpdateId.value = record.id;
}
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
    display: flex;
    align-items: center;

    em {
      color: rgb(var(--red-6));
    }
    a {
      margin-left: 5px;
    }
  }
}

@media screen and (min-width: 1400px) and (max-width: 1800px) {
  .arco-table-th:nth-child(7) {
    display: none;
  }
  .arco-table-td:nth-child(7) {
    display: none;
  }

  .arco-table-th:nth-child(8) {
    display: none;
  }
  .arco-table-td:nth-child(8) {
    display: none;
  }
}
</style>
