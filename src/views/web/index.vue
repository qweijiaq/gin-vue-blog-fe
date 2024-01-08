<template>
  <div class="index_view">
    <gvb-nav></gvb-nav>
    <gvb-banner></gvb-banner>
    <main>
      <div class="container">
        <div class="left">
          <gvb-card title="今日热搜">
            <template #head-right>
              <router-link :to="{ name: 'news' }"
                >更多
                <IconDoubleRight></IconDoubleRight>
              </router-link>
            </template>
            <gvb-news />
          </gvb-card>
          <gvb-card title="文章日历">
            <gvb-article-calendar></gvb-article-calendar>
          </gvb-card>
          <gvb-card title="文章列表" class="article_card">
            <template #head-right>
              <a-input-search
                v-model="key"
                @search="search"
                @keydown.enter="search"
                placeholder="搜索文章标题"
              ></a-input-search>
            </template>
            <gvb-article-list ref="gvbArticleList"></gvb-article-list>
          </gvb-card>
        </div>
        <div class="right">
          <gvb-card title="独家推广">
            <gvb-advert></gvb-advert>
          </gvb-card>
          <gvb-card title="标签云">
            <gvb-tags></gvb-tags>
          </gvb-card>
          <gvb-recommend></gvb-recommend>
          <gvb-card title="个人名片">
            <gvb-user-card></gvb-user-card>
          </gvb-card>
          <gvb-card title="意见反馈">
            <gvb-feedback></gvb-feedback>
          </gvb-card>
        </div>
      </div>
    </main>
    <gvb-footer></gvb-footer>
  </div>
</template>

<script setup lang="ts">
import GvbNav from "@/components/web/nav.vue";
import GvbBanner from "@/components/web/banner.vue";
import GvbCard from "@/components/common/card.vue";

import { IconDoubleRight } from "@arco-design/web-vue/es/icon";
import GvbFooter from "@/components/web/footer.vue";
import GvbNews from "@/components/web/news.vue";
import GvbAdvert from "@/components/web/advert.vue";
import GvbUserCard from "@/components/web/user_card.vue";
import GvbFeedback from "@/components/web/feedback.vue";
import GvbArticleCalendar from "@/components/chart/article_calendar.vue";
import GvbArticleList from "@/components/web/article_list.vue";
import { ref } from "vue";
import GvbTags from "@/components/web/tags.vue";
import GvbRecommend from "@/components/web/recommend.vue";
import { menuListApi } from "@/api/menu";
import type { bannerType } from "@/api/menu";
import type { BannerType } from "@/components/web/banner.vue";
import { watch } from "vue";

const gvbArticleList = ref();

const key = ref("");

let bannerList: BannerType = {
  abstract: [],
  banner_time: 7,
  banners: [],
  slogan: "",
};

async function getData() {
  let res = await menuListApi({});
  let menuList = res.data.list;
  menuList.forEach((item) => {
    if (item.title === "首页") {
      if (item.banners.length > 0) {
        bannerList.abstract = item && item.abstract;
        bannerList.banner_time = item.banner_time;
        (item.banners as bannerType[]).forEach((banner) => {
          (bannerList.banners as bannerType[]).push(banner);
        });
        bannerList.slogan = item.slogan;
      } else {
        bannerList = {
          abstract: "",
          banner_time: 7,
          banners: "",
          slogan: "",
        };
      }
    }
  });
}
watch(
  () => bannerList.banners,
  () => {
    getData();
  },
  { immediate: true }
);

function search() {
  gvbArticleList.value.getData({ key: key.value });
}
</script>
<style lang="scss">
.index_view {
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .container {
      width: var(--container_width);
      display: flex;
      justify-content: space-between;

      > .right {
        width: 380px;
      }

      > .left {
        width: calc(100% - 400px);

        .article_card {
          background: none;

          .head {
            background-color: var(--color-bg-1);
            border-radius: 5px 5px 0 0;
          }

          .body {
            padding: 0;
          }
        }
      }

      .gvb_card {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
