<template>
  <div class="menu_list_view">
    <a-modal title="添加标签" v-model:visible="visible" :on-before-ok="ok">
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="title"
          label="标签名称"
          :rules="[{ required: true, message: '请输入标签名称' }]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="标签名称"></a-input>
        </a-form-item>
        <a-form-item
          field="color"
          label="标签颜色"
          :rules="[{ required: true, message: '请输入标签颜色' }]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.color" placeholder="标签颜色"></a-input>
          <input style="margin-left: 10px" type="color" v-model="form.color" />
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb-table
      :url="bigModelRoleTagListApi"
      :columns="columns"
      default-delete
      add-label="创建标签"
      no-confirm
      ref="gvbTable"
      no-page
      no-check
      no-action-group
      search-placeholder="搜索标签名称"
      @add="add"
      @edit="edit"
    >
    </gvb-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, h } from "vue";
import GvbTable from "@/components/admin/table.vue";
import { Message, Tag } from "@arco-design/web-vue";
import type { bigModelRoleTagType } from "@/api/big_model";
import {
  bigModelRoleTagListApi,
  bigModelRoleTagUpdateApi,
} from "@/api/big_model";

const columns = [
  { title: "标签名", dataIndex: "title" },
  {
    title: "标签颜色",
    dataIndex: "color",
    render: (data: any) => {
      const record = data as bigModelRoleTagType;
      return h(
        Tag,
        { color: record.color },
        {
          default: () => record.title,
        }
      );
    },
  },
  { title: "角色数量", dataIndex: "roleCount" },
  { title: "添加时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];

const form = reactive<bigModelRoleTagType>({
  id: 0,
  title: "",
  color: "",
  roleCount: 0,
});

const emptyForm: bigModelRoleTagType = {
  id: 0,
  title: "",
  color: "",
  roleCount: 0,
};

const gvbTable = ref();
const visible = ref(false);

function edit(record: bigModelRoleTagType) {
  form.title = record.title;
  form.color = record.color;
  visible.value = true;
}

function add() {
  form.id = emptyForm.id;
  form.title = emptyForm.title;
  form.color = emptyForm.color;
  form.roleCount = emptyForm.roleCount;
  visible.value = true;
}

const formRef = ref();
async function ok() {
  let val = await formRef.value.validate();
  if (val) return false;
  let res = await bigModelRoleTagUpdateApi(form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  visible.value = false;
  gvbTable.value.getList();
}
</script>

<style lang="scss" scoped></style>
