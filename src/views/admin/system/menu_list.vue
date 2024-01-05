<template>
  <div class="menu_list_view">
    <gvb-table
      :url="menuListApi"
      :columns="columns"
      default-delete
      add-label="创建菜单"
      no-confirm
      ref="gvbTable"
      no-page
      no-check
      no-action-group
      search-placeholder="搜索菜单名称"
    >
      <template #banners="{ record }: { record: menuType }">
        <div class="menu_column_image">
          <a-image
            v-for="item in record.banners"
            height="40px"
            :key="item.id"
            :src="item.path"
          ></a-image>
        </div>
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import GvbTable from "@/components/admin/table.vue";
import { menuListApi, type menuType } from "@/api/menu";

const columns = [
  { title: "序号", dataIndex: "sort" },
  { title: "菜单标题", dataIndex: "title" },
  { title: "路径", slotName: "path" },
  { title: "slogan", dataIndex: "slogan" },
  { title: "简介", dataIndex: "abstract" },
  { title: "slogan切换时间", dataIndex: "banner_time" },
  { title: "简介切换时间", dataIndex: "abstract_time" },
  { title: "banner", slotName: "banners" },
  { title: "更新时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];
</script>

<style lang="scss">
.menu_list_view {
  .menu_column_image {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 5px;

    .arco-image-img {
      border-radius: 5px;
    }
  }
}
</style>
