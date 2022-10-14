<template>
  <div class="subCategory">
    <div class="container">
      <!-- 面包屑导航 -->
      <sub-bread></sub-bread>
      <!-- 筛选区 -->
      <sub-filter></sub-filter>
      <!-- 复选框测试 -->
      <rabbit-checked-box v-model="check">all</rabbit-checked-box>{{check}}
      <!-- 结果区 -->
    </div>
  </div>
</template>

<script>
import SubBread from './components/SubBread.vue'
import SubFilter from './components/SubFilter.vue'
import { ref } from 'vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  },
  setup () {
    const check = ref(false)

    return { check }
  }
}
</script>

<style></style>
