<template>
    <div class="container">
      <div class="home-entry">
        <!-- 首页入口包含 左侧分类和轮播图 -->
        <HomeCategory></HomeCategory>
      </div>
    </div>
</template>

<script>
import HomeCategory from '@/views/home/components/HomeCategory.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory
  }
}
</script>

<style lang="less" scoped>

</style>
