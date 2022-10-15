import request from '@/utils/request'

// 获取全部分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
// 根据Id获取相应一级分类
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
// 二级分类筛选条件
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
// 二级分类商品列表
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
