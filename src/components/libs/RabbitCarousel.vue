<template>
  <div class='rabbitCarousel' @mouseenter="pause()" @mouseleave="start()" >
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,i) in list" :key="i" :class="{ fade: index === i }" >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev"  @click="togo(-1)" ><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next"  @click="togo(1)" ><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span v-for="(item,i) in list" :key="i" :class="{ active: index === i }" @click="index=i" ></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: 'RabbitCarousel',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    // autoplay决定是否开启自动播放轮播图
    autoPlay: {
      type: Boolean,
      default: false
    },
    // duration定义播放时间间隔
    duration: {
      type: Number,
      default: 2000
    }
  },
  setup (props) {
    const index = ref(0)

    // 点击切换轮播图
    const togo = (step) => {
      const newIndex = index.value + step
      if (newIndex > props.list.length - 1) {
        index.value = 0
        return
      }
      if (newIndex < 0) {
        index.value = props.list.length - 1
        return
      }
      index.value = newIndex
    }

    // 自动播放轮播图
    let timer = null
    const autoplayFn = () => {
      // 每次调用前先清除之前的定时器
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value > props.list.length - 1) {
          index.value = 0
        }
      }, props.duration)
    }
    // 通过监听list数据是否存在且autoplay值来判断是否开启自动播放
    watch(() => props.list, (newVal) => {
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoplayFn()
      }
    }, { immediate: true })
    // 鼠标进入时暂停，离开时开启
    const pause = () => {
      if (timer) {
        clearInterval(timer)
      }
    }
    const start = () => {
      if (props.list.length && props.autoPlay) {
        autoplayFn()
      }
    }
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index, togo, pause, start }
  }
}
</script>

<style lang="less" scoped>
.rabbitCarousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
