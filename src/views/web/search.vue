<template>
  <div class="search_view">
    <gvb-nav no-scroll></gvb-nav>
    <main>
      <div class="container">
        <div class="head">
          <div class="slogan">{{ store.siteInfo.slogan }} | 搜索</div>
          <a-input
            class="search_ipt"
            v-model="params.key"
            @keydown.enter="getData"
            placeholder="搜索文章标题"
          ></a-input>
          <a-button type="primary" @click="getData">搜索</a-button>
        </div>
        <div class="action">
          <div class="item">
            <span
              @click="checkKey('sort', item)"
              :class="{ active: params.sort === item.value }"
              v-for="item in sortOption"
              >{{ item.label }}</span
            >
          </div>
          <div class="item">
            <span
              @click="checkKey('category', item)"
              :class="{ active: params.category === item.value }"
              v-for="item in categoryOptions"
              >{{ item.label }}</span
            >
          </div>
          <div class="item">
            <span
              @click="checkKey('tag', item)"
              :class="{ active: params.tag === item.value }"
              v-for="item in tagOptions"
              >{{ item.label }}</span
            >
          </div>
        </div>
        <div class="source">
          <template v-if="data.list.length">
            <div class="article_list">
              <div class="item" v-for="item in data.list">
                <div class="top">
                  <img :src="item.banner_url" alt="" />
                </div>
                <div class="bottom">
                  <div class="title">
                    <router-link
                      :to="{ name: 'article', params: { id: item.id } }"
                      v-html="item.title"
                    ></router-link>
                  </div>
                  <div class="abstract">
                    <a-typography-paragraph
                      :ellipsis="{
                        rows: 2,
                        css: true,
                      }"
                      >{{ item.abstract }}
                    </a-typography-paragraph>
                  </div>
                  <div class="data">
                    <span v-if="params.sort === 'digg_count desc'">
                      <i class="fa fa-thumbs-o-up"></i>
                      {{ item.digg_count }}
                    </span>
                    <span v-else-if="params.sort === 'comment_count desc'">
                      <i class="fa fa-comments"></i>
                      {{ item.comment_count }}
                    </span>
                    <span v-else-if="params.sort === 'collects_count desc'">
                      <i class="fa fa-star-o"></i>
                      {{ item.collects_count }}
                    </span>
                    <span v-else>
                      <IconEye></IconEye>
                      {{ item.look_count }}
                    </span>
                    <span>
                      <IconClockCircle></IconClockCircle>
                      {{ dateFormat(item.created_at) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="page">
              <a-pagination
                :total="data.count"
                v-model:current="params.page"
                show-total
                @change="getData"
              ></a-pagination>
            </div>
          </template>
          <a-empty v-else class="empty"></a-empty>
        </div>
      </div>
    </main>
    <gvb-footer></gvb-footer>
  </div>
</template>
<script setup lang="ts">
import GvbNav from "@/components/web/nav.vue";
import { reactive, ref } from "vue";
import type { optionType } from "@/types";
import type { articleParamsType, articleType } from "@/api/article";
import { articleCategoryListApi } from "@/api/article";
import { tagOptionsApi } from "@/api/tag";
import type { listDataType } from "@/api";
import { articleListApi } from "@/api/article";
import { IconEye } from "@arco-design/web-vue/es/icon";
import { IconClockCircle } from "@arco-design/web-vue/es/icon";
import { dateFormat } from "@/utils/timeFormat";
import GvbFooter from "@/components/web/footer.vue";
import { useStore } from "@/stores";

const store = useStore();
type sortType =
  | ""
  | "look_count desc"
  | "created_at desc"
  | "digg_count desc"
  | "comment_count desc"
  | "collects_count desc"
  | string;

const params = reactive<articleParamsType & { sort: sortType }>({
  sort: "",
  tag: "",
  category: "",
  limit: 8,
});

const sortOption = [
  { label: "综合排序", value: "" },
  { label: "最多浏览", value: "look_count desc" },
  { label: "最新发布", value: "created_at desc" },
  { label: "最多点赞", value: "digg_count desc" },
  { label: "最多评论", value: "comment_count desc" },
  { label: "最多收藏", value: "collects_count desc" },
];
const categoryOptions = ref<optionType[]>([]);
const tagOptions = ref<optionType[]>([]);

async function getCategoryOptions() {
  let res = await articleCategoryListApi();
  categoryOptions.value = [{ label: "全部分类", value: "" }, ...res.data];
}

getCategoryOptions();

async function getTagOptions() {
  let res = await tagOptionsApi();
  tagOptions.value = [{ label: "全部标签", value: "" }, ...res.data];
}

getTagOptions();

function checkKey(key: "sort" | "category" | "tag", item: optionType) {
  params[key] = item.value as string;
  getData();
}

const data = reactive<listDataType<articleType>>({
  list: [],
  count: 0,
});

async function getData() {
  let res = await articleListApi(params);
  data.list = res.data.list;
  data.count = res.data.count;
}

getData();
</script>
<style lang="scss">
.search_view {
  min-height: 100vh;

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 80px;
    color: var(--color-text-2);

    .container {
      width: var(--container_width);

      .head {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-bg-1);
        padding: 20px;
        border-radius: 5px 5px 0 0;

        .search_ipt {
          width: 400px;
          margin: 0 20px;
        }

        .slogan {
          font-size: 16px;
        }
      }

      .action {
        background-color: var(--color-bg-1);
        padding: 0 20px 20px 20px;
        border-radius: 0 0 5px 5px;

        .item {
          margin-bottom: 25px;

          &:last-child {
            margin-bottom: 0;
          }

          span {
            margin-right: 20px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            margin-bottom: 10px;

            &.active {
              background-color: var(--active);
              color: white;
            }
          }
        }
      }

      .source {
        margin-top: 20px;
        margin-bottom: 20px;
        min-height: calc(100vh - 485px);

        .article_list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-column-gap: 40px;
          grid-row-gap: 40px;

          .item {
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            background-color: var(--color-bg-1);
            color: var(--color-text-2);

            .top {
              height: 120px;
              width: 100%;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }

            a {
              color: var(--color-text-1);
              text-decoration: none;
            }

            .bottom {
              padding: 20px;
              background-color: var(--color-fill-1);

              .title {
                font-size: 16px;
                font-weight: 600;

                em {
                  color: #d71345;
                }
              }

              .abstract {
                margin: 10px 0;

                .arco-typography {
                  margin-bottom: 0;
                  color: var(--color-text-2);
                }
              }

              .data {
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }

        .page {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          border-radius: 5px;
          background-color: var(--color-bg-1);
          padding: 20px 0;
        }

        .empty {
          width: 100%;
          min-height: calc(100vh - 485px);
          background-color: var(--color-bg-1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
