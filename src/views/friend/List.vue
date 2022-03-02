
<template>
  <el-row>
    <el-col :span="24">
      <ComponentBreadcrumb :breadcrumb='state.breadcrumb' />
    </el-col>
  </el-row>
  <el-row class='list-datas'>
    <el-table :data="state.tableData"
              style="width: 100%">
      <el-table-column prop="name"
                       label="链接名称"></el-table-column>
      <el-table-column prop="link"
                       label="链接地址">
        <template #default='scope'>
          <a :href="scope.row.link"
             target="_blank">{{scope.row.link}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="phone"
                       label="联系方式"></el-table-column>
      <el-table-column prop="create_time"
                       label="创建时间"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template #default='scope'>
          <el-button @click="handleModify(scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row.id)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ComponentPagination :pageParams='state.pageParams'
                   @pageEmit='pageEmitFun' />
  </el-row>
  <el-dialog title="友链维护"
             v-model="state.dialogBox">
    <el-form label-width="80px"
             :model="dialogFrom">
      <el-form-item label="链接名称">
        <el-input v-model="dialogFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input placeholder="请输入内容"
                  v-model="dialogFrom.link"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="dialogFrom.phone"
                  maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <img :src="dialogFrom.thumbnail"
             v-if='dialogFrom.thumbnail' />
        <el-upload :action='host + "/upload"'
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :before-remove="beforeRemove"
                   :on-success="onSuccess"
                   multiple
                   :limit="3"
                   :on-exceed="handleExceed">
          <el-button size="small"
                     type="primary">点击上传</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea"
                  v-model="dialogFrom.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { getFriend, delFriend, addFriend, modFriend } from '@/request/blog'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    onMounted(() => {
      qryMessageList(state.pageParams)
    })

    const state = reactive({
      breadcrumb: {
        delimiter: '/',
        items: [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '友链管理',
            path: '',
          },
          {
            name: '友链列表',
            path: '/message/list',
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
    })

    const qryMessageList = (params) => {
      getFriend(Object.assign(params)).then((res) => {
        state.tableData = res.items
        state.pageParams.pageTotal = res.total
      })
    }
    const handleDetail = (row) => {
      state.dialogFrom = row
      state.dialogBox = true
    }
    const handleDel = (id) => {
      ElMessageBox.confirm('您确认删除该?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then((resConfirm) => {
        if (resConfirm) {
          delFriend({ id }).then(() => {
            qryMessageList(state.pageParams)
            ElMessage.success('删除成功！')
          })
        }
      })
    }
    const pageEmitFun = (val) => {
      console.log(val)
    }

    return {
      state,
      handleDetail,
      handleDel,
      pageEmitFun,
    }
  },
})
</script>
