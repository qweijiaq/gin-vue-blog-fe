<template>
  <div class="message_list">
    <template v-if="props.data.length">
      <div
        :class="{ item: true, active: active === item.userID }"
        @click="checkItem(item)"
        v-for="item in props.data"
      >
        <img class="avatar" :src="item.avatar" alt="" />
        <div class="nickName">
          <a-typography-paragraph
            :ellipsis="{
              rows: 1,
              showTooltip: true,
              css: true,
            }"
            >{{ item.nickName }}
          </a-typography-paragraph>
        </div>
        <div class="count">{{ item.count }}</div>
      </div>
    </template>
    <template v-else>
      <a-empty />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { messageType } from "@/api/message";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

interface Props {
  data: messageType[];
  idKey?: string;
}

const props = defineProps<Props>();
const { idKey = "user_id" } = props;

const emits = defineEmits(["check"]);

const active = ref<number>(Number(route.query[idKey]));

function checkItem(record: messageType) {
  active.value = record.userID;
  emits("check", record);
}
</script>

<style lang="scss" scoped>
.message_list {
  width: 100%;

  .item {
    width: 100%;
    height: 60px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .nickName {
      width: 8rem;

      .arco-typography {
        margin-bottom: 0;
      }
    }

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
    }

    &.active {
      background-color: var(--color-fill-2);
      border-radius: 5px;
    }
  }
}
</style>
