<template>
  <div class="user_card">
    <div class="title">
      <i class="fa fa-quote-left"></i>
      <i class="fa fa-quote-right"></i>
      全新二代，回归简约
    </div>
    <div class="info">
      <div class="item">
        <span>NAME</span>
        <span>{{ store.siteInfo.name }}</span>
      </div>
      <div class="item">
        <span>JOB</span>
        <span>{{ store.siteInfo.job }}</span>
      </div>
      <div class="item">
        <span>ADDR</span>
        <span>{{ store.siteInfo.addr }}</span>
      </div>
    </div>
    <div class="image">
      <div class="qq">
        <a-image :src="store.siteInfo.qq_image" alt="我的QQ" />
        <span>QQ</span>
      </div>
      <div class="wechat">
        <a-image :src="store.siteInfo.wechat_image" alt="我的微信" />
        <span>微信</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/stores";

const store = useStore();
</script>
<style lang="scss">
.user_card {
  color: var(--color-text-2);

  .title {
    background-color: var(--color-fill-2);
    border-radius: 5px;
    margin-bottom: 20px;
    color: var(--color-text-1);
    text-align: center;
    padding: 40px 0;
    position: relative;

    i {
      color: var(--color-text-4);
    }

    i:nth-child(1) {
      position: absolute;
      left: 10px;
      top: 10px;
    }

    i:nth-child(2) {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }

  .info {
    .item {
      margin-bottom: 10px;

      > span:nth-child(1) {
        margin-right: 5px;
        color: var(--color-text-1);
      }

      a {
        text-decoration: none;
        color: var(--active);
      }
    }
  }

  .image {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    img {
      width: 80px;
      height: 80px;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        margin-top: 10px;
      }
    }
  }
}
</style>
