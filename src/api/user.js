// 用户相关接口

import request from '@/utils/request'

// 用户登录，参数：用户民和密码
export const userLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
