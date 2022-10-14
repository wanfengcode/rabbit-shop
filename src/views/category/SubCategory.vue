<template>
  <div class="subCategory">
    <div class="container">
      <!-- 面包屑导航 -->
      <sub-bread></sub-bread>
      <!-- 筛选区 -->
      <sub-filter></sub-filter>
      <!-- 结果区 商品排序 + 商品列表 -->
      <SubSort></SubSort>
    </div>
  </div>
</template>

<script>
import SubBread from './components/SubBread.vue'
import SubFilter from './components/SubFilter.vue'
import SubSort from './components/SubSort.vue'
import { ref } from 'vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort
  },
  setup () {
    const check = ref(false)

    return { check }
  }
}
</script>

<style></style>
