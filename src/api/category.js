import request from '@/utils/request'

// 获取全部分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
// 根据Id获取相应一级分类
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
