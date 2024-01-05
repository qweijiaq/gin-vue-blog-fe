<template>
  <div class="title">
    {{ props.title }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: { type: String },
});
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;

  &::before {
    width: 4px;
    height: 1.2rem;
    margin-right: 5px;
    content: "";
    display: inline-block;
    background-color: var(--active);
  }
}
</style>
