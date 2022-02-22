
<template>
  <el-row>
    <el-col :span="24">
      <TicBreadcrumb :breadcrumb='state.breadcrumb' />
    </el-col>
  </el-row>
  <el-row class='list-datas'>
    <el-col :span="24">
      <el-table :data="state.tableData"
                style="width: 100%">
        <el-table-column prop="type"
                         label="留言类型">
          <template #default="scope">
            {{scope.row.type}}
          </template>
        </el-table-column>
        <el-table-column prop="nick"
                         label="昵称"></el-table-column>
        <el-table-column prop="content"
                         label="留言内容">
          <template #default='scope'>
            <TicTooltip v-if='scope.row.content'
                        :content='scope.row.content'
                        :width='280' />
          </template>
        </el-table-column>
        <el-table-column prop="websister_name"
                         label="网站名称"></el-table-column>
        <el-table-column prop="websister_link"
                         label="网站地址"></el-table-column>
        <el-table-column prop="title"
                         label="所属文章">
          <template #default="scope">
            <a :href="'/article/detail/' + scope.row.article_id"
               target="_blank">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="留言时间"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template #default="scope">
            <el-button @click="handleDetail(scope.row)"
                       type="text"
                       size="small">查看</el-button>
            <el-button @click="handleDel(scope.row.id)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <TicPagination :pageParams='state.pageParams'
                   @pageEmit='pageEmitFun' />
  </el-row>
  <el-dialog title="留言详情"
             v-model="state.dialogBox">
    <el-form label-width="80px"
             :model="state.dialogFrom">
      <el-form-item label="留言类型">
        <el-tag>{{ state.dialogFrom.type }}</el-tag>
      </el-form-item>
      <el-form-item label="昵称"
                    v-if='state.dialogFrom.nick'>
        <el-input v-model="state.dialogFrom.nick"></el-input>
      </el-form-item>
      <el-form-item label="留言内容"
                    v-if='state.dialogFrom.content'>
        <el-input v-model="state.dialogFrom.content"
                  type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="网站名称"
                    v-if='state.dialogFrom.websister_name'>
        <el-input v-model="state.dialogFrom.websister_name"></el-input>
      </el-form-item>
      <el-form-item label="网站地址"
                    v-if='state.dialogFrom.websister_link'>
        <el-input v-model="state.dialogFrom.websister_link"></el-input>
      </el-form-item>
      <el-form-item label="所属文章"
                    v-if='state.dialogFrom.article_id'>
        <el-input v-model="state.dialogFrom.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="state.dialogBox = false">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { getMessage, delMessage } from '@/request/blog'
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
            name: '信息管理',
            path: '',
          },
          {
            name: '信息列表',
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
      getMessage(Object.assign(params)).then((res) => {
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
          delMessage({ id }).then(() => {
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
