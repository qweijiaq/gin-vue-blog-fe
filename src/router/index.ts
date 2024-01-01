import { useStore } from "@/stores";
import { Message } from "@arco-design/web-vue";
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
        {
          path: "news",
          name: "news",
          component: () => import("@/views/web/news.vue"),
        },
        {
          path: "search",
          name: "search",
          component: () => import("@/views/web/search.vue"),
        },
        {
          path: "chat",
          name: "chat",
          component: () => import("@/views/web/chat.vue"),
        },
        {
          path: "article/404",
          name: "article_notfound",
          component: () => import("@/views/web/article_notfound.vue"),
        },
        {
          path: "article/:id",
          name: "article",
          component: () => import("../views/web/article.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        title: "Home",
        isLogin: true,
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
            {
              path: "articles",
              name: "mineArticles",
              meta: {
                title: "我的发布",
              },
              component: () => import("@/views/admin/center/mine_articles.vue"),
            },
            {
              path: "collections",
              name: "mineCollections",
              meta: {
                title: "我的收藏",
              },
              component: () =>
                import("@/views/admin/center/mine_collections.vue"),
            },
            {
              path: "messages",
              name: "mineMessages",
              meta: {
                title: "我的消息",
              },
              component: () => import("@/views/admin/center/mine_messages.vue"),
            },
          ],
        },
        {
          path: "article",
          name: "article",
          meta: {
            title: "文章管理",
            isAdmin: true,
            isTourist: true,
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
            {
              path: "images",
              name: "imageList",
              meta: {
                title: "图片列表",
              },
              component: () => import("@/views/admin/article/image_list.vue"),
            },
            {
              path: "comments",
              name: "commentList",
              meta: {
                title: "评论列表",
              },
              component: () =>
                import("../views/admin/article/comment_list.vue"),
            },
          ],
        },
        {
          path: "user",
          name: "user",
          meta: {
            title: "用户管理",
            isAdmin: true,
            isTourist: true,
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
            {
              path: "messages",
              name: "messageList",
              meta: {
                title: "消息列表",
              },
              component: () => import("../views/admin/users/message_list.vue"),
            },
          ],
        },
        {
          path: "chat",
          name: "chat",
          meta: {
            title: "群聊管理",
            isAdmin: true,
            isTourist: true,
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
            isAdmin: true,
            isTourist: false,
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
            {
              path: "logList",
              name: "logList",
              meta: {
                title: "系统日志",
              },
              component: () => import("@/views/admin/system/log_list.vue"),
            },
            {
              path: "feedbacks",
              name: "feedbackList",
              meta: {
                title: "用户反馈",
              },
              component: () => import("@/views/admin/system/feedback_list.vue"),
            },
            {
              path: "advertise",
              name: "advertiseList",
              meta: {
                title: "广告列表",
              },
              component: () =>
                import("@/views/admin/system/advertise_list.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录",
      },
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/:pathMatch(.*)*", // 页面不存在的情况下会跳到404页面
      name: "notFound",
      component: () => import("@/views/web/notfound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const meta = to.meta;
  if (meta.isLogin && !store.isLogin) {
    Message.warning("需要登录");
    router.push({ name: from.name as string });
    return;
  }
  /*
    isLogin 登录了就能看
    isAdmin  管理员能看
    isTourist  游客能看，管理员也能看
     */

  // 如果是普通用户，那就不能访问 admin 或者游客权限的页面
  if (store.userInfo.role === 2 && (meta.isAdmin || meta.isTourist)) {
    Message.warning("权限不足");
    router.push({ name: from.name as string });
    return;
  }

  // 如果是游客，那就不能访问游客权限为 false 的
  if (store.isTourist && meta.isTourist === false) {
    Message.warning("权限不足");
    router.push({ name: from.name as string });
    return;
  }

  next();
});

export default router;
