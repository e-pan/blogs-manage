
<template>
  <el-row>
    <el-col :span="24">
      <TicBreadcrumb :breadcrumb="state.breadcrumb" />
    </el-col>
  </el-row>
  <el-row class="list-datas">
    <el-col :span="24">
      <el-form ref="form" :model="state.form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="state.form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="state.form.type" placeholder="请选择文章类型">
            <el-option
              :label="item.name"
              :value="item.id"
              :key="item.id"
              v-for="item in types"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图">
          <img :src="state.form.thumbnail" v-if="state.form.thumbnail" />
          <el-upload
            :action="host + '/upload'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="onSuccess"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="state.form.author"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="state.form.sourse"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-checkbox-group v-model="state.form.tag_id">
            <el-checkbox
              v-for="(item, index) in tags"
              :label="item.name"
              :vlaue="item.id"
              :key="index"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否顶置">
          <el-switch v-model="state.form.is_top"></el-switch>
        </el-form-item>
        <el-form-item label="内容摘要">
          <el-input type="textarea" v-model="state.form.abstract"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor
            ref="myQuillEditor"
            :content="state.form.content"
            :options="editorOption"
            @change="onEditorChange($event)"
          ></quill-editor>
          <el-upload
            :action="host + '/upload'"
            :on-success="onSuccessEdit"
            style="position: fixed; top: -999px; left: -999px"
          >
            <el-button size="small" type="primary" id="uploadImg"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { getArticle, delArticle } from "@/request/blog";
import { ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    onMounted(() => {
      qryTag(state.pageParams);
    });

    const state = reactive({
      breadcrumb: {
        delimiter: "/",
        items: [
          {
            name: "首页",
            path: "/",
          },
          {
            name: "文章列表",
            path: "/article/list",
          },
          {
            name: "文章详情",
            path: "",
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
      form: {}
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
    const handleAdd = () => {};
    const handleSearch = () => {};

    return {
      state,
      handleDetail,
      handleDel,
      pageEmitFun,
      handleAdd,
      handleSearch,
    };
  },
});
</script>
