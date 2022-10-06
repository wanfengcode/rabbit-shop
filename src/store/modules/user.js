// 用户模块
export default {
  // 开启模块命名，通过名字来区分不同模块
  namespaced: true,
  state () {
    return {
      // userMessage用于存储用户信息
      userMessage: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 更新用户信息，newUser存储着修改后的用户信息
    setUser (state, newUser) {
      state.userMessage = newUser
    }
  }
}
