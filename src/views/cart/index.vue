<template>
  <div class="cartPage">
    <div class="container">
      <RabbitBread>
        <RabbitBreadItem to="/">首页</RabbitBreadItem>
        <RabbitBreadItem>购物车</RabbitBreadItem>
      </RabbitBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><RabbitCheckedBox @change="isSelectedAll" :modelValue="$store.getters['cart/isSelectedAll']" >全选</RabbitCheckedBox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="$store.getters['cart/validList'].length === 0">
                <td colspan="6">
                    <EmptyCart></EmptyCart>
                </td>
            </tr>
            <tr v-for="goods in $store.getters['cart/validList']" :key="goods.skuId">
              <td><RabbitCheckedBox @change="($event)=> btnChanged(goods.skuId,$event)" :modelValue="goods.selected"></RabbitCheckedBox></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"><img :src="goods.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{goods.name}}</p>
                    <!-- 选择规格组件 -->
                    <CartGoodsSku @skuChanged="$event=>updateCartGoodsSku(goods.skuId,$event)" :attrsText='goods.attrsText' :skuId='goods.skuId'></CartGoodsSku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{goods.nowPrice}}</p>
                <p v-if="goods.price - goods.nowPrice > 0">比加入时降价 <span class="red">&yen;{{goods.price - goods.nowPrice}}</span></p>
              </td>
              <td class="tc">
                <RabbitNumberBox @numChanged="($event) => goodsCountChanged(goods.skuId,$event)" :max="goods.stock" :modelValue="goods.count"></RabbitNumberBox>
              </td>
              <td class="tc"><p class="f16 red">&yen;{{goods.nowPrice * goods.count}}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" @click="deleteCartGoods(goods.skuId)" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/inValidList'].length > 0">
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="item in $store.getters['cart/inValidList']" :key="item.skuId">
              <td><RabbitCheckedBox style="color:#eee;"></RabbitCheckedBox></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"><img :src="item.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <p class="attr">{{item.attrsText}}</p>
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;{{item.nowPrice}}</p></td>
              <td class="tc">1</td>
              <td class="tc"><p>&yen;{{item.nowPrice * item.count}}</p></td>
              <td class="tc">
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <RabbitCheckedBox @change="isSelectedAll" :modelValue="$store.getters['cart/isSelectedAll']" >全选</RabbitCheckedBox>
          <a @click="batchDeleteCartGoods()" href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a @click="batchDeleteCartGoods(true)" href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validCount']}} 件商品，已选择 {{$store.getters['cart/selectedCount']}} 件，商品合计：
          <span class="red">¥{{$store.getters['cart/selectedAmount']}}</span>
          <RabbitBtn type="primary">下单结算</RabbitBtn>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodsRelevant></GoodsRelevant>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from '@/views/goods/components/GoodsRelevant.vue'
import EmptyCart from './components/EmptyCart.vue'
import CartGoodsSku from './components/CartGoodsSku.vue'
import { useStore } from 'vuex'
import Confirm from '@/components/libs/Confirm'
import Message from '@/components/libs/Message'
export default {
  name: 'Cart',
  components: {
    GoodsRelevant,
    EmptyCart,
    CartGoodsSku
  },
  setup () {
    const store = useStore()
    // 单选框触发事件
    const btnChanged = (skuId, selected) => {
      store.dispatch('cart/updateCart', { skuId, selected })
    }
    // 购物车有效商品列表的全选框触发事件
    const isSelectedAll = (selected) => {
      store.dispatch('cart/isSelectedAll', selected)
    }
    // 删除单个商品
    const deleteCartGoods = (skuId) => {
      Confirm({ text: '确认删除该商品吗?' }).then(() => {
        store.dispatch('cart/deleteCartGoods', skuId).then(() => {
          Message({ text: '删除成功' })
        })
      }).catch(e => {
      })
    }
    // 批量删除购物车已选商品或失效商品,传入一个布尔值为真的变量或值时则删除的是失效商品
    const batchDeleteCartGoods = (invalid) => {
      Confirm({ text: `确认删除${invalid ? '失效' : '选中'}商品` }).then(() => {
        store.dispatch('cart/batchDeleteCartGoods', invalid)
      }).catch(e => {

      })
    }
    // 商品数量变化触发事件
    const goodsCountChanged = (skuId, count) => {
      store.dispatch('cart/updateCart', { skuId, count })
    }

    // 更新购物车商品的sku信息
    const updateCartGoodsSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartGoods', { oldSkuId, newSku })
    }

    return { btnChanged, isSelectedAll, deleteCartGoods, batchDeleteCartGoods, goodsCountChanged, updateCartGoodsSku }
  }
}
</script>

<style lang="less" scoped>
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cartPage {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
