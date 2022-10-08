import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
// 商品分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    // payload为更改后的分类数据集合
    setList (state, payload) {
      state.list = payload
    },
    // show hide 方法用于控制二级分类层显示与否
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    async getList (ctx) {
      // 向服务器发送数据请求
      const { result } = await findAllCategory()
      // 遍历拿到的数据集合，给每一个对象都添加一个open字段来控制二级分类的显示与隐藏
      result.forEach(item => {
        item.open = false
      })
      // 将数据更新值仓库中
      ctx.commit('setList', result)
    }
  }
}
