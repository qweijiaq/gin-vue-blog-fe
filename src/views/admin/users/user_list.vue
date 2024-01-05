<template>
  <div>
    <gvb-user-create v-model:visible="visible" @ok="createOk" />
    <a-modal
      title="编辑用户"
      v-model:visible="updateVisible"
      :on-before-ok="updateUser"
    >
      <a-form ref="formRef" :model="updateUserForm">
        <a-form-item
          field="nick_name"
          label="昵称"
          :rules="[{ required: true, message: '昵称不能为空' }]"
          :validate-trigger="['blur', 'input']"
        >
          <a-input
            v-model="updateUserForm.nick_name"
            placeholder="请输入昵称 ..."
          >
            <template #prefix>
              <icon-robot />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="role" label="权限">
          <a-select
            v-model="updateUserForm.role"
            :options="roleOptions"
            placeholder="请选择权限"
          >
            <template #prefix>
              <icon-safe />
            </template>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb-table
      ref="gvbTable"
      :url="userListApi"
      :columns="columns"
      @add="visible = true"
      @edit="edit"
      add-label="创建用户"
      search-placeholder="搜索昵称"
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
import { IconRobot, IconSafe } from "@arco-design/web-vue/es/icon";
import { userListApi, userUpdateApi, type userInfoType } from "@/api/user";
import GvbTable from "@/components/admin/table.vue";
import GvbUserCreate from "@/components/admin/user_create.vue";
import type { filterOptionType } from "@/components/admin/table.vue";
import { roleIdListApi } from "@/api/role";
import { ref, reactive } from "vue";
import type { RecordType } from "@/components/admin/table.vue";
import type { userUpdateRequest } from "@/api/user";
import { roleOptions } from "@/global";
import { Message } from "@arco-design/web-vue";

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

// modal 是否可见
const visible = ref(false);

const gvbTable = ref();

const updateVisible = ref(false);

const formRef = ref();

const updateUserForm = reactive<userUpdateRequest>({
  nick_name: "",
  role: 0,
  user_id: 0,
});

// 编辑用户
function edit(record: RecordType<userInfoType>): void {
  updateUserForm.user_id = record.id;
  updateUserForm.role = record.role_id;
  updateUserForm.nick_name = record.nick_name;
  updateVisible.value = true;
}

function createOk() {
  gvbTable.value.getList();
}

// 更新用户
async function updateUser() {
  let val = await formRef.value.validate();
  if (val) return;
  let res = await userUpdateApi(updateUserForm);

  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  gvbTable.value.getList();
  return;
}
</script>

<style lang="scss"></style>
