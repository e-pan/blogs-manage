<template>
  <ComponentLayout
    :menus="menus"
    :systems="systems"
    :userInfo="userInfo"
    :systemInfo="systemInfo"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, provide } from "vue";
import config from "./../../package.json";
import { local } from "@/utils/util";

export default defineComponent({
  name: "App",
  setup() {
    const menus = ref([
      {
        name: "消息管理",
        path: "",
        children: [
          {
            name: "消息列表",
            path: "/message/list",
          },
        ],
      },
      {
        name: "友链管理",
        path: "",
        children: [
          {
            name: "友链列表",
            path: "/friend/list",
          },
        ],
      },
      {
        name: "标签管理",
        path: "",
        children: [
          {
            name: "标签列表",
            path: "/tag/list",
          },
        ],
      },
      {
        name: "文章管理",
        path: "",
        children: [
          {
            name: "文章列表",
            path: "/article/list",
          },
        ],
      },
    ]);
    provide("menus", menus);
    const systems = ref([]);
    const userInfo = ref({
      userName: "",
    });
    const systemInfo = ref({
      copyright: "2022",
      version: config.version,
      buildDate: "2022年02月19日 18:00:00",
    });

    onMounted(() => {
      userInfo.value.userName = 'Admin'
    });

    return {
      menus,
      systems,
      userInfo,
      systemInfo,
    };
  },
});
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
