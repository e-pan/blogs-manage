<template>
  <TicLayout
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
        name: "客户管理",
        path: "",
        subMenu: [
          {
            name: "企业信息管理",
            path: "/customer/company",
          },
          {
            name: "账号信息管理",
            path: "/customer/user",
          },
          {
            name: "前线企业查询",
            path: "/customer/companyBefore",
          },
        ],
      },
      {
        name: "基础配置",
        path: "",
        subMenu: [
          {
            name: "公共目录管理",
            path: "/basics/category",
          },
          {
            name: "基础项目列表",
            path: "/basics/items",
          },
        ],
      },
      {
        name: "公共套餐",
        path: "",
        subMenu: [
          {
            name: "公共套餐管理",
            path: "/package/common",
          },
        ],
      },
      {
        name: "功能权限管理",
        path: "",
        subMenu: [
          {
            name: "菜单管理",
            path: "/system/menu",
          },
          {
            name: "用户管理",
            path: "/system/user",
          },
          {
            name: "角色配置",
            path: "/system/role",
          },
          {
            name: "实验室配置",
            path: "/system/laboratory",
          },
        ],
      },
      {
        name: "订单管理",
        path: "",
        subMenu: [
          {
            name: "订单管理",
            path: "/order/list",
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
      userInfo.value.userName = local.get("userInfo").userName;
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
