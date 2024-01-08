<template>
  <div class="footer">
    <div class="footer_container">
      <div class="left">
        <div class="version">
          <span>version</span>
          <span>{{ store.siteInfo.version }}</span>
        </div>
        <div class="date">
          <span class="create_site_date"
            >建站日期：{{ dateFormat(store.siteInfo.created_at) }}</span
          >
          <span class="site_running_date">网站已运行: {{ countDown }}</span>
        </div>
        <div class="beian">
          <img src="/image/icon/beian.png" alt="" />
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
            >备案号：{{ store.siteInfo.bei_an }}</a
          >
        </div>
      </div>
      <div class="right">
        <a :href="store.siteInfo.csdn_url" target="_blank"
          ><img src="/image/icon/csdn.png" alt=""
        /></a>
        <a :href="store.siteInfo.gitee_url" target="_blank"
          ><img src="/image/icon/gitee.png" alt=""
        /></a>
        <a :href="store.siteInfo.github_url" target="_blank"
          ><img src="/image/icon/github.png" alt=""
        /></a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/stores";
import { dateFormat } from "@/utils/timeFormat";
import { ref } from "vue";
import { onUnmounted } from "vue";

const store = useStore();
let timer: number | null = null;
const countDown = ref("");

function countDownFunc() {
  let date = store.siteInfo.created_at;
  let oldTime = new Date(date).getTime();
  let nowTime = new Date().getTime();

  let _day = (nowTime - oldTime) / 1000 / (60 * 60 * 24);
  let day = ~~_day;
  let hour = ~~((_day - day) * 24);
  let minute = ~~((_day - day - hour / 24) * 24 * 60);
  let second = ~~((_day - day - hour / 24 - minute / 24 / 60) * 24 * 60 * 60);
  countDown.value = `${day}天${hour}时${minute}分${second}秒`;
}

function getData() {
  countDownFunc();
  timer = setInterval(countDownFunc as TimerHandler, 1000);
}

onUnmounted(() => {
  clearInterval(timer as number);
});

getData();
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--color-bg-1);
  padding: 40px 0;
  color: var(--color-text-2);

  .footer_container {
    width: var(--container_width);
    display: flex;

    .left {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .version {
        margin-bottom: 25px;

        span {
          padding: 8px 15px;
          background-color: var(--color-fill-2);
        }

        span:nth-child(1) {
          background-color: var(--active);
          color: white;
          border-radius: 5px 0 0 5px;
        }

        span:nth-child(2) {
          border-radius: 5px 5px 0 0;
        }
      }

      .date {
        margin-bottom: 15px;

        .create_site_date {
          margin-right: 10px;
        }
      }

      .beian {
        display: flex;
        align-items: center;

        a {
          color: var(--color-text-2);
          text-decoration: none;
          margin-left: 5px;
        }
      }
    }

    .right {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        margin-right: 40px;

        &:last-child {
          margin-right: 0;
        }

        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
