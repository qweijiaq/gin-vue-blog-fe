<template>
  <a-breadcrumb>
    <template v-for="item in breadList">
      <a-breadcrumb-item>{{ item.title }}</a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

interface BreadType {
  title: string;
  name?: string;
}

const breadList: Ref<BreadType[]> = ref([]);

watch(
  () => route.matched,
  (value) => {
    breadList.value = [];
    value.forEach((item) => {
      breadList.value.push({
        title: item.meta.title as string,
        name: item.name as string,
      });
    });
  },
  { immediate: true }
);
</script>

<style lang="scss"></style>
