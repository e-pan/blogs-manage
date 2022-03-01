import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus' // 开发期间全局引用，生产可以按需引用
import 'element-plus/theme-chalk/index.css' // element ui
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文包
import '@/assets/style/variables.scss' // 重置elment ui的样式
import '@/assets/style/common.scss'
import blogsComponents from 'blogs-components'

console.log('process.env', process.env)
const app = createApp(App)
// 自定义指令
app.directive('btnAuth', {
  beforeMount() { },
  mounted(el, binding, vNode) {
    const funcItem = store.state.userRights as any;
    const btns = funcItem.funcItem.filter(v => {
      return v.funcType === 2
    })
    if (!btns.some(v => {
      return v.buttonCode === String(binding.value)
    })) {
      el.setAttribute('disabled', true) // 没有权限禁用按钮
      el.style.display = 'none' // 没有权限隐藏按钮
    }
  },
  beforeUpdate() { },
  updated() { },
  beforeUnmount() { },
  unmounted() { }
})
// const userRouter = router()
app.use(blogsComponents)
app.use(ElementPlus, { locale })
app.use(store).use(router).mount("#app");
