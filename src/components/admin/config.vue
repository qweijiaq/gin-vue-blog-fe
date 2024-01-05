<template>
  <div class="gvb_config_components">
    <div class="left" :style="{ '--col': leftWidth + '%' }">
      <div class="site_info">
        <gvb-title :title="props.title"></gvb-title>
        <slot name="alert"></slot>
        <a-form
          ref="formRef"
          :model="form"
          :label-col-props="{ span: labelSpan }"
          :wrapper-col-props="{ span: wrapperSpan }"
        >
          <a-form-item
            v-for="item in column"
            :field="item.field as keyof settingsType"
            :label="item.label"
            :rules="item.rules"
            :validate-trigger="['blur']"
          >
            <template v-if="item.type === 'boolean'">
              <a-switch
                v-model="form[(item.field as keyof settingsType)]"
              ></a-switch>
            </template>
            <template v-else-if="item.type === 'number'">
              <a-input-number
                :placeholder="item.label"
                v-model="form[(item.field as keyof settingsType)]"
              ></a-input-number>
            </template>
            <template v-else>
              <template v-if="item.iptType === 'password'">
                <a-input
                  :placeholder="item.label"
                  type="password"
                  v-model="form[(item.field as keyof settingsType)]"
                ></a-input>
              </template>
              <template v-else>
                <a-input
                  :placeholder="item.label"
                  v-model="form[(item.field as keyof settingsType)]"
                ></a-input>
              </template>
            </template>
          </a-form-item>
        </a-form>
      </div>
      <div class="config_update">
        <slot name="config_update_extra"></slot>
        <a-button type="primary" @click="updateMethod">更新</a-button>
      </div>
    </div>
    <div class="right" :style="{ '--col': rightWith + '%' }">
      <gvb-help :data="props.helpData"></gvb-help>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { helpType, settingsType } from "@/api/settings";
import GvbHelp from "@/components/admin/help.vue";
import GvbTitle from "@/components/common/title.vue";
import { settingsInfoApi, settingsInfoUpdateApi } from "@/api/settings";
import { Message } from "@arco-design/web-vue";
import { ref } from "vue";
import type { baseResponse } from "@/api";
import { reactive } from "vue";
import type { configColumnType } from "@/types";
import type { settingsName } from "@/api/settings";

const formRef = ref();

interface Props {
  name: settingsName;
  column: configColumnType<any>[];
  labelSpan?: number;
  wrapperSpan?: number;
  leftWidth?: number;
  rightWith?: number;
  helpData?: helpType[];
  title: string;
}

const props = defineProps<Props>();
const form = reactive<settingsType>({
  secret: "",
  expires: 0,
  issuer: "",
});

const {
  labelSpan = 5,
  wrapperSpan = 19,
  leftWidth = 50,
  rightWith = 50,
} = props;

async function updateMethod() {
  let val = await formRef.value.validate();
  if (val) return;
  let res = await settingsInfoUpdateApi(props.name, form);
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
}

async function getData() {
  let res = (await settingsInfoApi(props.name)) as baseResponse<any>;
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Object.assign(form, res.data);
}

getData();
</script>

<style lang="scss">
.gvb_config_components {
  display: flex;

  .left {
    width: var(--col);

    .config_update {
      margin-top: 10px;

      button {
        margin-right: 10px;
      }
    }
  }

  .arco-form {
    margin-top: 20px;
  }

  .right {
    width: var(--col);
    margin-left: 20px;
  }
}
</style>
