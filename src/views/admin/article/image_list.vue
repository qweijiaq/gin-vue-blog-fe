<template>
  <div class="image_list_view">
    <a-modal title="图片上传" v-model:visible="visible" @ok="okHandler">
      <a-upload
        list-type="picture-card"
        action="/api/images"
        name="images"
        :headers="{ token: store.userInfo.token }"
        v-model:file-list="fileList"
        image-preview
        class="image_upload"
        multiple
        @success="imageUploadSuccessEvent"
      ></a-upload>
    </a-modal>
    <gvb-table
      :url="imageListApi"
      :columns="columns"
      default-delete
      add-label="上传图片"
      no-confirm
      no-edit
      ref="gvbTable"
      search-placeholder="搜索图片名称"
      @add="visible = true"
    >
      <template #path="{ record }: { record: imageType }">
        <a-image
          :src="record.path"
          style="border-radius: 5px"
          height="50px"
        ></a-image>
      </template>
      <template #action_left="{ record }: { record: imageType }">
        <a
          style="margin-right: 10px"
          :href="record.path"
          :download="record.name"
        >
          <a-button type="primary">
            <template #icon>
              <IconDownload></IconDownload>
            </template>
            图片下载
          </a-button>
        </a>
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import GvbTable from "@/components/admin/table.vue";
import { h, ref } from "vue";
import { imageListApi } from "@/api/image";
import type { imageType, imagesUploadResponse } from "@/api/image";
import { Message, Tag } from "@arco-design/web-vue";
import { IconDownload } from "@arco-design/web-vue/es/icon";
import type { FileItem } from "@arco-design/web-vue";
import { useStore } from "@/stores";
import type { baseResponse } from "@/api";

const store = useStore();
const fileList = ref<FileItem[]>([]);

const gvbTable = ref();

function okHandler() {
  gvbTable.value.getList();
  fileList.value = [];
}

const columns = [
  { title: "文件名", dataIndex: "name" },
  {
    title: "上传类型",
    dataIndex: "image_type",
    render: (data: any) => {
      const record = data as imageType;
      let color = "red";
      if (record.image_type === "本地") {
        color = "blue";
      }
      return h(Tag, { color: color }, { default: () => record.image_type });
    },
  },
  { title: "预览", slotName: "path" },
  { title: "banner数", dataIndex: "bannerCount" },
  { title: "文章数", dataIndex: "articleCount" },
  { title: "上传时间", slotName: "created_at" },
  { title: "操作", slotName: "action" },
];

const visible = ref(false);

function imageUploadSuccessEvent(fileItem: FileItem) {
  const response = fileItem.response as baseResponse<imagesUploadResponse[]>;
  if (response.data.length > 0) {
    // 找里面有没有 is_success 为false的
    response.data.forEach((item) => {
      if (!item.is_success) {
        Message.error(item.msg);
        return;
      }
      Message.success(item.msg);
    });
  }
}
</script>

<style lang="scss">
.image_upload {
  .arco-upload-list-picture {
    width: inherit;
  }
}
</style>
