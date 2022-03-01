import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { local } from '@/utils/util'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title as string
  if (to.meta.requireAuth) {
    /* 
      没有登录返回登录页面
      这里可以做路由的权限验证，动态路由显示
    */
   
    // next()
    if (local.get("token")) {
      next()
    } else {
      next({
        path: '/login?redirect=' + to.path
      })
    }
  } else {
    next()
  }
})

export default router