<template>
  <div class="table">
    <div class="table_head">
      <div class="action_create">
        <a-button type="primary" @click="add">{{ addLabel }}</a-button>
      </div>
      <div class="action_group" v-if="!props.noActionGroup">
        <a-select
          placeholder="操作"
          style="width: 130px"
          :options="actionOptions"
          v-model="actionValue"
        ></a-select>
        <a-button
          status="danger"
          v-if="actionValue !== undefined && actionValue !== ''"
          @click="actionMethod"
          >执行</a-button
        >
      </div>
      <div class="action_search">
        <a-input-search
          placeholder="搜索"
          v-model="params.key"
          @search="search"
        ></a-input-search>
      </div>
      <div class="action_other_search"></div>
      <div class="action_filter">
        <a-select placeholder="过滤"></a-select>
      </div>
      <div class="action_slot"></div>
      <div class="action_flush">
        <a-button @click="flush"><icon-refresh /></a-button>
      </div>
    </div>
    <div class="table_container">
      <div class="table_content">
        <a-table
          :row-key="rowKey"
          :columns="columns"
          :data="data.list"
          :row-selection="rowSelection"
          v-model:selectedKeys="selectedKeys"
          :pagination="false"
        >
          <template #columns>
            <template v-for="col in props.columns">
              <a-table-column v-if="col.render" :title="(col.title as string)">
                <template #cell="{ record }">
                  <component :is="col.render(record)"></component>
                </template>
              </a-table-column>
              <a-table-column
                v-else-if="!col.slotName"
                :title="(col.title as string)"
                :data-index="col.dataIndex"
              >
              </a-table-column>
              <a-table-column v-else :title="(col.title as string)">
                <template #cell="{ record }" v-if="col.slotName === 'action'">
                  <div class="cell_actions">
                    <a-button type="primary" @click="edit(record)"
                      >编辑</a-button
                    >
                    <a-popconfirm
                      content="是否确认删除?"
                      @ok="removeSingle(record)"
                    >
                      <a-button status="danger" type="primary">删除</a-button>
                    </a-popconfirm>
                  </div>
                </template>
                <template
                  #cell="{ record }"
                  v-else-if="col.slotName === 'created_at'"
                >
                  <span>{{ dateTimeFormat(record.created_at) }}</span>
                </template>
                <template #cell="{ record }" v-else>
                  <slot :name="col.slotName" :record="record"></slot>
                </template>
              </a-table-column>
            </template>
          </template>
        </a-table>
      </div>
      <div class="table_page">
        <a-pagination
          :total="data.count"
          :default-page-size="params.limit"
          v-model:current="params.page"
          @change="pageChange"
          showTotal
          show-jumper
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import { ref } from "vue";
import { reactive } from "vue";
import type { paramsType, baseResponse, listDataType } from "@/api/index";
import type { TableColumnData, TableRowSelection } from "@arco-design/web-vue";
import { dateTimeFormat } from "@/utils/timeFormat";
import { Message } from "@arco-design/web-vue";
import { defaultDeleteApi } from "@/api";

interface Props {
  url: (params: paramsType) => Promise<baseResponse<listDataType<any>>>; // 请求列表数据的api函数
  columns: TableColumnData[]; // 字段
  limit?: number; // 显示多少条，默认10条
  rowKey?: string; // 选中的时候，按照什么选，默认是id
  addLabel?: string; // 添加按钮的提示文字
  defaultDelete?: boolean; // 是否启用默认删除
  noActionGroup?: boolean; // 是否不启用操作组
  actionGroup?: actionOptionType[]; // 操作组
}

// 操作分组的类型
export interface actionOptionType {
  label: string;
  value?: number;
  callback?: (idList: (number | string)[]) => Promise<boolean>;
}

export type RecordType<T> = T;

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "add"): void; // 添加的事件
  (e: "edit", record: RecordType<any>): void; // 编辑的事件
  (e: "remove", idList: (number | string)[]): void; // 删除的事件，单删，批量删除
}>();

const { limit = 10, rowKey = "id", addLabel = "添加" } = props;

const data = reactive<listDataType<any>>({
  list: [],
  count: 0,
});

const selectedKeys = ref(["Jane Doe", "Alisa Ross"]);

const rowSelection = reactive<TableRowSelection>({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});

const params = reactive<paramsType>({
  page: 1,
  limit,
  key: "",
});

// 操作组
const actionOptions = ref<actionOptionType[]>([
  { label: "批量删除", value: 0 },
]);
const actionValue = ref<number | undefined | "">(undefined);

// 获取用户列表
async function getList(p?: paramsType & any) {
  if (p) {
    Object.assign(params, p);
  }
  let res = await props.url(params);
  data.list = res.data.list;
  data.count = res.data.count;
}
getList();

// 初始化用户组
function initActionGroup() {
  if (!props.actionGroup) return;
  for (let i = 0; i < props.actionGroup.length; i++) {
    actionOptions.value.push({
      label: props.actionGroup[i].label,
      value: i + 1,
      callback: props.actionGroup[i].callback,
    });
  }
}
initActionGroup();

function pageChange() {
  getList();
}

// 添加
function add() {
  emits("add");
}

// 编辑
function edit(record: RecordType<any>) {
  emits("edit", record);
}

// 从列表页的api里面匹配路径
const urlRegex = /\.get\("(.*?)",/;

// 单个删除
async function removeSingle(record: RecordType<any>) {
  let id = record[rowKey];
  removeBatch([id]);
}

// 批量删除
async function removeBatch(idList: (number | string)[]) {
  if (props.defaultDelete) {
    let regexResult = urlRegex.exec(props.url.toString());
    if (regexResult === null || regexResult.length !== 2) {
      return;
    }
    let res = await defaultDeleteApi(regexResult[1], idList);
    if (res.code) {
      Message.error(res.msg);
      return;
    }
    Message.success(res.msg);
    selectedKeys.value = [];
    getList();
    return;
  }
  emits("remove", idList);
}

// 搜索
function search() {
  // 搜索的时候，页数就在第一页
  params.page = 1;
  getList();
}

// 刷新
function flush() {
  Message.success("刷新成功");
  getList();
}

// 点击操作执行
function actionMethod() {
  if (actionValue.value === "") {
    return;
  }
  // 判断是不是 0
  if (actionValue.value === 0) {
    // 批量删除
    if (selectedKeys.value.length === 0) {
      Message.warning("请选择要删除的记录");
      return;
    }
    removeBatch(selectedKeys.value);
    return;
  }
  const action = actionOptions.value[actionValue.value as number];
  if (!action.callback) {
    return;
  }
  action.callback(selectedKeys.value).then((res) => {
    if (res) {
      selectedKeys.value = [];
      getList();
      return;
    }
  });
}
</script>

<style lang="scss">
.table {
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .table_head {
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    position: relative;

    > div {
      margin-right: 10px;
    }

    .action_group {
      display: flex;

      > button {
        margin-left: 10px;
      }
    }

    .action_flush {
      position: absolute;
      right: 20px;
      margin-right: 0;

      button {
        padding: 0 10px;
      }
    }
  }

  .table_container {
    padding: 10px 20px 20px 20px;

    .table_content {
      .cell_actions {
        > button {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .table_page {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>
