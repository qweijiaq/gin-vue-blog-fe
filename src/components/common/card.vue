<template>
  <div class="card">
    <div class="head">
      <div class="title">
        {{ props.title }}
      </div>
      <div class="right">
        <slot name="head-right"></slot>
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
}

const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
.card {
  background-color: var(--color-bg-1);
  border-radius: 5px;
  width: 100%;

  .head {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--bg);
    justify-content: space-between;

    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .right {
      a {
        color: var(--color-text-2);
        text-decoration: none;
      }
    }
  }

  .body {
    padding: 20px;
  }
}
</style>
