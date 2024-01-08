<template>
  <div class="news">
    <span class="index">{{ data.index }}</span>
    <a class="title" :href="data.link" target="_blank">{{ data.title }}</a>
    <span class="hot">{{ data.hotValue }}</span>
  </div>
</template>

<script setup lang="ts">
import type { newsType } from "@/api/news";
import { reactive } from "vue";
import { newsListApi } from "@/api/news";

const data = reactive<newsType>({
  hotValue: "192.3万",
  index: "1",
  link: "http://blog.wei-jia.top",
  title: "GopherBlog Version 2.0",
});

async function getData() {
  let res = await newsListApi({
    id: "KqndgxeLl9",
    size: 1,
  });
  if (res.code) {
    return;
  }
  Object.assign(data, res.data[0]);
}
getData();
</script>
<style lang="scss" scoped>
.news {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: var(--active);
    text-decoration: none;
    width: 80%;
  }
}
</style>
