<template>
  <div class="log_list_view">
    <a-modal
      title="日志详情"
      width="50%"
      v-model:visible="visible"
      :footer="false"
      body-class="log_modal_body"
    >
      <div class="log_modal_content" v-html="logContent"></div>
    </a-modal>
    <gvb-table
      :url="logListApi"
      :columns="columns"
      :limit="20"
      default-delete
      no-confirm
      no-add
      no-edit
      :default-params="params"
      ref="gvbTable"
      search-placeholder="搜索日志标题和用户名"
    >
      <template #action_other_search>
        <div class="search_user">
          <a-input
            placeholder="搜索用户"
            allow-clear
            v-model="params.userName"
            @change="getList"
            @keydown.enter="getList"
          ></a-input>
        </div>
        <div class="search_addr">
          <a-input
            placeholder="搜索地址"
            allow-clear
            v-model="params.addr"
            @change="getList"
            @keydown.enter="getList"
          ></a-input>
        </div>
        <div class="filter_status" v-if="params.type === 1">
          <a-select
            :options="statusOptions"
            v-model="params.status"
            @change="getList"
            style="width: 130px"
            placeholder="状态过滤"
            allow-clear
          ></a-select>
        </div>
        <div
          class="filter_status"
          v-if="params.type === 2 || params.type === 3"
        >
          <a-select
            :options="logLevelOptions"
            v-model="params.level"
            @change="getList"
            style="width: 130px"
            placeholder="等级过滤"
            allow-clear
          ></a-select>
        </div>
        <div class="search_date">
          <a-date-picker
            style="width: 140px"
            v-model="params.date"
            @change="getList"
          />
        </div>
        <div class="check_log_type">
          <a-radio-group
            v-model="params.type"
            :options="logTypeOptions"
            @change="logTypeChange"
          ></a-radio-group>
        </div>
      </template>
      <template #userName="{ record }: { record: logType }">
        <a-dropdown
          trigger="contextMenu"
          alignPoint
          :style="{ display: 'block' }"
          @select="selectDropDown($event as string, 'userName')"
        >
          <div style="cursor: pointer">{{ record.userName }}</div>
          <template #content>
            <a-doption :value="record.userName">只看该用户的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #addr="{ record }: { record: logType }">
        <a-dropdown
          trigger="contextMenu"
          alignPoint
          :style="{ display: 'block' }"
          @select="selectDropDown($event as string, 'addr')"
        >
          <div style="cursor: pointer">{{ record.addr }}</div>
          <template #content>
            <a-doption :value="record.addr">只看该地址的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #date="{ record }: { record: logType }">
        <a-dropdown
          trigger="contextMenu"
          alignPoint
          :style="{ display: 'block' }"
          @select="selectDropDown($event as string, 'date')"
        >
          <div style="cursor: pointer">
            {{ dateTimeFormat(record.updated_at) }}
          </div>
          <template #content>
            <a-doption :value="record.updated_at">查看当天的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #title="{ record }: { record: logType }">
        <div class="log_column_title">
          <span
            @click="readLog(record)"
            :class="{ isRead: record.readStatus }"
            >{{ record.title }}</span
          >
        </div>
      </template>
    </gvb-table>
  </div>
</template>

<script setup lang="ts">
import GvbTable from "@/components/admin/table.vue";
import { createApp, h, reactive, ref } from "vue";
import { logListApi, logReadApi } from "@/api/log";
import type { logType, logRequest } from "@/api/log";
import { Tag } from "@arco-design/web-vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { nextTick } from "vue";
import { dateTimeFormat, dateFormat } from "@/utils/timeFormat";

const gvbTable = ref();

const params = reactive<logRequest>({
  level: undefined,
  type: 2,
  ip: undefined,
  userID: undefined,
  addr: undefined,
  date: undefined,
  status: undefined,
  userName: undefined,
});

const statusOptions = [
  { label: "成功", value: true },
  { label: "失败", value: false },
];
const logTypeOptions = [
  { label: "登录日志", value: 1 },
  { label: "操作日志", value: 2 },
  { label: "运行日志", value: 3 },
];

const logLevelOptions = [
  { label: "info", value: 1 },
  { label: "warning", value: 2 },
  { label: "error", value: 3 },
];

