<template>
  <div class="session_view">
    <a-modal
      title="编辑会话名称"
      v-model:visible="visible"
      @open="Open"
      :on-before-ok="onBeforeOk"
    >
      <a-form :model="form" ref="formRef">
        <a-form-item
          label="会话名称"
          field="name"
          :rules="[{ required: true, message: '请输入会话名称' }]"
          :validate-trigger="['blur']"
        >
          <a-input
            ref="sessionNameIptRef"
            v-model="form.name"
            placeholder="会话名称"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <div class="left">
      <div class="head">
        {{ detail.name }}
        <div class="manage">
          <a-button
            v-if="isManage && useIDList.length > 0"
            text="primary"
            status="danger"
            size="mini"
            style="margin-right: 5px"
            @click="chatRemove"
            >删除</a-button
          >
          <a-checkbox v-if="isManage" style="margin-right: 5px" @change="allIn"
            >全选</a-checkbox
          >
          <a-checkbox v-model="isManage">管理模式</a-checkbox>
        </div>
      </div>
      <div class="chat_list">
        <a-checkbox-group v-model="useIDList">
          <div
            :class="{ item: true, isCheck: isInList(item.id) }"
            v-for="item in chatData.list"
          >
            <div class="user_item">
              <a-checkbox v-if="isManage" :value="item.id"></a-checkbox>
              <div class="avatar">
                <img :src="item.userAvatar" alt="" />
              </div>
              <div class="container">
                <div class="date">{{ dateTimeFormat(item.created_at) }}</div>
                <div class="content">{{ item.userContent }}</div>
              </div>
            </div>
            <div class="bot_item">
              <div class="avatar">
                <img :src="item.botAvatar" alt="" />
              </div>
              <div class="container">
                <div class="date">{{ dateTimeFormat(item.created_at) }}</div>
                <div class="content">
                  <MdPreview
                    :model-value="item.botContent"
                    :theme="store.themeString"
                  ></MdPreview>
                </div>
              </div>
            </div>
          </div>
        </a-checkbox-group>
      </div>
      <div class="menu">
        <div class="ipt">
          <IconSend @click="chatSend"></IconSend>
          <a-textarea
            v-model="chatParams.content"
            @keydown.enter.prevent="userChat"
            placeholder="来说点什么吧...(Shift + Enter = 换行)"
            :auto-size="{ minRows: 1, maxRows: 5 }"
          ></a-textarea>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="role_info">
        <div>
          <img :src="detail.icon" alt="" />
          <div class="info">
            <div class="name">{{ detail.name }}</div>
            <div class="count">共{{ detail.chatCount }}条对话</div>
          </div>
        </div>
        <a-typography-text class="abs" :ellipsis="{ rows: 2 }">{{
          detail.abstract
        }}</a-typography-text>
      </div>
      <div class="session_list">
        <a-button @click="createSession" class="add_session" type="outline" long
          >创建新会话</a-button
        >
        <div
          :class="{
            item: true,
            active: item.id === Number(route.query.sessionID),
          }"
          @click="checkSession(item)"
          v-for="item in data.list"
        >
          <icon-message class="msg" />
          <div class="name">{{ item.name }}</div>
          <icon-edit title="编辑" class="edit" @click="edit(item)" />
          <a-popconfirm content="是否删除会话?" @ok="remove(item)">
            <icon-delete title="删除" class="delete" />
          </a-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  IconMessage,
  IconEdit,
  IconDelete,
} from "@arco-design/web-vue/es/icon";
import { useRoute } from "vue-router";
import { reactive, ref, watch } from "vue";
import {
  roleSessionListApi,
  sessionNameUpdateApi,
  sessionRemoveApi,
  roleDetailApi,
  bigModelChatListApi,
  sessionCreateApi,
  bigModelChatDeleteApi,
} from "@/api/big_model";
import type {
  roleSessionType,
  sessionNameUpdateRequest,
  roleDetailType,
  bigModelChatListType,
  chatSSEParams,
} from "@/api/big_model";
import type { listDataType } from "@/api";
import { Message } from "@arco-design/web-vue";
import router from "@/router";
import { useStore } from "@/stores";
import { dateTimeFormat } from "@/utils/timeFormat";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { IconSend } from "@arco-design/web-vue/es/icon";
import type { baseResponse } from "@/api";

