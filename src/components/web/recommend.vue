<template>
  <gvb-card title="文章推荐">
    <div class="gvb_recommend">
      <div class="item" v-for="item in data.list">
        <div class="cover">
          <img :src="item.banner_url" alt="" />
        </div>
        <div class="info">
          <div class="title">
            <a :href="`/detail/${item.id}`">{{ item.title }}</a>
          </div>
          <div class="abstract">
            <a-typography-paragraph :ellipsis="{ rows: 2 }">{{
              item.abstract
            }}</a-typography-paragraph>
          </div>
          <div class="date">
            <div class="left">{{ relativeCurrentTime(item.created_at) }}</div>
            <div class="right">
              <i class="fa fa-eye"></i>
              <span>{{ item.look_count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #head-right>
      <div class="head_right">
        <a
          :class="{ active: params.category === item.value }"
          href="javascript:void (0)"
          @click="checkCategory(item)"
          v-for="item in categoryList"
          >{{ item.label }}</a
        >
      </div>
    </template>
  </gvb-card>
</template>

<script setup lang="ts">
import type { articleParamsType, articleType } from "@/api/article";
import { reactive, ref } from "vue";
import { relativeCurrentTime } from "@/utils/timeFormat";
import GvbCard from "@/components/common/card.vue";
import { articleCategoryListApi, articleRecommendListApi } from "@/api/article";
import type { optionType } from "@/types";
import type { listDataType } from "@/api";

const categoryList = ref<optionType[]>([]);
async function getCategory() {
  let res = await articleCategoryListApi();
  categoryList.value = res.data;
}

getCategory();
const data = reactive<listDataType<articleType>>({
  list: [],
  count: 0,
});

const params = reactive<articleParamsType>({
  category: "",
});

async function getData() {
  let res = await articleRecommendListApi(params);
  data.list = res.data.list;
  data.count = res.data.count;
}

getData();

function checkCategory(item: optionType) {
  if (params.category === item.value) {
    params.category = "";
  } else {
    params.category = item.value as string;
  }
  getData();
}
</script>

<style lang="scss">
.head_right {
  a {
    margin-left: 10px;
  }
  a.active {
    color: var(--active) !important;
  }
}

.gvb_recommend {
  .item {
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      content: "";
      background-color: rgba(black, 0.2);
    }

    .cover {
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      height: 180px;

      img {
        width: 100%;
        object-fit: cover;
        transition: all 0.3s;
      }
    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 10px;
      color: white;
      z-index: 1;
      transition: all 0.3s;
    }

    &:hover {
      .cover {
        img {
          transform: scale(1.05);
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    .abstract {
      margin-top: 5px;

      .arco-typography {
        margin-bottom: 0;
        color: white;
      }
    }

    .date {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;

      i {
        margin-right: 5px;
      }
    }

    .title {
      font-weight: 600;
      font-size: 16px;

      a {
        color: white;
      }
    }
  }
}
</style>
