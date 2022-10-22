// 商品详情相关请求接口
import request from '@/utils/request'

// 获取商品详情
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

// 获取商品同类推荐|猜你喜欢
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

// 热榜,id-->商品Id,limit-->返回数据的数量限制,type-->热榜类型，1--> 24小时榜、2-->周热销榜、3-->总热销榜
export const findHotGoods = ({ id, type = 1, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}

// 商品评价信息
export const findGoodsComment = (id) => {
  // return request(`/goods/${id}/evaluate`, 'get') 该接口尚未完善无法返回有效数据
  // 前端测试接口
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

// 商品评价列表
export const findGoodsCommentList = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
