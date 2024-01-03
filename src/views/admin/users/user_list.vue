<template>
  <div>
    <gvb-table
      :url="userListApi"
      :columns="columns"
      @add="add"
      @edit="edit"
      add-label="添加用户"
      default-delete
      :filter-group="filterGroup"
    >
      <template #avatar="{ record }: { record: userInfoType }">
        <a-avatar :imageUrl="record.avatar"></a-avatar>
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import { userListApi, type userInfoType } from "@/api/user";
import GvbTable from "@/components/admin/table.vue";
import type { filterOptionType } from "@/components/admin/table.vue";
import { roleIdListApi } from "@/api/role";
import { ref } from "vue";

const columns = [
  { title: "昵称", dataIndex: "nick_name" },
  { title: "头像", slotName: "avatar" },
  { title: "邮箱", dataIndex: "email" },
  { title: "角色", dataIndex: "role" },
  { title: "地址", dataIndex: "addr" },
  { title: "注册时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];

// 过滤组
const filterGroup = ref<filterOptionType[]>([
  {
    label: "权限过滤",
    value: 0,
    column: "role",
    source: roleIdListApi,
  },
]);

// 添加用户
function add() {}

// 编辑用户
function edit() {}
</script>

<style lang="scss"></style>
