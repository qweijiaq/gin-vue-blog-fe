import type { roleSampleType } from "@/api/big_model";
import { Message } from "@arco-design/web-vue";
import router from "@/router";
import { roleSessionListApi, sessionCreateApi } from "@/api/big_model";

// 选择角色，跳到role_session页面，调用角色会话列表，如果有就取列表的第一个元素的会话id，没有调创建会话的接口
export async function checkRole(record: roleSampleType) {
  let res = await roleSessionListApi({ roleID: record.id });
  if (res.code) {
    Message.error(res.msg);
    return;
  }
  let sessionID: number;
  if (res.data.list.length > 0) {
    // 选第一个去跳
    sessionID = res.data.list[0].id;
  } else {
    // 调创建会话那个接口
    let res1 = await sessionCreateApi(record.id);
    if (res1.code) {
      Message.error(res1.msg);
      return;
    }
    sessionID = res1.data;
  }

  router.push({
    name: "role_session",
    query: {
      roleID: record.id,
      sessionID: sessionID,
    },
  });
}
