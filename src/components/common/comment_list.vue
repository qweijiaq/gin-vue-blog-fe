<template>
  <div class="gvb_comment_list_components">
    <a-comment
      :author="item.user.nick_name"
      :content="item.content"
      :datetime="relativeCurrentTime(item.created_at)"
      v-for="item in props.data"
    >
      <template #actions>
        <span class="action" @click="commentDigg(item)"
          ><IconHeart /> 点赞（{{ item.digg_count }}）
        </span>
        <span class="action" @click="applyShow(item)"
          ><IconMessage /> 回复
        </span>
        <a-popconfirm
          v-if="store.isAdmin || store.userInfo.user_id === item.user_id"
          content="是否删除这条评论?"
          @ok="deleteComment(item)"
        >
          <span class="action"><IconDelete /> 删除 </span>
        </a-popconfirm>
      </template>
      <template #avatar>
        <a-avatar @click="avatarClick(item)"
          ><img alt="avatar" :src="item.user.avatar"
        /></a-avatar>
      </template>
      <a-comment
        :avatar="store.userInfo.avatar"
        v-if="item.isApply || item.id === saveID"
      >
        <template #content>
          <div class="apply_comment">
            <a-input
              :class="'comment_apply_ipt__' + item.id"
              @keydown.enter.ctrl="applyComment(item)"
              :placeholder="'回复' + item.user.nick_name"
              v-model="item.applyContent"
            ></a-input>
            <a-button
              type="primary"
              style="margin-left: 10px"
              @click="applyComment(item)"
              >回复</a-button
            >
          </div>
        </template>
      </a-comment>
      <gvb-comment-list
        :data="item.sub_comments"
        @list="emits('list')"
      ></gvb-comment-list>
    </a-comment>
  </div>
</template>

<script setup lang="ts">
import { relativeCurrentTime } from "@/utils/timeFormat";
import type { commentType, commentAddType } from "@/api/comment";
import GvbCommentList from "@/components/common/comment_list.vue";
import {
  commentCreateApi,
  commentDeleteApi,
  commentDiggApi,
} from "@/api/comment";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores";
import { IconDelete, IconMessage } from "@arco-design/web-vue/es/icon";
import { IconHeart } from "@arco-design/web-vue/es/icon";
import { nextTick, ref } from "vue";
import { showMessageRecord } from "@/components/common/message_record";
import { showLogin } from "@/components/common/login";

const store = useStore();

interface Props {
  data: commentType[];
}

const props = defineProps<Props>();
const emits = defineEmits(["list"]);

async function deleteComment(record: commentType) {
  let res = await commentDeleteApi(record.id);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  emits("list");
}

function applyShow(record: commentType) {
  record.isApply = !record.isApply;
  if (!record.isApply) {
    saveID.value = 0;
    return;
  }
  nextTick(() => {
    let dom = document.querySelector(
      `.comment_apply_ipt__${record.id.toString()} input`
    ) as HTMLInputElement;
    dom.focus();
  });
}

const saveID = ref<number>(0);

async function applyComment(record: commentType) {
  if (!store.isLogin) {
    Message.warning("请登录");
    return;
  }
  if (record.applyContent.trim() === "") {
    Message.warning("回复内容不能为空");
    return;
  }

  const data: commentAddType = {
    article_id: record.article_id,
    content: record.applyContent,
    parent_comment_id: record.id,
  };

  let res = await commentCreateApi(data);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  record.applyContent = "";
  saveID.value = record.id;
  emits("list");
}

async function commentDigg(record: commentType) {
  let res = await commentDiggApi(record.id);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  record.digg_count++;
}

function avatarClick(item: commentType) {
  if (!store.isLogin) {
    Message.warning("请登录");
    showLogin();
    return;
  }

  if (store.userInfo.user_id === item.user_id) {
    Message.warning("不能和自己聊天");
    return;
  }
  showMessageRecord(item.user_id, item.user.nick_name);
}
</script>
<style lang="scss">
.gvb_comment_list_components {
  .action {
    cursor: pointer;
  }

  .apply_comment {
    display: flex;
  }

  .arco-comment-inner-comment {
    margin-top: 8px;
  }
}
</style>
@/components/common/message_record
