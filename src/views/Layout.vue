<template>
   <div class="container">
     <!-- 顶部通栏 -->
   <NavBar></NavBar>
   <!-- 头部组件 -->
   <Header></Header>
   <!-- main内容容器 -->
   <div class="main">
   <router-view></router-view>
   </div>
   <!-- 底部组件 -->
   <Footer>底部组件</Footer>
   </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    NavBar,
    Header,
    Footer
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.main{
  min-height: 600px;
}
</style>
