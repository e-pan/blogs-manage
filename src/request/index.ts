import axios from 'axios'
import md5 from 'crypto-md5'
import { local, redirect, apiHost } from '@/utils/util'
import { ElMessage, ElLoading } from 'element-plus'
const pid = 'pid.order'
const pcode = 'kPhG6so9xOHY3QsO'

let count = 0
const request = async (url: string, params: any, method: any, option?: any) => {
  // 开启页面加载loading
  let loadingInstance: any
  if (!count) {
    loadingInstance = ElLoading.service({
      fullscreen: true,
      body: true,
      lock: true,
      text: 'loading...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    count++
  }
  function closeLoading() {
    setTimeout(() => {
      loadingInstance && loadingInstance.close()
      count = 0
    }, 1000)
  }
  const timestamp = new Date().valueOf()
  const pmd5 = md5((pid + pcode).toUpperCase(), 'hex')
  const param = JSON.stringify(params) + pmd5.toUpperCase()
  const sign = md5(param + timestamp, 'hex')

  let accessToken = ''
  if (local.get('userInfo')) {
    accessToken = local.get('userInfo').accessToken
  }

  const headers = {
    'Content-Type': 'application/json',
    sign,
    timestamp,
    pid,
    accessToken,
  }

  try {
    const res = await axios({
      method: method || 'post',
      url: apiHost + url,
      data: params,
      headers
    })
    if (res.data.code === 200) {
      closeLoading()
      return res.data
    }  else {
      ElMessage.error(res.data.resultMsg)
      closeLoading()
    }
  } catch (error: any) {
    // token认证失败，重新登录
    if (error.response.status === '401') {
      ElMessage.error('token认证失败，重新登录')
      closeLoading()
      // 非法输入拦截
    } else if (error.response.status === '400') {
      ElMessage.error('非法输入拦截')
      closeLoading()
      return {
        code: error.response.data.status,
        resultMsg: error.response.data.message
      }
    } else {
      ElMessage.error(error)
      closeLoading()
      return error
    }
  }
}

export {
  request
}
