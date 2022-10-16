<template>
    <div class="goodsImage">
        <div class="middle">
            <img :src="images[currentIndex]" alt="">
        </div>
        <div class="small">
            <ul>
                <li v-for="(item,index) in images" :key="index" :class="{active: currentIndex === index}">
                    <img  @mouseenter="currentIndex = index" :src="item" alt="" >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      typeof: Array,
      default: () => []
    }
  },
  setup () {
    const currentIndex = ref(0)

    return { currentIndex }
  }
}
</script>

<style lang="less" scoped>
.goodsImage {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
