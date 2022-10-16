<template>
<div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><RabbitMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list" ref="target" >
        <li v-for="item in goodsList" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './HomePanel.vue'
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: {
    HomePanel
  },
  setup () {
    // const goodsList = ref([])
    // findNew().then(data => {
    //   goodsList.value = data.result
    // })
    const target = ref(null)
    const goodsList = useLazyData(target, findNew)

    return { goodsList, target }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
