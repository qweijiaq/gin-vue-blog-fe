<template>
  <div id="article_calendar" style="height: 150px"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import type { EChartsOption } from "echarts";
import router from "@/router";
import { type paramsType } from ".";

interface Props {
  dateList: string[];
  countList: Array<[string, number]>;
  theme: boolean;
}

const props = defineProps<Props>();
const selectData = ref<string>("");

onMounted(() => {
  let color = "#000000";
  let inRangeColor = [
    "#ebedf0",
    "#c6e48b",
    "#7bc96f",
    "#32af4a",
    "#1a792c",
    "#0f5e1e",
    "#0f491a",
    "#02340c",
  ];
  let borderColor = "#fff";
  let textColor = "#555555";

  if (!props.theme) {
    color = "#5a5a5a";
    textColor = "#f0eeee";
    inRangeColor = [
      "#404148",
      "#c6e48b",
      "#7bc96f",
      "#32af4a",
      "#1a792c",
      "#0f5e1e",
      "#0f491a",
      "#02340c",
    ];
    borderColor = "#222429";
  }

  const chartDom = document.getElementById("article_calendar");
  const myChart = echarts.init(chartDom, null, { locale: "zh" });
  let option: EChartsOption;
  option = {
    tooltip: {
      padding: 10,
      backgroundColor: "#555",
      borderColor: "#777",
      borderWidth: 1,
      formatter: function (e: any) {
        const v = e.value as [string, number];
        return (
          '<div style="font-size: 14px; color: white">' +
          v[0] +
          "：" +
          v[1] +
          "</div>"
        );
      },
    },
    visualMap: {
      show: !0,
      showLabel: !0,
      categories: [0, 1, 2, 3, 4, 5, 6, 7],
      calculable: !0,
      inRange: {
        symbol: "rect",
        color: inRangeColor,
      }, // 对应上面的四个值
      itemWidth: 12,
      itemHeight: 12,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: {
        color: color,
      },
    },
    calendar: {
      top: 20,
      right: "center",
      bottom: 30,
      range: props.dateList, // 时间范围
      cellSize: [13, 13],
      splitLine: { show: !1 },
      itemStyle: { color: "#196127", borderColor: borderColor, borderWidth: 2 },
      yearLabel: { show: !1 },
      monthLabel: {
        nameMap: "cn",
        fontSize: 11,
        color: color,
      },
      dayLabel: {
        firstDay: 1,
        nameMap: "cn",
        fontSize: 11,
        color: color,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      calendarIndex: 0,
      data: props.countList,
    },
  };

  myChart.on("click", function (params) {
    const value = params.value as [string, number];
    if (value[1] === 0) {
      return;
    }
    if (selectData.value === value[0]) {
      // 取消
      selectData.value = "";
    } else {
      selectData.value = value[0];
    }
    router.push({
      query: {
        date: selectData.value,
      },
    });
  });

  window.addEventListener("resize", function () {
    myChart.resize();
  });
  option && myChart.setOption(option);
});
</script>
