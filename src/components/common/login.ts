import { defineComponent, h, createApp, ref } from "vue";
import GvbLogin from "@/components/common/login.vue";
const visible = ref<undefined | boolean>(undefined);
export function showLogin() {
  if (visible.value === undefined) {
    const component = defineComponent({
      setup() {
        const onClose = () => {
          visible.value = false;
        };
        return {
          visible,
          onClose,
        };
      },
      render() {
        return h(GvbLogin, {
          visible: this.visible,
          onClose: this.onClose,
        });
      },
    });

    const app = createApp(component);
    const div = document.createElement("div");
    app.mount(div);
    document.body.appendChild(div);
  }
  visible.value = true;
}
