<template>
  <div class="goodsPage" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <RabbitBread>
        <RabbitBreadItem to="/">首页</RabbitBreadItem>
        <RabbitBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</RabbitBreadItem>
        <RabbitBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</RabbitBreadItem>
        <RabbitBreadItem>{{ goods.name }}</RabbitBreadItem>
      </RabbitBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片预览区 -->
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <!-- 商品详情展示 -->
        <div class="spec">
          <GoodsInfo :goods="goods" ></GoodsInfo>
          <GoodsSku :goods="goods"></GoodsSku>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods"></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/GoodsRelevant.vue'
import GoodsImage from './components/GoodsImage.vue'
import GoodsSales from './components/GoodsSales.vue'
import GoodsInfo from './components/GoodsInfo.vue'
import GoodsSku from './components/GoodsSku.vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
import { watch, ref, nextTick } from 'vue'
export default {
  name: 'GoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsInfo,
    GoodsSku
  },
  setup () {
    // 获取商品详情数据
    const goods = getGoods()
    // console.log(goods)
    return { goods }
  }
}

// 获取商品详情
const getGoods = () => {
  const route = useRoute()
  const goods = ref(null)

  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          /* 让商品的数据为null值，目的在于让v-if判断goods存在与否才渲染的组件能够销毁和重新创建
            nextTick()方法将goods的赋值操作放在了任务队列中，当同步任务执行完毕后执行任务队列中的异步任务
            从而实现先将goods值赋予null也就是没有数据，后将返回的请求结果赋值给goods
        */
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    },
    { immediate: true }
  )

  return goods
}
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
