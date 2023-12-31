import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "web",
      component: () => import("@/views/web/web.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("@/views/web/index.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/index.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/admin/home/index.vue"),
        },
        {
          path: "center",
          name: "center",
          children: [
            {
              path: "info",
              name: "mineInfo",
              component: () => import("@/views/admin/center/mine_info.vue"),
            },
          ],
        },
        {
          path: "article",
          name: "article",
          children: [
            {
              path: "list",
              name: "articleList",
              component: () => import("@/views/admin/article/article_list.vue"),
            },
          ],
        },
        {
          path: "user",
          name: "user",
          children: [
            {
              path: "list",
              name: "userList",
              component: () => import("@/views/admin/users/user_list.vue"),
            },
          ],
        },
        {
          path: "chat",
          name: "chat",
          children: [
            {
              path: "list",
              name: "chatList",
              component: () => import("@/views/admin/chat/chat_list.vue"),
            },
          ],
        },
        {
          path: "system",
          name: "system",
          children: [
            {
              path: "menuList",
              name: "menuList",
              component: () => import("@/views/admin/system/menu_list.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
