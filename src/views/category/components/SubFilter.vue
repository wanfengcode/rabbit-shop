<template>
    <div class="sub-filter" v-if="filterData">
     <div class="item">
       <div class="head">品牌：</div>
       <div class="body">
         <a href="javascript:;" v-for="item in filterData.brands" :key="item.id" :class="{active: filterData.selectedBrand === item.id }" @click="filterData.selectedBrand = item.id" >{{item.name}}</a>
       </div>
     </div>
     <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
       <div class="head">{{item.name}}:</div>
       <div class="body">
         <a href="javascript:;" v-for="prop in item.properties" :key="prop.id" :class="{active: item.selectedProp === prop.id }" @click="item.selectedProp=prop.id" >{{prop.name}}</a>
       </div>
     </div>
   </div>
</template>

<script>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()

    const filterData = ref(null)

    // 监听路由地址id值变化时，发送筛选区数据请求
    watch(() => route.params.id, (newVal) => {
      // 当路由地址的id为二级分类的路径下的id变化时进行数据请求
      if (newVal && route.path === `/category/sub/${newVal}`) {
        findSubCategoryFilter(route.params.id).then(data => {
          // selectedBrand用于记录当前选中的品牌 selectedProp用于记录当前选中的商品属性
          data.result.selectedBrand = null
          data.result.brands.unshift({ id: null, name: '全部' })
          data.result.saleProperties.forEach(item => {
            item.selectedProp = null
            item.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = data.result
        })
      }
    }, { immediate: true })

    return { filterData }
  }
}
</script>

<style lang="less" scoped>
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
