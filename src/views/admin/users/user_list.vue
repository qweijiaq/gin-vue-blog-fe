<template>
  <div>
    <gvb-table :url="userListApi" :columns="columns">
      <template #avatar="{ record }: { record: userInfoType }">
        <a-avatar :imageUrl="record.avatar"></a-avatar>
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import { userListApi, type userInfoType } from "@/api/user";
import GvbTable from "@/components/admin/table.vue";

const columns = [
  { title: "昵称", dataIndex: "nick_name" },
  { title: "头像", slotName: "avatar" },
  { title: "邮箱", dataIndex: "email" },
  { title: "角色", dataIndex: "role" },
  { title: "地址", dataIndex: "addr" },
  { title: "注册时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];
</script>

<style lang="scss"></style>