const route = useRoute();
const store = useStore();

const formRef = ref();

const data = reactive<listDataType<roleSessionType>>({
  list: [],
  count: 0,
});

async function getSessionList() {
  const roleID = Number(route.query.roleID);
  let res = await roleSessionListApi({ roleID });
  data.list = res.data.list;
  data.count = res.data.count;
}

const form = reactive<sessionNameUpdateRequest>({
  sessionID: 0,
  name: "",
});
const visible = ref(false);
function edit(record: roleSessionType) {
  form.sessionID = record.id;
  form.name = record.name;
  visible.value = true;
}

async function onBeforeOk() {
  let val = await formRef.value.validate();
  if (val) return false;
  let res = await sessionNameUpdateApi(form);
  if (res.code) {
    Message.error(res.msg);
    return false;
  }
  Message.success(res.msg);
  visible.value = true;
  getSessionList();
  return true;
}

const sessionNameIptRef = ref();
function Open() {
  sessionNameIptRef.value.focus();
}

async function remove(record: roleSessionType) {
  let res = await sessionRemoveApi(record.id);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  getSessionList();
}

function checkSession(record: roleSessionType) {
  router.push({
    name: route.name as string,
    query: {
      roleID: route.query.roleID,
      sessionID: record.id,
    },
  });
}

const detail = reactive<roleDetailType>({
  id: 0,
  created_at: "",
  icon: "",
  name: "",
  abstract: "",
  tags: [],
  chatCount: 0,
});
async function getRoleDetail() {
  let res = await roleDetailApi(
    Number(route.query.roleID),
    Number(route.query.sessionID)
  );
  Object.assign(detail, res.data);
}

const chatData = reactive<listDataType<bigModelChatListType>>({
  count: 0,
  list: [],
});
const allIDList = ref<number[]>([]);
async function getData() {
  let res = await bigModelChatListApi({
    sessionId: Number(route.query.sessionID),
  });
  chatData.count = res.data.count;
  chatData.list = res.data.list;
  allIDList.value = [];
  for (const item of res.data.list) {
    allIDList.value.push(item.id);
  }
}

const isManage = ref<boolean>(false);

async function createSession() {
  let res = await sessionCreateApi(Number(route.query.roleID));
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  if (res.msg !== "已存在新的会话") Message.success(res.msg);
  router.push({
    name: route.name as string,
    query: {
      roleID: route.query.roleID,
      sessionID: res.data,
    },
  });
}

const chatParams = reactive<chatSSEParams>({
  token: store.userInfo.token,
  sessionID: 0,
  content: "",
});
function userChat(e: KeyboardEvent) {
  if (e.shiftKey || e.ctrlKey) {
    chatParams.content += "\n";
    return;
  }
  if (e.isComposing) {
    // 防止输入时回车的提交事件
    return;
  }
  chatSend();
}

function chatSend() {
  if (chatParams.content.trim() === "") {
    Message.warning("内容不能为空");
    return;
  }
  const chatItem = reactive<bigModelChatListType>({
    id: 0,
    created_at: new Date().toLocaleString(),
    status: false,
    userContent: chatParams.content,
    userAvatar: store.userInfo.avatar,
    botAvatar: detail.icon,
    botContent: "",
  });
  chatData.list.push(chatItem);
  chatParams.sessionID = Number(route.query.sessionID);
  const eventSource = new EventSource(
    `/api/bigModel/chat_sse?token=${chatParams.token}&sessionID=${chatParams.sessionID}&content=${chatParams.content}`
  );
  eventSource.onopen = function () {
    chatParams.content = "";
    chatItem.status = true;
  };
  eventSource.onmessage = function (ev: MessageEvent) {
    const data: baseResponse<string> = JSON.parse(ev.data);
    if (data.code) {
      // Message.error(data.msg)
      chatItem.botContent = data.msg;
      return;
    }

    chatItem.botContent = data.data;
  };

  eventSource.onerror = function (ev: Event) {
    eventSource.close();
    // 控制页面滚动到最底部
  };
}

