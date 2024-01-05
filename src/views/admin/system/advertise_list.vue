<template>
  <div class="advert_list_view">
    <gvb-advert-create
      v-model:visible="visible"
      :record="recordData"
      @ok="gvbTable.getList()"
    ></gvb-advert-create>
    <gvb-table
      :url="advertListApi"
      :columns="columns"
      default-delete
      add-label="创建广告"
      no-confirm
      ref="gvbTable"
      search-placeholder="搜索广告名称"
      @add="add"
      @edit="edit"
    >
      <template #images="{ record }: { record: advertType }">
        <a-image
          height="80px"
          style="border-radius: 5px"
          :src="record.images"
        ></a-image>
      </template>
      <template #href="{ record }: { record: advertType }">
        <a-link :href="record.href" target="_blank">{{ record.href }}</a-link>
      </template>
      <template #is_show="{ record }: { record: advertType }">
        <a-tag v-if="record.is_show" color="arcoblue">显示</a-tag>
        <a-tag v-else>不显示</a-tag>
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import GvbTable from "@/components/admin/table.vue";
import { reactive, ref } from "vue";
import { advertListApi } from "@/api/advert";
import type { advertCreateType } from "@/api/advert";
import type { advertType } from "@/api/advert";
import GvbAdvertCreate from "@/components/admin/advert_create.vue";
import { defaultAdvertForm } from "@/api/advert";

const gvbTable = ref();

const columns = [
  { title: "标题", dataIndex: "title" },
  { title: "图片", slotName: "images" },
  { title: "链接", slotName: "href" },
  { title: "是否显示", slotName: "is_show" },
  { title: "更新时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];

const visible = ref(false);

const recordData = reactive<advertCreateType>({
  href: "",
  images: "",
  is_show: false,
  title: "",
});

function edit(record: advertType) {
  Object.assign(recordData, record);
  visible.value = true;
}

function add() {
  Object.assign(recordData, defaultAdvertForm);
  recordData.id = undefined;
  visible.value = true;
}
</script>
