
<template>
  <el-row>
    <el-col :span="24">
      <ComponentBreadcrumb :breadcrumb="state.breadcrumb" />
      <el-button @click="handleAdd">添加</el-button>
    </el-col>
  </el-row>
  <el-row class="list-datas">
    <el-col :span="24">
      <el-table :data="state.tableData"
                style="width: 100%">
        <el-table-column prop="name"
                         label="名称"></el-table-column>
        <el-table-column prop="alias"
                         label="别名"></el-table-column>
        <el-table-column prop="create_time"
                         label="创建日期"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template #default="scope">
            <el-button @click="handleDetail(scope.row)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row.id)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <ComponentPagination :pageParams="state.pageParams"
                         @pageEmit="pageEmitFun" />
  </el-row>
  <el-dialog title="标签维护"
             v-model="state.dialogBox">
    <el-form label-width="80px"
             :model="state.dialogFrom">
      <el-form-item label="名称">
        <el-input v-model="state.dialogFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="state.dialogFrom.alias"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm()">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { getTag, delTag, addTag, modTag } from '@/request/blog'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    onMounted(() => {
      qryTag(state.pageParams)
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
            name: '标签管理',
            path: '',
          },
          {
            name: '标签列表',
            path: '/tag/list',
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

    const qryTag = (params) => {
      getTag(Object.assign(params)).then((res) => {
        state.tableData = res.items
        state.pageParams.pageTotal = res.total
        state.dialogBox = false
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
          delTag({ id }).then(() => {
            qryTag(state.pageParams)
            ElMessage.success('删除成功！')
          })
        }
      })
    }
    const pageEmitFun = (val) => {
      qryTag(val)
    }
    const handleAdd = () => {
      state.dialogFrom = {}
      state.dialogBox = true
    }
    const submitForm = () => {
      if (state.dialogFrom.id) {
        modTag(state.dialogFrom).then(() => {
          qryTag(state.pageParams)
          ElMessage.success('修改成功！')
        })
      } else {
        addTag(state.dialogFrom).then(() => {
          qryTag(state.pageParams)
          ElMessage.success('保存成功！')
        })
      }
    }

    return {
      state,
      handleDetail,
      handleDel,
      pageEmitFun,
      handleAdd,
      submitForm,
    }
  },
})
</script>
