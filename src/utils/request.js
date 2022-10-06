
import axios from 'axios'
import router from '@/router'
import store from '@/store'

export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(config => {
  const { userMessage } = store.state.user
  // 判断用户是否存在token值，存储在则在请求头位置携带其token值，不存在则报错
  if (userMessage.token) {
    config.header.Authorization = `Bearer ${userMessage.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => res.data, (err) => {
  if (err.response && err.response.status === 401) {
    // 清空无效用户信息
    store.commit('user/setUser', {})
    // 跳转到登录页，跳转时携带当前页地址以便登陆后返回
    // encodeURIComponent用于将地址转码，防止下面字符拼接在解析时出现问题
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }

  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, data) => {
  return instance({
    url,
    method,
    // []设置一个动态的key，通过表达式的结果来决定具体的key值
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
