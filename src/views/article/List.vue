
<template>
  <el-row>
    <el-col :span="24">
      <ComponentBreadcrumb :breadcrumb="state.breadcrumb" />
      <el-button @click="handleAdd">添加</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24" style="text-align: right">
      <el-date-picker
        style="margin-right: 20px"
        v-model="state.dateValue"
        type="daterange"
        range-separator="至"
        start-placeholder="创建开始日期"
        end-placeholder="创建结束日期"
        @change="handleChangeDate"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-select
        :clearable="true"
        v-model="state.param.type"
        placeholder="请选择文章类型"
        style="margin-right: 20px"
      >
        <el-option
          :label="item.name"
          ˝˝
          :value="item.id"
          :key="item.id"
          v-for="item in state.types"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </el-col>
  </el-row>
  <el-row class="list-datas">
    <el-col :span="24">
      <el-table :data="state.tableData" style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="type" label="文章类型">
          <template #default="scope">{{
            scope.row.type === 1
              ? "原创"
              : scope.row.type === 2
              ? "译文"
              : "转载"
          }}</template>
        </el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column
          prop="preview_num"
          label="预览次数"
          sortable
        ></el-table-column>
        <el-table-column
          prop="abstract"
          label="摘要"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="is_top" label="是否顶置">
          <!-- {{scope.row.is_top}} -->
          <template #default="scope">
            <el-switch
              @change="handleChange(scope.row, scope.$index)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button
              @click="handleModify(scope.row.id)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button @click="handleDel(scope.row.id)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <ComponentPagination :pageParams="state.pageParams" @pageEmit="pageEmitFun" />
  </el-row>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticle, delArticle } from "@/request/blog";
import { ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    onMounted(() => {
      qryTag(state.pageParams);
    });

    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      breadcrumb: {
        delimiter: "/",
        items: [
          {
            name: "首页",
            path: "/",
          },
          {
            name: "文章管理",
            path: "",
          },
          {
            name: "文章列表",
            path: "/article/list",
          },
        ],
      },
      tableData: [],
      dialogFrom: {},
      dialogBox: false,
      pageParams: {
        pageNum: 1,
        pageRow: 10,
        pageTotal: 0,
      },
      param: {
        type: "",
      },
      types: [],
      dateValue: "",
    });

    const qryTag = (params) => {
      getArticle(Object.assign(params)).then((res) => {
        state.tableData = res.items;
        state.pageParams.pageTotal = res.total;
      });
    };
    const handleDetail = (row) => {
      state.dialogFrom = row;
      state.dialogBox = true;
    };
    const handleDel = (id) => {
      ElMessageBox.confirm("您确认删除该?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then((resConfirm) => {
        if (resConfirm) {
          delArticle({ id }).then(() => {
            qryTag(state.pageParams);
            ElMessage.success("删除成功！");
          });
        }
      });
    };
    const pageEmitFun = (val) => {
      qryTag(val);
    };
    const handleAdd = () => {
      window.open("/article/add")
    };
    const handleSearch = () => {};

    const handleModify = (id) => {
      // router.push({
      //   path: "/article/" + id,
      // });
      window.open("/article/" + id)
    };

    return {
      state,
      handleDetail,
      handleDel,
      pageEmitFun,
      handleAdd,
      handleSearch,
      handleModify,
    };
  },
});
</script>
