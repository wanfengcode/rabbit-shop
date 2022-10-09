<template>
  <!-- 首页入口包含 左侧分类和轮播图 -->
  <div class="home-entry">
    <div class="container">
      <HomeCategory></HomeCategory>
      <HomeBanner></HomeBanner>
    </div>
  </div>
  <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
</template>

<script>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew
  }
}
</script>

<style lang="less" scoped>
.home-entry{
  height: 500px;
}
</style>