watch(
  () => [route.query.sessionID, route.query.roleID],
  () => {
    getData();
    getRoleDetail();
    getSessionList();
  },
  { immediate: true }
);

watch(
  () => chatData.list.length,
  () => {
    detail.chatCount = chatData.list.length;
  }
);

const useIDList = ref<number[]>([]);
function allIn(value: boolean | (string | number | boolean)[], ev: Event) {
  let v = value as boolean;
  if (v) {
    // 全选
    useIDList.value = allIDList.value;
  } else {
    // 取消全选
    useIDList.value = [];
  }
}

async function chatRemove() {
  let res = await bigModelChatDeleteApi(useIDList.value);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  useIDList.value = [];
  getData();
}

function isInList(id: number): boolean {
  for (const uid of useIDList.value) {
    if (uid == id) {
      return true;
    }
  }
  return false;
}
</script>

<style lang="scss" scoped>
.session_view {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: calc(100% - 260px);
    height: calc(100vh - 100px);
    background-color: var(--color-bg-1);
    border-radius: 5px;
    position: relative;

    .head {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid var(--bg);
      color: var(--color-text-2);
      font-size: 16px;
      position: relative;

      .manage {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
        display: flex;
        align-items: center;
      }
    }

    .chat_list {
      padding: 20px;
      height: calc(100vh - 240px);
      overflow-y: auto;
      .item {
        .bot_item {
          display: flex;
          margin-bottom: 20px;

          .container {
            margin-left: 10px;

            .md-editor {
              background-color: transparent;
            }
          }
        }

        .user_item {
          display: flex;
          flex-direction: row-reverse;
          margin-bottom: 10px;

          .container {
            margin-right: 10px;
            width: auto;
            display: flex;
            flex-direction: column;
            align-items: end;

            .content {
              padding: 10px;
            }

            .date {
              text-align: right;
            }
          }
        }

        .container {
          width: calc(100% - 120px);

          .date {
            font-size: 12px;
          }

          .content {
            background-color: var(--bg);
            border-radius: 5px;
            margin-top: 5px;
            width: fit-content;
          }
        }

        .avatar {
          width: 50px;
          height: 50px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        &.isCheck {
          background-color: var(--color-fill-3);
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 20px;
        }
      }
    }

    .menu {
      padding: 20px;
      display: flex;
      align-items: center;
      width: 100%;
      position: absolute;
      bottom: 0;

      .ipt {
        width: 100%;
        position: relative;
        margin-left: 10px;

        svg {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-2);
          z-index: 1;
          cursor: pointer;
        }

        .arco-textarea-wrapper {
          border-radius: 10px;
        }
      }
    }
  }

  .right {
    width: 240px;
    height: calc(100vh - 100px);
    background-color: var(--color-bg-1);
    border-radius: 5px;

    .role_info {
      width: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: first;
      border-bottom: 1px solid var(--bg);

      > div {
        display: flex;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .info {
          margin-left: 10px;

          .name {
            font-size: 16px;
            font-weight: 600;
          }

          .count {
            font-size: 12px;
            margin-top: 5px;
            color: var(--color-text-2);
          }
        }
      }
      .abs {
        margin-top: 10px;
        color: var(--color-text-2);
        margin-bottom: 0;
      }
    }

    .session_list {
      padding: 20px;

      .add_session {
        border-radius: 10px;
        margin-bottom: 20px;
        height: 40px;
      }

      .item {
        border-radius: 10px;
        padding: 10px;
        background-color: var(--color-fill-2);
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        cursor: pointer;

        &.active {
          background-color: var(--color-fill-4);
        }

        .msg {
          font-size: 20px;
          margin-right: 5px;
        }

        &:hover {
          .edit,
          .delete {
            opacity: 1;
          }
        }

        .edit {
          position: absolute;
          right: 40px;
          font-size: 20px;
          cursor: pointer;
          opacity: 0;
          transition: all 0.3s;
        }

        .name {
          width: 6rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .delete {
          position: absolute;
          color: #d71345;
          right: 10px;
          font-size: 20px;
          cursor: pointer;
          opacity: 0;
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>
