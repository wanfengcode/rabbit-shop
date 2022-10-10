import { createStore } from 'vuex'
// 该插件用于本地存储token值、用户基本信息等数据；免去设置localStorage
import createPersistedState from 'vuex-persistedstate'
// 导入模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  // 存储数据
  state: {
  },
  // vuex的计算属性
  getters: {
  },
  // 修改数据,实际开发中用于提交数据的变动此时数据还未发生改变(commit)
  mutations: {
  },
  // 请求数据，实际开发中将mutation提交的数据变动执行此时数据为改变后的值(dispatch)
  actions: {
  },
  // 分模块，注册模块
  modules: {
    user,
    cart,
    category
  },
  // 配置插件
  plugins: [
    createPersistedState({
      // 本地存储别名，方便之后使用
      key: 'erabbit-store',
      // 指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
