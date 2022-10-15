<template>
  <div class="subCategory">
    <div class="container">
      <!-- 面包屑导航 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter @filterChanged="filterChanged"></SubFilter>
      <!-- 结果区 商品类型排序 + 商品列表 -->
      <div class="goodsList">
        <!-- 商品类型排序 -->
        <SubSort @typeChanged = "typeChanged"></SubSort>
        <!-- 商品列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods"></GoodsItem>
          </li>
        </ul>
        <!-- 该组件进入页面的可视区域时，触发loadingData事件，执行getData函数向后台发送数据请求 -->
        <RabbitInfiniteLoad :loading="loading" :finished="finished" @loadingData="getData" ></RabbitInfiniteLoad>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import SubBread from './components/SubBread.vue'
import SubFilter from './components/SubFilter.vue'
import SubSort from './components/SubSort.vue'
import GoodsItem from './components/GoodsItem.vue'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()

    const loading = ref(false)
    const finished = ref(false)

    /* 商品列表数据请求，展示无限加载效果和数据加载完毕提示 */
    // reqParams为请求参数体，
    let reqParams = reactive({
      page: 1,
      pageSize: 20
    })
    // 用于接收响应的数据集
    const goodsList = ref([])
    const getData = () => {
      loading.value = true
      // 添加catagoryId，用于后台判断返回属于哪个分类下的商品
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(data => {
        // 根据每次请求返回的数据长度判断数据是否加载完毕
        if (data.result.items.length) {
          // 这里若直接将items赋值给goodsList，则永远只显示二十条数据，因此选择往goodsList追加数据
          goodsList.value.push(...data.result.items)
          reqParams.page++
        } else {
          // 当数据加载完毕，将finished值改为true；此时展示数据加载完毕提示
          finished.value = true
        }
        loading.value = false
      })
    }
    // 监听地址栏id变化，重新请求商品列表数据
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        // 将goodsList设为空数组，即此时商品列表没有数据显示无限加载组件进入可视区域触发loadingData事件，重新发送数据请求
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    })

    // 排序类型发生变化时，重新发送商品列表数据请求
    const typeChanged = (sortCondition) => {
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortCondition }
      reqParams.page = 1
      goodsList.value = []
    }
    // 筛选区商品属性发生变化时，重新发送商品列表数据请求
    const filterChanged = (filterCondition) => {
      finished.value = false
      reqParams = { ...reqParams, ...filterCondition }
      reqParams.page = 1
      goodsList.value = []
    }

    return { loading, finished, getData, goodsList, typeChanged, filterChanged }
  }
}
</script>

<style lang="less" scoped>
.goodsList {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
