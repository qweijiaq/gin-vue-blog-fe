<template>
  <div class="weather" v-if="isShow && data.weather">
    <a-skeleton-line :rows="1" :widths="[400]" v-if="!isShow" />
    <template v-else>
      {{ data.province }} · {{ data.city }} 今日 {{ data.weather }}，{{
        data.temperature
      }}℃，{{ weatherDesc }}
    </template>
  </div>
</template>

<script setup lang="ts">
import type { weatherType } from "@/api/data";
import { reactive, ref } from "vue";
import { weatherApi } from "@/api/data";
import { computed } from "vue";

const isShow = ref(false);

const data = reactive<weatherType>({
  province: "",
  city: "",
  weather: "",
  temperature: "",
  winddirection: "",
});

const weatherDesc = computed(() => {
  const weatherNumber = Number(data.temperature);
  if (weatherNumber > 40) {
    return "天气炎热，注意多加避暑";
  }
  if (weatherNumber > 30) {
    return "天气较热，多在阴凉处休息";
  }
  if (weatherNumber > 20) {
    return "天气温和，适合户外运动";
  }
  if (weatherNumber > 10) {
    return "天气寒冷，注意多加点衣服";
  }
  if (weatherNumber > 0) {
    return "天气寒冷，多加点衣服，注意保暖";
  }
  return "天气寒冷，注意多加点衣服";
});

async function getData() {
  let val = sessionStorage.getItem("weather");
  if (val != null) {
    try {
      let jsonData = JSON.parse(val) as weatherType;
      Object.assign(data, jsonData);
      isShow.value = true;
      if (jsonData.temperature === "") {
        sessionStorage.removeItem("weather");
      }
      return;
    } catch (e) {
      sessionStorage.removeItem("weather");
    }
  }

  isShow.value = false;
  let res = await weatherApi();
  if (res.code) {
    return;
  }
  Object.assign(data, res.data);
  isShow.value = true;

  if (data.weather !== "") {
    // 往session里面存
    sessionStorage.setItem("weather", JSON.stringify(data));
  }
}

getData();
</script>
