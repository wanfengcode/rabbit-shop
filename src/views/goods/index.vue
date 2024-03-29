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
          <!-- 商品信息 -->
          <GoodsInfo :goods="goods" ></GoodsInfo>
          <!-- 商品规格参数 -->
          <GoodsSku :goods="goods" @skuChanged="skuChanged"></GoodsSku>
          <!-- 数量选择 -->
          <RabbitNumberBox v-model="defaultCount" :max="goods.inventory" label="数量"></RabbitNumberBox>
          <!-- 加入购物车按钮 -->
          <RabbitBtn @click="addCart" style="margin-top:20px;margin-left:60px">加入购物车</RabbitBtn>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods" :goodsId = "goods.id"></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs></GoodsTabs>
          <!-- 注意事项 -->
          <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHotList :type="1"></GoodsHotList>
          <GoodsHotList :type="2"></GoodsHotList>
        </div>
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
import GoodsTabs from './components/GoodsTabs.vue'
import GoodsHotList from './components/GoodsHotList.vue'
import GoodsWarn from './components/GoodsWarn.vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
import { watch, ref, nextTick, provide } from 'vue'
import { useStore } from 'vuex'
import Message from '@/components/libs/Message'
export default {
  name: 'GoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsInfo,
    GoodsSku,
    GoodsTabs,
    GoodsHotList,
    GoodsWarn
  },
  setup () {
    const store = useStore()

    // 获取商品详情数据
    const goods = getGoods()
    const currentSku = ref(null)
    // GoodsSku组件的触发事件skuChanged
    const skuChanged = (skuInfo) => {
      if (skuInfo.skuId) {
        goods.value.price = skuInfo.price
        goods.value.oldPrice = skuInfo.oldPrice
        goods.value.inventory = skuInfo.inventory
      }
      currentSku.value = skuInfo
    }

    // 提供数据给后代组件使用
    provide('goods', goods)

    // RabbitNumberBox 组件
    const defaultCount = ref(1)

    // 添加购物车
    const addCart = () => {
    // 约定本地存储购物车相关信息：
    /*
      skuId name  attrsText(商品属性)
      picture price(加入时价格) nowPrice(当前价格)
      selected stock count
      isEffective(是否为有效商品) id(spuId)
    */
      if (currentSku.value && currentSku.value.skuId) {
        const { skuId, price, inventory: stock, specsText: attrsText } = currentSku.value
        const { name, mainPictures, id } = goods.value
        store.dispatch('cart/setCart', {
          id,
          skuId,
          name,
          attrsText,
          picture: mainPictures[0],
          price,
          nowPrice: price,
          selected: true,
          stock,
          count: defaultCount.value,
          isEffective: true
        }).then(() => {
          Message({ type: 'success', text: '成功加入购物车' })
        })
      } else {
        Message({ type: 'warn', text: '请选择完整的商品规格' })
      }
    }

    return { goods, skuChanged, defaultCount, addCart }
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
