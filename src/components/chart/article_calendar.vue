<template>
  <div class="article_calendar">
    <gvb-article-calendar-chart
      v-if="isShow"
      :date-list="data.dateList"
      :count-list="data.countList"
      :theme="store.theme"
    ></gvb-article-calendar-chart>
  </div>
</template>

<script setup lang="ts">
import GvbArticleCalendarChart from "@/components/chart/article_calendar_chart.vue";
import { articleCalendarApi } from "@/api/article";
import { reactive, ref, watch } from "vue";
import { useStore } from "@/stores";

const store = useStore();
const data = reactive<{
  dateList: string[];
  countList: Array<[string, number]>;
}>({
  dateList: [],
  countList: [],
});
const isShow = ref(false);

async function getData() {
  let res = await articleCalendarApi();
  data.dateList = [res.data[0].date, res.data[res.data.length - 1].date];
  data.countList = [];
  res.data.forEach((item) => {
    data.countList.push([item.date, item.count]);
  });
  isShow.value = true;
}

watch(
  () => store.theme,
  () => {
    isShow.value = false;
    setTimeout(() => {
      isShow.value = true;
    });
  }
);

getData();
</script>
