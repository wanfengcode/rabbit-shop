// 购物车相关api接口
import request from '@/utils/request'

// 更新商品的 库存 价格以及是否为有效商品;参数：skuId
export const updateCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

// 获取商品的specs(规格)和skus 参数：skuId
export const getSpecsAndSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}
