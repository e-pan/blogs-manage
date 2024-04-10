
<template>
  <el-row>
    <el-col :span="24">
      <ComponentBreadcrumb :breadcrumb='state.breadcrumb' />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-button @click="handleAdd">添加</el-button>
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
             :model="state.dialogFrom">
      <el-form-item label="链接名称">
        <el-input v-model="state.dialogFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input placeholder="请输入内容"
                  v-model="state.dialogFrom.link"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="state.dialogFrom.phone"
                  maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <img :src="state.dialogFrom.thumbnail"
             v-if='state.dialogFrom.thumbnail' />
        <ComponentUpload :action="upload.action"
                         :show-file-list="upload.showFileList"
                         :multiple="upload.multiple"
                         :limit="upload.limit"
                         :size="upload.size"
                         :accept="upload.accept"
                         @uploadEmit="uploadEmitFun" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea"
                  v-model="state.dialogFrom.remark"></el-input>
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
      qryMessageList()
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
      dialogFrom: {} as any,
      dialogBox: false,
      pageParams: {
        pageNum: 1,
        pageRow: 10,
        pageTotal: 0,
      },
    })
    const upload = reactive({
      action: 'https://api.fuzhongkuo.com/upload',
      showFileList: false,
      multiple: false,
      limit: 5,
      size: 1,
      accept: 'image/*,.pdf',
    })

    const qryMessageList = () => {
      getFriend(state.pageParams).then((res) => {
        state.tableData = res.items
        state.pageParams.pageTotal = res.total
      })
    }
    const handleModify = (row) => {
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
            qryMessageList()
            ElMessage.success('删除成功！')
          })
        }
      })
    }
    const pageEmitFun = (val) => {
      console.log(val)
    }
    const handleAdd = () => {
      state.dialogBox = true
      state.dialogFrom = {}
    }
    const uploadEmitFun = (val: any): void => {
      state.dialogFrom.thumbnail = val[0].response.data
    }
    const submitForm = () => {
      if (state.dialogFrom.id) {
        modFriend(state.dialogFrom).then(res => {
          qryMessageList()
          ElMessage.success('修改成功！')
        })
      } else {
        addFriend(state.dialogFrom).then(res => {
          qryMessageList()
          ElMessage.success('添加成功！')
        })
      }
    }

    return {
      state,
      upload,
      handleModify,
      handleDel,
      pageEmitFun,
      handleAdd,
      uploadEmitFun,
      submitForm
    }
  },
})
</script>
