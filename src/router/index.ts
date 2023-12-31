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
      meta: {
        title: "Home",
      },
      component: () => import("@/views/admin/index.vue"),
      children: [
        {
          path: "",
          name: "home",
          meta: {
            title: "首页",
          },
          component: () => import("@/views/admin/home/index.vue"),
        },
        {
          path: "center",
          name: "center",
          meta: {
            title: "个人中心",
          },
          children: [
            {
              path: "info",
              name: "mineInfo",
              meta: {
                title: "我的信息",
              },
              component: () => import("@/views/admin/center/mine_info.vue"),
            },
          ],
        },
        {
          path: "article",
          name: "article",
          meta: {
            title: "文章管理",
          },
          children: [
            {
              path: "list",
              name: "articleList",
              meta: {
                title: "文章列表",
              },
              component: () => import("@/views/admin/article/article_list.vue"),
            },
          ],
        },
        {
          path: "user",
          name: "user",
          meta: {
            title: "用户管理",
          },
          children: [
            {
              path: "list",
              name: "userList",
              meta: {
                title: "用户列表",
              },
              component: () => import("@/views/admin/users/user_list.vue"),
            },
          ],
        },
        {
          path: "chat",
          name: "chat",
          meta: {
            title: "群聊管理",
          },
          children: [
            {
              path: "list",
              name: "chatList",
              meta: {
                title: "聊天记录",
              },
              component: () => import("@/views/admin/chat/chat_list.vue"),
            },
          ],
        },
        {
          path: "system",
          name: "system",
          meta: {
            title: "系统管理",
          },
          children: [
            {
              path: "menuList",
              name: "menuList",
              meta: {
                title: "菜单列表",
              },
              component: () => import("@/views/admin/system/menu_list.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
