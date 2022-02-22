/**
 * 手机号校验
 * */
  export const validatorUserPhone = (rule, value, callback) => {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  if (!value) {
    return callback(new Error('请输入手机'));
  } else if (!reg.test(value)) {
    return callback(new Error('请输入正确的手机号码'));
  } else {
    return callback()
  }
}

// 电话校验
export const validatePhone = (rule, value, callback) => {
  const reg = /^[\d\s-+*#]+$/
  if (value && !reg.test(value)) {
    return callback(new Error('格式错误'));
  } else {
    return callback()
  }
}

// 邮箱校验
export const validatorEmail = (rule, value, callback) => {
  const reg = /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!value) {
    return callback(new Error('请输入邮箱'));
  } else if (!reg.test(value)) {
    return callback(new Error('请输入正确的邮箱'));
  } else {
    return callback()
  }
}

// 银行账号校验
export const validateBank = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5]+$/
  if (reg.test(value)) {
    return callback(new Error('请输入正确的银行账号'));
  } else {
    return callback()
  }
}

// 身份证号校验
export const validatePersonNo = (rule, value, callback) => {
  const reg =/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (value.length !== 8 && value.length !== 10 && value.length !== 18) {
    return callback(new Error('请输入正确的身份证号码'));
  } else if (value.length === 18 && !reg.test(value)) {
    return callback(new Error('请输入正确的身份证号码'));
  } else {
    return callback()
  }
}

// 税号校验
export const validateTaxNo = (rule, value, callback) => {
  const reg = /^[\da-zA-Z]+$/
  if (value.length !== 15 && value.length !== 17 && value.length !== 18 && value.length !== 20 || !reg.test(value)) {
    return callback(new Error('纳税人识别号应为15、17、18或20位的数字和英文字母组合，请确认您的输入是否正确'));
  } else {
    callback()
  }
}

