<template>
  <div class="gvb_article_drawer">
    <a-drawer
      class="gvb_article_drawer_inner"
      width="86%"
      :visible="props.visible"
      unmountOnClose
      title="编辑文章内容"
      @cancel="emits('update:visible', false)"
    >
      <div>
        <MdEditor
          v-model="data.content"
          :on-upload-img="onUploadImg"
          :theme="store.themeString"
        />
      </div>
      <template #footer>
        <a-button @click="emits('update:visible', false)">取消</a-button>
        <a-button type="primary" @click="updateArticle">修改发布</a-button>
      </template>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import { reactive, watch } from "vue";
import "md-editor-v3/lib/style.css";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores";
import type { articleUpdateType } from "@/api/article";
import { articleUpdateApi } from "@/api/article";
import { articleContentApi } from "@/api/article";
import { onUploadImg } from "@/api/image";

const store = useStore();

interface Props {
  visible: boolean;
  id?: string;
}

const data = reactive<articleUpdateType>({
  content: "",
});

const props = defineProps<Props>();
const emits = defineEmits(["update:visible", "ok"]);

async function updateArticle() {
  if (data.content === "") {
    Message.warning("文章内容不能为空");
    return false;
  }
  let res = await articleUpdateApi(data);
  if (res.code) {
    Message.error(res.msg);
    return false;
  }
  Message.success(res.msg);
  emits("update:visible", false);
  // 除了分类和标签不清除，其他都要清除  一个小时内     写入到store
  data.content = "";
  emits("ok");
}

async function getData() {
  let res = await articleContentApi(props.id as string);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  data.content = res.data;
  data.id = props.id;
}

watch(
  () => props.id,
  () => {
    if (props.id) getData();
  },
  { immediate: true }
);
</script>
<style lang="scss">
.gvb_article_drawer_inner {
  .md-editor {
    height: calc(100vh - 137px);
  }
}
</style>
