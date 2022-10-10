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
  <!-- 人气推荐 -->
  <HomePopular></HomePopular>
  <!-- 热门品牌 -->
  <HomeBrand></HomeBrand>
</template>

<script>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomePopular from './components/HomePopular.vue'
import HomeBrand from './components/HomeBrand.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomePopular,
    HomeBrand
  }
}
</script>

<style lang="less" scoped>
.home-entry {
  height: 500px;
}
</style>
