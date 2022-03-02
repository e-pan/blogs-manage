
<template>
  <el-row>
    <el-col :span="24">
      <ComponentBreadcrumb :breadcrumb="state.breadcrumb" />
    </el-col>
  </el-row>
  <el-row class="list-datas">
    <el-col :span="24">
      <el-form ref="form"
               :model="state.form"
               label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="state.form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="state.form.type"
                     placeholder="请选择文章类型">
            <el-option :label="item.name"
                       :value="item.id"
                       :key="item.id"
                       v-for="item in types"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图">
          <div style="width: 100%;">
            <img :src="state.form.thumbnail"
                 v-if="state.form.thumbnail" />
          </div>
          <ComponentUpload :action="upload.action"
                           :show-file-list="upload.showFileList"
                           :multiple="upload.multiple"
                           :limit="upload.limit"
                           :size="upload.size"
                           :accept="upload.accept"
                           @uploadEmit="uploadEmitFun" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="state.form.author"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="state.form.sourse"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="state.tags"
                     multiple
                     placeholder="请选择标签"
                     clearable
                     style="width: 100%;">
            <el-option v-for="item in state.tagList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否顶置">
          <el-switch v-model="state.form.is_top"></el-switch>
        </el-form-item>
        <el-form-item label="内容摘要">
          <el-input type="textarea"
                    v-model="state.form.abstract"
                    rows="5"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="state.form.content"
                  :init="init" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addArticle, modArticle, dtlArticle, getTag } from '@/request/blog'
import { ElMessageBox, ElMessage } from 'element-plus'
import { apiHost } from '@/utils/util'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme' // 引用主题文件
import 'tinymce/icons/default' // 引用图标文件
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/print'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/media'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/searchreplace'
import axios from 'axios'

export default defineComponent({
  components: {
    editor: Editor,
  },
  setup() {
    const init = {
      language_url: require('./static/langs/zh_CN.js'), // 中文语言包路径
      language: 'zh_CN',
      skin_url: require('./static/skins/ui/oxide/skin.css'), // 编辑器皮肤样式
      height: 320,
      toolbar_mode: 'none',
      plugins:
        'image searchreplace link code table lists print preview fullscreen restoredraft codesample anchor pagebreak media insertdatetime emoticons hr', // 插件需要import进来
      toolbar1:
        'undo redo cut copy paste searchreplace | styleselect fontselect fontsizeselect | lineheight forecolor backcolor bold italic underline strikethrough ',
      toolbar2:
        'alignleft aligncenter alignright alignjustify outdent indent | removeformat subscript superscript | link image media insertdatetime emoticons anchor pagebreak hr blockquote  table numlist bullist codesample | code print preview fullscreen',
      content_style: 'p {margin: 5px 0; font-size: 14px}',
      fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
      font_formats:
        '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      branding: false,
      elementpath: false,
      resize: false, // 禁止改变大小
      statusbar: false, // 隐藏底部状态栏
      menubar: 'file edit insert view format table',
      menu: {
        file: {
          title: 'File',
          items: 'newdocument restoredraft | preview | print',
        },
      },
      file_browser_callback_types: 'image',
      images_reuse_filename: true,
      images_upload_handler: (blobInfo, success, failure) => {
        let formdata = new FormData()
        const file = blobInfo.blob()
        formdata.append('file', file, file.name)
        const url = `${apiHost}'upload'`
        axios
          .post(url, formdata, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res: any) => {
            if (res.data.code === 200) {
              success(res.data.data)
            } else {
              ElMessage.error(res.data.dataMsg)
              failure()
            }
          })
      },
    }
    onMounted(() => {
      tinymce.init(init as any)
      const { id } = route.params
      if (id !== 'add') getDtlArticle(id)
      qryTag()
    })

    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      breadcrumb: {
        delimiter: '/',
        items: [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '文章列表',
            path: '/article/list',
          },
          {
            name: '文章详情',
            path: '',
          },
        ],
      },
      form: {
        thumbnail: '',
        tag_id: '',
      },
      tags: [],
      tagList: [],
    })
    const types = reactive([
      {
        id: 1,
        name: '原创',
      },
      {
        id: 2,
        name: '译文',
      },
      {
        id: 3,
        name: '转载',
      },
    ])
    const upload = reactive({
      action: 'http://api.fuzhongkuo.com/upload',
      showFileList: false,
      multiple: false,
      limit: 5,
      size: 1,
      accept: 'image/*,.pdf',
    })

    const getDtlArticle = (id) => {
      dtlArticle({ id }).then((res) => {
        state.tags = res.tag_id.split(',')
        state.form = res
      })
    }
    const handleAdd = () => {}
    const handleSearch = () => {}
    const onSubmit = () => {
      state.form.tag_id = state.tags.join(',')
      console.log(state.form)
      const { id } = route.params
      if (id !== 'add') {
        modArticle(state.form).then((res) => {
          if (res) ElMessage.success('修改成功')
        })
      } else {
        addArticle(state.form).then((res) => {
          if (res) ElMessage.success('添加成功')
        })
      }
    }
    const handleCancel = () => {
      router.push('/article/list')
    }
    const qryTag = () => {
      getTag({
        pageNum: 1,
        pageRow: 999,
      }).then((res) => {
        state.tagList = res.items
      })
    }
    const uploadEmitFun = (val: any): void => {
      state.form.thumbnail = val[0].response.data
    }

    return {
      state,
      types,
      upload,
      handleAdd,
      handleSearch,
      onSubmit,
      handleCancel,
      apiHost,
      init,
      uploadEmitFun,
    }
  },
})
</script>


<style>
.tox-tinymce {
  width: 100%;
}
</style>