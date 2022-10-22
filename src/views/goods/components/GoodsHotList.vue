<template>
  <div class="goodsHotList">
    <h3>{{title}}</h3>
     <div>
        <GoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods"></GoodsItem>
     </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import GoodsItem from '@/views/category/components/GoodsItem.vue'
import { findHotGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsHotList',
  components: {
    GoodsItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const titleList = {
      1: '24小时热榜',
      2: '周热销榜',
      3: '总热销榜'
    }

    const title = computed(() => {
      return titleList[props.type]
    })

    const goodsList = ref([])
    const route = useRoute()

    findHotGoods({ id: route.params.id, type: props.type }).then(data => {
      goodsList.value = data.result
      console.log(goodsList)
    })

    return { title, goodsList }
  }
}
</script>

<style lang="less" scoped>
.goodsHotList {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goodsItem) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
