<template>
  <div class="table">
    <div class="table_head">
      <div class="action_create">
        <a-button type="primary">添加</a-button>
      </div>
      <div class="action_group">
        <a-select placeholder="操作"></a-select>
      </div>
      <div class="action_search">
        <a-input-search placeholder="搜索"></a-input-search>
      </div>
      <div class="action_other_search"></div>
      <div class="action_filter">
        <a-select placeholder="过滤"></a-select>
      </div>
      <div class="action_slot"></div>
      <div class="action_flush">
        <a-button><icon-refresh /></a-button>
      </div>
    </div>
    <div class="table_container">
      <div class="table_content">
        <a-table
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
                    <a-button type="primary">编辑</a-button>
                    <a-button status="danger">删除</a-button>
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
        <a-pagination :total="data.count" show-jumper />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import { ref } from "vue";
import { reactive } from "vue";
import type { paramsType, baseResponse, listDataType } from "@/api/index";
import type { TableColumnData } from "@arco-design/web-vue";
import { dateTimeFormat } from "@/utils/timeFormat";

interface Props {
  url: (params: paramsType) => Promise<baseResponse<listDataType<any>>>; // 请求列表数据的api函数
  columns: TableColumnData[]; // 字段
}

const props = defineProps<Props>();

const data = reactive<listDataType<any>>({
  list: [],
  count: 0,
});

async function getList() {
  let res = await props.url({});
  console.log(res.data.list);
  data.list = res.data.list;
  data.count = res.data.count;
}

getList();

const selectedKeys = ref(["Jane Doe", "Alisa Ross"]);

const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});
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
