<template>
  <div class="goodsImage">
    <div
      v-show="show"
      class="large"
      :style="[
        { backgroundImage: `url(${images[currentIndex]})` },
        largePosition,
      ]"
    ></div>
    <div class="middle" ref="target">
      <img :src="images[currentIndex]" alt="" />
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <div class="small">
      <ul>
        <li
          v-for="(item, index) in images"
          :key="index"
          :class="{ active: currentIndex === index }"
        >
          <img @mouseenter="currentIndex = index" :src="item" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
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

    // 控制大图和遮罩层显示
    const show = ref(false)
    // 绑定目标元素
    const target = ref(null)
    // 遮罩层和大图背景位置
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })

    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // 监听elementX, elementY, isOutside这三个变量的数据变化，获取遮罩层和大图背景图位置
    watch([elementX, elementY, isOutside], () => {
      show.value = !isOutside.value
      // 记录位置偏移量
      const position = { x: 0, y: 0 }
      if (elementX.value < 100) {
        position.x = 0
      } else if (elementX.value > 300) {
        position.x = 200
      } else {
        position.x = elementX.value - 100
      }

      if (elementY.value < 100) {
        position.y = 0
      } else if (elementY.value > 300) {
        position.y = 200
      } else {
        position.y = elementY.value - 100
      }

      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'

      largePosition.backgroundPositionX = -2 * position.x + 'px'
      largePosition.backgroundPositionY = -2 * position.y + 'px'
    })

    return { currentIndex, show, target, layerPosition, largePosition }
  }
}
</script>

<style lang="less" scoped>
.goodsImage {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 100;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 将原图放大至原来的两倍，后续通过background-position来移动图片放大的位置
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      position: absolute;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
