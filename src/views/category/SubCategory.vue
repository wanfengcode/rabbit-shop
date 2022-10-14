<template>
  <div class="subCategory">
    <div class="container">
      <!-- 面包屑导航 -->
      <sub-bread></sub-bread>
      <!-- 筛选区 -->
      <sub-filter></sub-filter>
      <!-- 结果区 -->
    </div>
  </div>
</template>

<script>
import SubBread from './components/SubBread.vue'
import SubFilter from './components/SubFilter.vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  }
}
</script>

<style></style>
