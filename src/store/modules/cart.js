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
    }
  },
  actions: {
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
    updateCart (ctx) {
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
    }
  }
}
