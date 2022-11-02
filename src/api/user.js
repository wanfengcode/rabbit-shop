// 用户相关接口

import request from '@/utils/request'

// 用户名登录，参数：用户名和密码
export const userLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

// 发送短信验证码，参数：手机号
export const msgCode = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

// 验证码登录，参数：手机号、验证码;验证码默认为123456
export const mobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}
