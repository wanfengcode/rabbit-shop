<template>
  <nav class="navBar">
    <div class="container">
      <ul>
        <template v-if="userMes.token">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a>
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

    /*
     顶部通栏布局
    1.在components下建立公共组件Navbar.vue，完成布局和样式
    2.在Layout组件中导入并使用Navbar组件完成顶部通栏布局
        2.1在NavBar组件中，根据用户信息中的token值显示 用户名| 退出登录 或者 请先登录|免费注册
    */

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'NavBar',
  setup () {
    const store = useStore()
    const userMes = computed(() => {
      return store.state.user.userMessage
    })

    return { userMes }
  }
}
</script>

<style scoped lang="less">
.navBar {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
