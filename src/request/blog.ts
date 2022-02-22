import { request } from './index'
// 查询消息列表
const getMessage = (params: any): Promise<any> => {
  return request('message/list', params, 'post')
    .then((res) => {
      return res.data
    })
}
// 删除消息
const delMessage = (params: any): Promise<any> => {
  return request('message/del', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 添加消息
const addMessage = (params: any): Promise<any> => {
  return request('message/add', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 查询友链列表
const getFriend = (params: any): Promise<any> => {
  return request('friend/list', params, 'post')
    .then((res) => {
      return res.data
    })
}
// 删除友链
const delFriend = (params: any): Promise<any> => {
  return request('friend/del', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 添加友链
const addFriend = (params: any): Promise<any> => {
  return request('friend/add', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 修改友链
const modFriend = (params: any): Promise<any> => {
  return request('friend/modify', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 查询标签列表
const getTag = (params: any): Promise<any> => {
  return request('tag/list', params, 'post')
    .then((res) => {
      return res.data
    })
}
// 删除标签
const delTag = (params: any): Promise<any> => {
  return request('tag/del', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 添加标签
const addTag = (params: any): Promise<any> => {
  return request('tag/add', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 修改标签
const modTag = (params: any): Promise<any> => {
  return request('tag/modify', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 查询文章列表
const getArticle = (params: any): Promise<any> => {
  return request('article/list', params, 'post')
    .then((res) => {
      return res.data
    })
}
// 删除文章
const delArticle = (params: any): Promise<any> => {
  return request('article/del', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 添加文章
const addArticle = (params: any): Promise<any> => {
  return request('article/add', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}
// 修改文章
const modArticle = (params: any): Promise<any> => {
  return request('article/modify', params, 'post')
    .then((res) => {
      return res.code === 200 ? true : false
    })
}

export {
  getMessage,
  delMessage,
  addMessage,
  getFriend,
  delFriend,
  addFriend,
  modFriend,
  getTag,
  delTag,
  addTag,
  modTag,
  getArticle,
  delArticle,
  addArticle,
  modArticle
}