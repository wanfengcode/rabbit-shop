import { updateCartGoods } from '@/api/cart'

// 购物车模块
export default {
  namespaced: true,
  state () {
    return {
      // 购物车列表
      list: []
    }
  },
  getters: {
    // 失效商品列表
    inValidList (state) {
      return state.list.filter(item => item.stock <= 0 || !item.isEffective)
    },
    // 已选择商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选择商品数量
    selectedCount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 需支付金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    //  是否全选
    isSelectedAll (state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    },
    // 有效商品列表
    validList (state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective === true)
    },
    // 有效商品数量
    validCount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    }
  },
  mutations: {
    // 设置购物车商品信息
    setCart (state, payload) {
      /*
          本地更新购物车列表
          列表中是否已存在相同商品，
          若有则取出其存储的数量累加到payload的数量中，并且删除该条商品信息
          在列表第一个位置添加payload，更新商品的最新信息;
          若没有则直接添加商品
        */
      const tempIndex = state.list.findIndex(item => item.skuId === payload.skuId)
      if (tempIndex > -1) {
        const count = state.list[tempIndex].count
        payload.count += count
        state.list.splice(tempIndex, 1)
      }
      state.list.unshift(payload)
    },
    // 更新购物车商品的库存、价格和有效性
    updateCart (state, payload) {
      // 找到需要修改的商品信息
      const updateGoods = state.list.find(item => item.skuId === payload.skuId)
      for (const key in payload) {
        if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
          updateGoods[key] = payload[key]
        }
      }
    },
    // 删除购物车商品
    deleteCartGoods (state, skuId) {
      const goodsIndex = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(goodsIndex, 1)
    }
  },
  actions: {
    // 购物车有效商品列表的全选/非全选
    isSelectedAll (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.userMessage.token) {
          // 用户已登录
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 更新购物车商品信息:selected是否选择、count商品数量选择
    updateCart (ctx, { skuId, selected }) {
      // payload:skuId、selected值
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.userMessage.token) {
          // 用户已登录
        } else {
          // 未登录
          ctx.commit('updateCart', { skuId, selected })
          resolve()
        }
      })
    },
    // 设置购物车商品信息
    setCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.userMessage.token) {
          // 用户已登录
        } else {
          // 未登录
          ctx.commit('setCart', payload)
          resolve()
        }
      })
    },
    // 获取购物车列表,更新购物车商品的库存和有效性
    getCartList (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.userMessage.token) {
          // 已登录
        } {
          // 未登录
          const promiseArr = ctx.state.list.map(item => {
            return updateCartGoods(item.skuId)
          })
          Promise.all(promiseArr).then(dataList => {
            dataList.forEach((data, index) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[index].skuId, ...data.result })
            })
            resolve()
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    // 删除购物车商品
    deleteCartGoods (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.userMessage.token) {
          // 已登录
        } else {
          ctx.commit('deleteCartGoods', skuId)
          resolve()
        }
      })
    }
  }
}
