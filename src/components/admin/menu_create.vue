<template>
  <div>
    <a-modal
      :title="editId ? '编辑菜单' : '创建菜单'"
      :visible="props.visible"
      @before-open="beforeOpen"
      @cancel="emits('update:visible', false)"
      :on-before-ok="okHandler"
    >
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="title"
          label="菜单标题"
          :rules="[{ required: true, message: '请输入菜单标题' }]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="菜单标题"></a-input>
        </a-form-item>
        <a-form-item
          field="path"
          label="菜单路径"
          :rules="[{ required: true, message: '请输入菜单路径' }]"
          :validate-trigger="['blur']"
        >
          <a-input v-model="form.path" placeholder="菜单路径"></a-input>
        </a-form-item>
        <a-form-item label="slogan">
          <a-input v-model="form.slogan" placeholder="slogan"></a-input>
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea
            v-model="form.abstractString"
            placeholder="简介"
            :auto-size="{ minRows: 2, maxRows: 2 }"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="bannerT">
          <a-input-number
            v-model="form.banner_time"
            placeholder="banner切换时间"
          ></a-input-number>
          <template #extra>
            <div>banner图的切换时间</div>
          </template>
        </a-form-item>
        <a-form-item label="abstractT">
          <a-input-number
            v-model="form.abstract_time"
            placeholder="简介切换时间"
          ></a-input-number>
          <template #extra>
            <div>简介内容的切换时间</div>
          </template>
        </a-form-item>
        <a-form-item label="序号">
          <a-input-number
            v-model="form.sort"
            placeholder="序号"
          ></a-input-number>
          <template #extra>
            <div>序号大的在前面</div>
          </template>
        </a-form-item>
        <a-form-item label="banner图">
          <a-select
            v-model="form.imageIdList"
            multiple
            placeholder="选择banner图"
            allow-clear
          >
            <a-option
              v-for="item in imageIdList"
              :value="item.id"
              :key="item.id"
            >
              <div class="banner_image_div">
                <img height="40" :src="item.path" alt="" /> {{ item.name }}
              </div>
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type {
  imageIdSortList,
  menuCreateRequest,
  bannerType,
} from "@/api/menu";
import { menuCreateApi, menuUpdateApi } from "@/api/menu";
import { imageIdListApi } from "@/api/image";
import type { imageIdType } from "@/api/image";
import { Message } from "@arco-design/web-vue";
import { defaultMenuForm } from "@/api/menu";
import type { baseResponse } from "@/api";

interface Props {
  visible: boolean;
  record: menuCreateRequest & { banners: bannerType[]; id?: number };
}

const props = defineProps<Props>();

const imageIdList = ref<imageIdType[]>([]);

async function getList() {
  let res = await imageIdListApi();
  imageIdList.value = res.data;
}

getList();

const emits = defineEmits(["update:visible", "ok"]);

const form = reactive<
  menuCreateRequest & { abstractString: string; imageIdList: number[] }
>({
  abstract: [],
  abstract_time: 7,
  banner_time: 7,
  image_sort_list: [],
  path: "",
  slogan: "",
  sort: 1,
  title: "",
  abstractString: "",
  imageIdList: [],
});

const editId = ref<number | undefined>(undefined);

function beforeOpen() {
  Object.assign(form, props.record);
  // abs
  form.abstractString = props.record.abstract.join("\n");
  // banner
  const imageIdList: number[] = [];
  for (const banner of props.record.banners) {
    imageIdList.push(banner.id);
  }
  form.imageIdList = imageIdList;
  editId.value = props.record.id;
}

const formRef = ref();

async function okHandler() {
  let val = await formRef.value.validate();
  if (val) return false;
  form.abstract = form.abstractString.split("\n");
  let imageSortIdList: imageIdSortList[] = [];
  for (let i = 0; i < form.imageIdList.length; i++) {
    const imageId = form.imageIdList[i];
    imageSortIdList.push({
      image_id: imageId,
      sort: form.imageIdList.length - i,
    });
  }
  form.image_sort_list = imageSortIdList;
  let res: baseResponse<string>;
  if (editId.value) {
    res = await menuUpdateApi(editId.value, form);
  } else {
    res = await menuCreateApi(form);
  }
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  Message.success(res.msg);
  Object.assign(form, defaultMenuForm);
  emits("update:visible", false);
  emits("ok");
}
</script>

<style lang="scss">
.banner_image_div {
  display: flex;
  align-items: center;
  padding: 5px 0;

  img {
    margin-right: 5px;
    border-radius: 5px;
  }
}
</style>
