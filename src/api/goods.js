// 商品详情相关请求接口
import request from '@/utils/request'

export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
