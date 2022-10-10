<template>
  <div class="home-popular">
    <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
      <template #right><RabbitMore></RabbitMore></template>
      <ul class="goods-list" ref="target" >
        <li v-for="item in goodsList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './HomePanel.vue'
import { findPopular } from '@/api/home'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomePopular',
  components: {
    HomePanel
  },
  setup () {
    const target = ref(null)
    const goodsList = useLazyData(target, findPopular)

    return { goodsList, target }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
