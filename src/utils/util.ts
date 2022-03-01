// import { ajaxNode } from "./index";
/**
 * localStorage 存入和获取
 * set存入数据
 * ex: 存入字符串 local.set('name': 'epan') / 存入对象local.set('sex': { a: boy, b: gril })
 * get获取数据
 * ex: local.get('name')
 * clear清除全部数据
 * ex: local.clear()
 * remove删除数据
 * ex: local.remove('name')
 **/
 const local = {
  set(key: string, val?: any) {
    typeof val === 'string' ? localStorage.setItem(key, val) : localStorage.setItem(key, JSON.stringify(val))
  },
  get(key: string) {
    const val = localStorage.getItem(key)
    if (val) {
      const flag = val.startsWith('{') || val.startsWith('[');
      if (!flag) {
        return val
      } else {
        return JSON.parse(val)
      }
    }
  },
  clear() {
    localStorage.clear()
  },
  remove(key: string) {
    localStorage.removeItem(key)
  }
}

// 重定向URL
const redirect = () => {
  window.location.href = `${window.location.origin}/login?redirect=${window.location.pathname}`
}

// 创建分类树结构数据
const createTreeData = (data?:any, childrenId?:any, parentId?:any) => {
  const cloneData = JSON.parse(JSON.stringify(data)); // 对源数据深度克隆
  const tree = cloneData.filter((father?:any) => {
    //循环所有项
    const branchArr = cloneData.filter((child?:any) => {
      return father[childrenId] == child[parentId]; //返回每一项的子级数组
    });
    if (branchArr.length > 0) {
      father.children = branchArr; //如果存在子级，则给父级添加一个children属性，并赋值
    }
    return father[parentId] == 0; //返回第一层
  });
  return tree;
}
// 接口地址
const apiHost = 'http://api.fuzhongkuo.com/';
// const apiHost = 'http://localhost:4001/';
// 上传地址
const uploadHostPublic = `${apiHost}/upload`
// 当前日期
const currDate = () => {
  const date = new Date();
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  return `${year}_${month}_${day}`
}

// const user_agent = navigator.userAgent.toLowerCase();
// // js错误监控
// window.onerror = (err_message, err_url, err_row, err_column, err_obj) => {
//   // ajaxNode('/jsError/create', { err_message, err_url, err_row, err_column, err_obj, system: 2, user_agent })
// }
// // 接口错误监控
// const apiErrorWatch = (err_message, param, api_url) => {
//   // ajaxNode('/apiError/create', { err_message, param, href: decodeURIComponent(window.location.href), system: 2, api_url, user_agent })
// }
// // 静态资源错误监控
// window.addEventListener('error', (error) => {
//   // 非js错误
//   if (!error.message || !error.cancelable) {
//     let errorObj:any = (error as any).target
//     const {
//       href,
//       baseURI,
//       outerHTML,
//       currentSrc,
//       tagName
//     } = errorObj
  
//     const domNode = [];
//     errorObj.path.forEach(v => {
//       if (v.tagName) {
//         domNode.unshift(v.tagName)
//       }
//     })
//     // ajaxNode('/staticError/create', { path: domNode.join(' > '), href: href ? href : currentSrc, baseURI: decodeURIComponent(baseURI), outerHTML, tagName, system: 2 })
//   }
// }, true)

export {
  local,
  redirect,
  createTreeData,
  apiHost,
  uploadHostPublic,
  currDate,
  // apiErrorWatch
}