<template>
  <div id="login_data" :style="{ height: height + 'px' }"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

interface Props {
  dateList: string[];
  loginList: number[];
  signList: number[];
  height: number;
}

const props = defineProps<Props>();
const { height = 300 } = props;

onMounted(() => {
  const chartDom = document.getElementById("login_data")!;
  const myChart = echarts.init(chartDom);
  let option: EChartsOption;

  let bg = getComputedStyle(document.body).getPropertyValue("--bg");
  let charts_color1 = getComputedStyle(document.body).getPropertyValue(
    "--charts_color1"
  );
  let charts_color2 = getComputedStyle(document.body).getPropertyValue(
    "--charts_color2"
  );
  let color_text_1 = getComputedStyle(document.body).getPropertyValue(
    "--color-text-1"
  );

  option = {
    color: [charts_color1, charts_color2],
    title: {
      text: "用户数据",
      textStyle: {
        color: color_text_1,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: color_text_1,
        },
      },
    },
    legend: {
      textStyle: {
        color: color_text_1,
      },
      data: ["登录", "注册"],
    },
    grid: {
      left: "2%",
      right: "2%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.dateList,
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          color: bg,
        },
      },
    },
    series: [
      {
        name: "登录",
        type: "line",
        // stack: 'Total',
        areaStyle: {},
        smooth: true,
        emphasis: {
          focus: "series",
        },
        // label: {
        //   show: true,
        //   position: "top"
        // },
        data: props.loginList,
      },
      {
        name: "注册",
        type: "line",
        // stack: 'Total',
        areaStyle: {},
        smooth: true,
        emphasis: {
          focus: "series",
        },
        // label: {
        //   show: true,
        //   position: "top"
        // },
        data: props.signList,
      },
    ],
  };

  window.addEventListener("resize", function () {
    myChart.resize();
  });

  option && myChart.setOption(option);
});
</script>
