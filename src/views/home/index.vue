<template>
    <div class="container">
      <div class="home-entry">
        <!-- 首页入口包含 左侧分类和轮播图 -->
        <HomeCategory></HomeCategory>
        <HomeBanner></HomeBanner>
      </div>
    </div>
</template>

<script>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner
  }
}
</script>

<style lang="less" scoped>

</style>
