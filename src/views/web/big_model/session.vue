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
    <div class="left">xxx</div>
    <div class="right">
      <div class="role_info">
        <div>
          <img src="" alt="" />
          <div class="info">
            <div class="name"></div>
            <div class="count"></div>
          </div>
        </div>
        <a-typography-text class="abs" :ellipsis="{ rows: 2 }"
          >xxxxxxxxxxx</a-typography-text
        >
      </div>
      <div class="session_list">
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
} from "@/api/big_model";
import type {
  roleSessionType,
  sessionNameUpdateRequest,
} from "@/api/big_model";
import type { listDataType } from "@/api";
import { Message } from "@arco-design/web-vue";
import router from "@/router";

const route = useRoute();

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
getSessionList();

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

watch(
  () => route.query.roleID,
  () => {
    getSessionList();
  },
  { immediate: true }
);
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

      .item {
        border-radius: 10px;
        padding: 10px;
        background-color: var(--color-fill-2);
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        cursor: pointer;

        &:active {
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
