<template>
  <div class="user_info_preview_component">
    <a :href="props.data.link" class="link_button" target="_blank">
      <IconGithub></IconGithub>
    </a>
    <div class="head">
      <a-avatar :size="60" :image-url="props.data.avatar"></a-avatar>
      <div class="nick_name">{{ props.data.nick_name }}</div>
    </div>
    <div class="sign">{{ props.data.sign }}</div>
    <div class="article_data">
      <span>
        <i class="fa fa-eye"></i>
        <span>{{ props.data.look_count }}</span>
      </span>
      <span>
        <i class="fa fa-thumbs-o-up"></i>
        <span>{{ props.data.digg_count }}</span>
      </span>
      <span>
        <i class="fa fa-comments"></i>
        <span>{{ props.data.comment_count }}</span>
      </span>
      <span>
        <i class="fa fa-star"></i>
        <span>{{ props.data.collects_count }}</span>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconGithub } from "@arco-design/web-vue/es/icon";

interface userInfoPreviewType {
  avatar: string;
  nick_name: string;
  sign: string;
  link: string;
  collects_count: number;
  comment_count: number;
  digg_count: number;
  look_count: number;
}

interface Props {
  data: userInfoPreviewType;
}

const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
.user_info_preview_component {
  padding: 20px;
  background-color: var(--color-bg-1);
  border-radius: 5px;
  width: 100%;
  border: 1px solid var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    width: 100px;
    height: 100px;
    content: "";
    display: block;
    right: -50px;
    top: -50px;
    background-color: var(--color-fill-2);
    transform: rotate(45deg);
  }

  .link_button {
    position: absolute;
    right: 10px;
    top: 10px;
    color: var(--color-text-2);
    font-size: 18px;
  }

  .head {
    display: flex;
    flex-direction: column;
    align-items: center;

    .nick_name {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .sign {
    margin: 30px 0;
    color: var(--color-text-2);
    text-align: center;
    line-height: 1.5rem;
  }

  .article_data {
    display: flex;
    width: 100%;
    color: var(--color-text-2);

    > span {
      width: 25%;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;

      i {
        margin-top: 10px;
      }
    }
  }
}
</style>
