<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    }
  },
})
</script>

<style lang="scss">
body {
  margin: 0 auto;
  height: 100vh;
}
#app {
  margin: 0 auto;
  padding: 0;
  height: 100vh;
}
</style>