const columnDict = {
  1: [
    { title: "ip", dataIndex: "ip" },
    { title: "地址", slotName: "addr" },
    { title: "标题", dataIndex: "title" },
    {
      title: "状态",
      dataIndex: "status",
      render: (data: any) => {
        const record = data as logType;
        if (record.status) {
          return h(Tag, { color: "blue" }, { default: () => "成功" });
        }
        return h(Tag, { color: "red" }, { default: () => "失败" });
      },
    },
    { title: "用户名", slotName: "userName" },
    { title: "密码", dataIndex: "content" },
    { title: "日志时间", slotName: "date" },
    { title: "操作", slotName: "action" },
  ],
  2: [
    { title: "ip", dataIndex: "ip" },
    { title: "地址", slotName: "addr" },
    { title: "用户名", slotName: "userName" },
    {
      title: "等级",
      dataIndex: "level",
      render: (data: any) => {
        const record = data as logType;
        switch (record.level) {
          case "info":
            return h(Tag, { color: "blue" }, { default: () => "info" });
          case "warning":
            return h(Tag, { color: "orange" }, { default: () => "warning" });
          case "error":
            return h(Tag, { color: "red" }, { default: () => "error" });
        }
      },
    },
    { title: "标题", slotName: "title" },
    { title: "日志时间", slotName: "date" },
    { title: "操作", slotName: "action" },
  ],
  3: [
    { title: "服务", dataIndex: "serviceName" },
    { title: "标题", slotName: "title" },
    {
      title: "等级",
      dataIndex: "level",
      render: (data: any) => {
        const record = data as logType;
        switch (record.level) {
          case "info":
            return h(Tag, { color: "blue" }, { default: () => "info" });
          case "warning":
            return h(Tag, { color: "orange" }, { default: () => "warning" });
          case "error":
            return h(Tag, { color: "red" }, { default: () => "error" });
        }
      },
    },
    { title: "日志时间", slotName: "date" },
    { title: "操作", slotName: "action" },
  ],
};

const columns = ref(columnDict[params.type as keyof typeof columnDict]);

function selectDropDown(val: string, column: "userName" | "addr" | "date") {
  if (column === "date") {
    // 把时间处理一下
    val = dateFormat(val);
  }
  params[column] = val;
  getList();
}

function logTypeChange() {
  gvbTable.value.clearData();
  columns.value = columnDict[params.type as keyof typeof columnDict];
  gvbTable.value.getList(params);
}

function getList() {
  if (params.status === "") {
    params.status = undefined;
  }
  gvbTable.value.getList(params);
}

const logContent = ref("");
const visible = ref(false);

async function readLog(record: logType) {
  if (!record.readStatus) {
    await logReadApi(record.id);
    record.readStatus = true;
  }
  visible.value = true;
  logContent.value = record.content;

  nextTick(() => {
    jsonPreview();
  });
}

function jsonPreview() {
  let jsonDomList = document.querySelectorAll(".log_json_body");
  jsonDomList.forEach((value: Element) => {
    if (value.innerHTML === "") return;
    let jsonObj = JSON.parse(value.innerHTML);
    // 生成虚拟dom
    const vNode = h(VueJsonPretty, { data: jsonObj, deep: 1 });
    // 创建虚拟节点
    const app = createApp({ render: () => vNode });
    app.mount(value);
  });
}
</script>

<style lang="scss">
@mixin logLable($title, $color: var(--color-text-2)) {
  &::before {
    display: block;
    content: $title;
    position: absolute;
    right: 10px;
    top: 10px;
    color: $color;
    font-size: 12px;
  }
}

.log_modal_body {
  max-height: 60vh;
  overflow-y: auto;

  .log_modal_content {
    color: var(--color-text-2);

    > div {
      padding: 20px;
      background-color: var(--color-fill-2);
      margin-bottom: 20px;
      border-radius: 5px;
      position: relative;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .log_request_header {
    @include logLable("请求头");
  }

  .log_request {
    @include logLable("请求");

    .log_request_head {
      .log_request_method {
        font-weight: 700;

        &.delete {
          color: rgb(var(--red-6));

          & ~ .log_request_path {
            color: rgb(var(--red-4));
          }
        }

        &.post {
          color: rgb(var(--green-6));

          & ~ .log_request_path {
            color: rgb(var(--green-4));
          }
        }

        &.put {
          color: rgb(var(--orange-6));

          & ~ .log_request_path {
            color: rgb(var(--orange-4));
          }
        }

        &.get {
          color: rgb(var(--arcoblue-6));

          & ~ .log_request_path {
            color: rgb(var(--arcoblue-4));
          }
        }
      }
    }
  }

  .log_item {
    display: flex;

    .log_item_label {
      font-weight: 600;
      white-space: nowrap;

      &::after {
        content: ":";
        display: inline-block;
        margin-right: 10px;
      }
    }

    .log_item_content {
      word-break: break-all;
    }

    &.info {
      @include logLable("info", rgb(var(--arcoblue-5)));
    }

    &.warning {
      @include logLable("warning", rgb(var(--orange-5)));
    }

    &.error {
      @include logLable("error", rgb(var(--red-6)));
    }
  }

  .log_response {
    @include logLable("响应");
  }

  .vjs-tree-node.is-highlight,
  .vjs-tree-node:hover {
    background-color: var(--color-fill-1);
  }

  .vjs-value {
    white-space: break-spaces;
  }
}

.log_list_view {
  .log_column_title {
    span {
      color: var(--active);
      cursor: pointer;

      &.isRead {
        color: var(--color-text-2);
      }
    }
  }
}

@media screen and (min-width: 1400px) and (max-width: 1800px) {
  .search_date {
    display: none;
  }

  .search_addr {
    display: none;
  }
}
</style>
