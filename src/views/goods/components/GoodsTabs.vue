<template>
  <div class="goodsTabs">
    <nav>
      <a
        @click="activeName = 'goodsDetail'"
        :class="{ active: activeName === 'goodsDetail' }"
        href="javascript:;"
        >商品详情</a
      >
      <a
        @click="activeName = 'goodsComment'"
        :class="{ active: activeName === 'goodsComment' }"
        href="javascript:;"
        >商品评价<span>{{goods.commentCount}}</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <!-- 借助Vue内置插件<component></component>的is属性,实现动态组件切换 -->
    <component :is="activeName"></component>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import GoodsDetail from './GoodsDetail.vue'
import GoodsComment from './GoodsComment.vue'
export default {
  name: 'GoodsTabs',
  components: {
    GoodsDetail,
    GoodsComment
  },
  setup () {
    // activeName的值为goodsDetail时显示商品详情内容,goodsComment时显示商品评价
    const activeName = ref('goodsDetail')
    const goods = inject('goods')

    return { activeName, goods }
  }
}
</script>

<style lang="less" scoped>
.goodsTabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
