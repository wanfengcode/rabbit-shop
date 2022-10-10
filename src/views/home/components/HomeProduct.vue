<template>
  <div class="homeProduct" ref="target" >
    <HomePanel :title="item.name" v-for="item in productList" :key="item.id">
        <!-- 产品区域的右上角,也就是面板的具名插槽right -->
      <template #right>
        <div class="sub">
          <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in item.children" :key="sub.id"  >{{sub.name}}</RouterLink>
        </div>
        <RabbitMore :path="`/category/${item.id}`"></RabbitMore>
      </template>
      <!-- 产品区域的主体,也就是面板的默认插槽 -->
      <div class="box">
         <RouterLink class="cover" :to="`/category/${item.id}`">
          <img :src="item.picture" alt="">
          <strong class="label">
            <span>{{item.name}}馆</span>
            <span>{{item.saleInfo}}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
            <li v-for="goods in item.goods" :key="goods.id" >
                <HomeGoods :goods="goods" ></HomeGoods>
            </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './HomePanel.vue'
import HomeGoods from './HomeGoods.vue'
import { useLazyData } from '@/hooks'
import { ref } from 'vue'
import { findProduct } from '@/api/home'
export default {
  name: 'HomeProduct',
  components: {
    HomePanel,
    HomeGoods
  },
  setup () {
    const target = ref(null)
    const productList = useLazyData(target, findProduct)

    return { target, productList }
  }
}
</script>

<style lang="less" scoped>
.homeProduct {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}</style>
