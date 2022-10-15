<template>
    <div class="sub-filter" v-if="filterData">
     <div class="item">
       <div class="head">品牌：</div>
       <div class="body">
         <a href="javascript:;"  v-for="item in filterData.brands" :key="item.id" :class="{active: filterData.selectedBrand === item.id }" @click="brandChanged(item.id)" >{{item.name}}</a>
       </div>
     </div>
     <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
       <div class="head">{{item.name}}:</div>
       <div class="body">
         <a href="javascript:;" v-for="prop in item.properties" :key="prop.id" :class="{active: item.selectedProp === prop.id }" @click="propChanged(item,prop.id)" >{{prop.name}}</a>
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
  setup (props, { emit }) {
    const route = useRoute()

    const filterData = ref(null)

    // 获取筛选区的请求参数
    const getFilterData = () => {
      /* 处理过的参数形式为
            {
              // 当前选中品牌的id
              brandId,
              记录商品下的属性分类
              例如：商品为衣服，其属性分类有颜色、材质等，颜色分为红色、白色、黑色...
              上述的颜色、材质就属于groupName；颜色下的红、白、黑即为propertyName
              attrs:[{
                // 属性分类名
                groupName,
                // 属性分类名下的具体类名
                propertyName
              },{},...]
            }
        */
      const result = { brandId: null, attrs: [] }

      // 将当前选中的品牌id赋值给请求参数体result
      result.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
          // 通过当前被选中的商品属性id找到对应的商品属性名称
          const prop = item.properties.find(prop => prop.id === item.selectedProp)
          result.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (result.attrs.length === 0) {
        result.attrs = null
      }
      return result
    }

    // 记录当前选择品牌
    const brandChanged = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filterChanged', getFilterData())
    }
    // 记录当前选择商品属性
    const propChanged = (item, propId) => {
      if (item.selectedProp === propId) return
      item.selectedProp = propId
      emit('filterChanged', getFilterData())
    }

    // 监听路由地址id值变化时，发送筛选区数据请求
    watch(() => route.params.id, (newVal) => {
      // 当路由地址的id为二级分类的路径下的id变化时进行数据请求
      if (newVal && route.path === `/category/sub/${newVal}`) {
        findSubCategoryFilter(route.params.id).then(data => {
          // selectedBrand用于记录当前选中的品牌id selectedProp用于记录当前选中的商品属性id
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

    return { filterData, brandChanged, propChanged }
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
