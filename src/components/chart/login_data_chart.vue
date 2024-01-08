<template>
  <div class="login_data_charts" style="height: 250px">
    <div class="select">
      <a-select
        v-model="params.date"
        :options="dateFilterOptions"
        @change="dateFilterChange"
        placeholder="时间过滤"
      ></a-select>
    </div>
    <login-chart
      v-if="isShow"
      :date-list="data.date_list"
      :height="250"
      :login-list="data.login_data"
      :sign-list="data.sign_data"
    ></login-chart>
  </div>
</template>
<script setup lang="ts">
import LoginChart from "@/components/chart/login_chart.vue";
import { reactive, ref, watch } from "vue";
import { useStore } from "@/stores";
import { dataLoginApi } from "@/api/data";
import type { LoginDataType } from "@/api/data";
import type { loginDataRequest } from "@/api/data";

const isShow = ref(false);

const data = reactive<LoginDataType>({
  date_list: [],
  login_data: [],
  sign_data: [],
});

const params = reactive<loginDataRequest>({
  date: 1,
});

async function getData() {
  isShow.value = false;
  let res = await dataLoginApi(params);
  Object.assign(data, res.data);
  isShow.value = true;
}

getData();

const dateFilterOptions = [
  { label: "七天", value: 1 },
  { label: "一个月", value: 2 },
  { label: "两个月", value: 3 },
  { label: "三个月", value: 4 },
  { label: "六个月", value: 5 },
  { label: "一年", value: 6 },
];

const store = useStore();
watch(
  () => store.theme,
  () => {
    isShow.value = false;
    setTimeout(() => {
      isShow.value = true;
    });
  }
);

function dateFilterChange() {
  getData();
}
</script>

<style lang="scss">
.login_data_charts {
  position: relative;

  .select {
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 1;
    width: 160px;
  }
}
</style>
