<template>
  <div class="topCategory">
    <div class="container">
      <!-- 面包屑导航 -->
      <RabbitBread>
        <rabbit-bread-item to="/">首页</rabbit-bread-item>
        <rabbit-bread-item>{{ topCategory.name }}</rabbit-bread-item>
      </RabbitBread>
      <!-- 轮播图 -->
      <rabbit-carousel
        autoPlay
        :list="bannerList"
        style="height: 500px"
      ></rabbit-carousel>
      <!-- 一级分类下的二级分类 -->
      <div class="subList">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 二级分类下的具体商品 -->
      <div class="ref-goods">
        <div class="head">
          <h3>- 海鲜 -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <RabbitMore class="rabbit-more"></RabbitMore>
        </div>
        <div class="body">
          <CategoryGoodsItem v-for="i in 5" :key="i"></CategoryGoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findBanner } from '@/api/home'
import CategoryGoodsItem from './components/CategoryGoodsItem'
export default {
  name: 'TopCatagory',
  components: { CategoryGoodsItem },
  setup () {
    // 获取轮播图数据
    const bannerList = ref([])
    findBanner().then((data) => {
      bannerList.value = data.result
    })

    // 获取全部分类
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
      return item
    })

    return { bannerList, topCategory }
  }
}
</script>

<style lang="less" scoped>
.topCategory {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .subList {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .rabbit-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
