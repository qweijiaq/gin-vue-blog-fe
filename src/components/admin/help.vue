<template>
  <div class="gvb_help">
    <gvb-title :title="helpTitle"></gvb-title>
    <div class="col" v-for="item in props.data">
      <div class="title">
        <div class="column">{{ item.title }}</div>
        <div class="abs">{{ item.abs }}</div>
      </div>
      <div class="content" v-html="item.content"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import GvbTitle from "@/components/common/title.vue";
import type { helpType } from "@/api/settings";

interface Props {
  helpTitle?: string;
  data?: helpType[];
}

const props = defineProps<Props>();

const { helpTitle = "帮助" } = props;
</script>
<style lang="scss">
.gvb_help {
  max-height: calc(100vh - 170px);
  overflow-y: auto;

  .col {
    margin-top: 20px;

    .title {
      display: flex;

      .column {
        font-weight: 600;
        margin-right: 10px;

        &::after {
          content: ":";
        }
      }
    }

    .content {
      margin-top: 10px;
      line-height: 1.5rem;

      a {
        color: var(--active);
      }

      img {
        max-width: 100%;
      }
    }
  }
}
</style>
