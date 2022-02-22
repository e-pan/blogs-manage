import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // layout
  {
    path: "/layout",
    name: "layout",
    component: () => import(/* webpackChunkName: "layout" */ "@/views/Layout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: "single" */ "@/views/Home.vue"),
        meta: {
          title: '首页',
          requireAuth: true
        }
      },
      // 404页面
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "system" */ '@/views/Error.vue'),
        meta: {
          title: '404页面',
          requireAuth: false
        }
      },
      /* 
        消息列表
     */
      {
        path: "/message/list",
        name: "messageList",
        component: () => import(/* webpackChunkName: "message" */ "@/views/message/List.vue"),
        meta: {
          title: '消息列表',
          requireAuth: true
        }
      },
      /* 
        友链列表
     */
      {
        path: "/friend/list",
        name: "FriendList",
        component: () => import(/* webpackChunkName: "friend" */ "@/views/friend/List.vue"),
        meta: {
          title: '友链列表',
          requireAuth: true
        }
      },
      /* 
        标签列表
      */
      {
        path: "/tag/list",
        name: "tagList",
        component: () => import(/* webpackChunkName: "tag" */ "@/views/tag/List.vue"),
        meta: {
          title: '标签列表',
          requireAuth: true
        }
      },
      /* 
        文章列表
      */
      {
        path: "/article/list",
        name: "articleList",
        component: () => import(/* webpackChunkName: "article" */ "@/views/article/List.vue"),
        meta: {
          title: '文章列表',
          requireAuth: true
        }
      },
      /* 
        文章详情
      */
      {
        path: "/article/:id",
        name: "articleDetail",
        component: () => import(/* webpackChunkName: "article" */ "@/views/article/Detail.vue"),
        meta: {
          title: '文章详情',
          requireAuth: true
        }
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "single" */ "@/views/Login.vue"),
    meta: {
      title: '登录页面',
      requireAuth: false
    }
  },
  // 无效路由加载404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'undefined',
    meta: {
      title: 'undefined页面',
      requireAuth: false
    },
    redirect: '/404'
  }
];

export default routes;