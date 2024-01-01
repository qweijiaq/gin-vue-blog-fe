<template>
  <div>
    <Modal
      width="400px"
      modal-class="login_modal"
      :visible="props.visible"
      title="用户登录"
      :footer="false"
      @cancel="close"
    >
      <gvb-login-form ref="loginForm" @ok="close" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import GvbLoginForm from "@/components/common/login_form.vue";
import { Modal } from "@arco-design/web-vue";
import { ref } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
  },
});
const emits = defineEmits(["update:visible"]);

const loginForm = ref();

function close() {
  emits("update:visible", false);
  loginForm.value.formReset();
}
</script>

<style lang="scss">
.login_modal {
  .arco-modal-header {
    display: none;
  }
}
</style>
