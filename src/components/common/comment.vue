<template>
  <div class="gvb_comment_components">
    <div class="add_comment">
      <a-textarea
        ref="textareaRef"
        placeholder="输入评论内容"
        @keydown.enter.ctrl="createComment"
        v-model="addCommentForm.content"
        :auto-size="{ minRows: 6, maxRows: 6 }"
      ></a-textarea>
      <a-button @click="createComment" type="primary">发布评论</a-button>
    </div>
    <gvb-comment-list
      class="gvb_comment_list"
      :data="data.list"
      @list="getData"
    ></gvb-comment-list>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { commentListApi, commentCreateApi } from "@/api/comment";
import type { commentType, commentAddType } from "@/api/comment";
import type { listDataType, paramsType } from "@/api";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores";
import GvbCommentList from "@/components/common/comment_list.vue";

const store = useStore();

interface Props {
  articleId: string;
}

const props = defineProps<Props>();
const data = reactive<listDataType<commentType>>({
  list: [],
  count: 0,
});

const params = reactive<paramsType>({});

async function getData() {
  let res = await commentListApi(props.articleId, params);
  data.list = res.data.list;
  data.count = res.data.count;
}

const addCommentForm = reactive<commentAddType>({
  article_id: "",
  content: "",
  parent_comment_id: undefined,
});

async function createComment() {
  if (!store.isLogin) {
    Message.warning("请登录");
    return;
  }
  if (addCommentForm.article_id === "") {
    Message.warning("请选择文章");
    return;
  }
  if (addCommentForm.content.trim() === "") {
    Message.warning("评论内容不能为空");
    return;
  }
  let res = await commentCreateApi(addCommentForm);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  addCommentForm.content = "";
  getData();
}

watch(
  () => props.articleId,
  () => {
    if (props.articleId) {
      addCommentForm.article_id = props.articleId;
      getData();
    }
  },
  { immediate: true }
);

const textareaRef = ref();
function focus() {
  textareaRef.value.focus();
}

defineExpose({
  focus,
});
</script>
<style lang="scss">
.gvb_comment_components {
  background-color: var(--color-bg-1);
  border-radius: 5px;
  width: 100%;
  padding: 20px;

  .add_comment {
    position: relative;

    button {
      position: absolute;
      right: 10px;
      bottom: 15px;
    }
  }

  .gvb_comment_list {
    margin-top: 10px;
  }
}
</style>
