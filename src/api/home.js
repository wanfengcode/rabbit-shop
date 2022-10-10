// 提供首页所需api接口
import request from '@/utils/request'

// 获取轮播图数据
export const findBanner = () => {
  return request('/home/banner', 'get')
}
// 获取新鲜好物
export const findNew = () => {
  return request('/home/new', 'get')
}
// 获取人气推荐
export const findPopular = () => {
  return request('/home/hot', 'get')
}
// 获取热门品牌
export const findBrand = () => {
  return request('/home/brand', 'get')
}
