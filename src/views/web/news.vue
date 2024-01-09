<template>
  <div class="news_view">
    <gvb-nav></gvb-nav>
    <gvb-banner></gvb-banner>
    <main>
      <div class="container">
        <div class="news_detail">
          <aside>
            <div
              @click="checkAside(item)"
              :class="{ item: true, active: params.id === item.id }"
              v-for="item in newsAside"
            >
              <img :src="item.font" alt="" />
              <span>{{ item.name }}</span>
            </div>
          </aside>
          <div class="content">
            <div class="head">
              <img :src="activeFont" alt="" />
              <span>{{ activeName }} · 热搜榜</span>
            </div>
            <div class="body">
              <div class="item" v-for="item in newsList">
                <span class="index">{{ item.index }}</span>
                <span class="title">
                  <a :href="item.link" target="_blank">{{ item.title }}</a>
                </span>
                <span class="hot">{{ item.hotValue }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="link">
          <a href="https://go.itab.link/" target="_blank">灵感来源于 itab</a>
        </div>
      </div>
    </main>
    <gvb-footer></gvb-footer>
  </div>
</template>
<script setup lang="ts">
import GvbNav from "@/components/web/nav.vue";
import GvbBanner from "@/components/web/banner.vue";
import GvbFooter from "@/components/web/footer.vue";
import { reactive, ref } from "vue";
import { computed } from "vue";
import type { newsType } from "@/api/news";
import { newsListApi } from "@/api/news";

interface newsAsideType {
  id: string;
  name: string;
  font: string;
}

const newsAside: newsAsideType[] = [
  {
    id: "KqndgxeLl9",
    name: "微博",
    font: "/image/icon/weibo.png",
  },
  {
    id: "mproPpoq6O",
    name: "知乎",
    font: "/image/icon/zhihu.png",
  },
  {
    id: "WnBe01o371",
    name: "微信",
    font: "/image/icon/weixin.png",
  },
];

const params = reactive({
  id: "KqndgxeLl9",
  size: 50,
});

function checkAside(item: newsAsideType) {
  params.id = item.id;
  getData();
}

const activeFont = computed(() => {
  return (newsAside.find((item) => params.id === item.id) as newsAsideType)
    .font;
});

const activeName = computed(() => {
  return (newsAside.find((item) => params.id === item.id) as newsAsideType)
    .name;
});

const newsList = ref<newsType[]>([]);

async function getData() {
  let res = await newsListApi(params);
  newsList.value = res.data;
}

getData();
</script>
<style lang="scss">
.news_view {
  main {
    display: flex;
    margin-top: 20px;
    justify-content: center;
    margin-bottom: 20px;

    .container {
      width: var(--container_width);
      display: flex;
      flex-direction: column;
      align-items: center;

      .news_detail {
        width: 100%;
        background-color: var(--color-bg-1);
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;

        aside {
          width: 240px;
          border-right: 1px solid var(--bg);
          padding: 20px 0;

          .item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            color: var(--color-text-2);
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              color: var(--active);
            }

            &.active {
              background-color: var(--active);
              color: white;
            }

            img {
              width: 30px;
              height: 30px;
              border-radius: 5px;
            }

            span {
              margin-left: 10px;
            }
          }
        }

        .content {
          width: calc(100% - 240px);

          .head {
            height: 60px;
            border-bottom: 1px solid var(--bg);
            display: flex;
            align-items: center;
            padding: 0 20px;

            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: block;
            }

            span {
              font-size: 18px;
              margin-left: 10px;
            }
          }

          .body {
            padding: 20px;

            .item {
              display: flex;
              justify-content: space-between;
              color: var(--color-text-2);
              margin-bottom: 10px;
              align-items: center;

              .index {
                background-color: var(--color-fill-2);
                width: 20px;
                height: 20px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
              }

              a {
                color: var(--color-text-2);
              }

              .title {
                width: 90%;
              }

              .hot {
                white-space: nowrap;
              }

              &:nth-child(1) {
                .index {
                  background-color: #fe2d46;
                  color: white;
                }
              }

              &:nth-child(2) {
                .index {
                  background-color: #ff6600;
                  color: white;
                }
              }

              &:nth-child(3) {
                .index {
                  background-color: #faa90e;
                  color: white;
                }
              }
            }
          }
        }
      }

      .link a {
        color: var(--color-text-2);
      }
    }
  }
}
</style>
