<template>
<!-- 无限加载组件 -->
      <div class="rabbitInfiniteLoad" ref="target" >
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export default {
  name: 'RabbitInfiniteLoad',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const target = ref(null)

    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        console.log('进入可视区')
        /*
            进入可视区后触发数据加载事件，触发条件：
                 loading值是否为true即数据请求是否正在加载，finished值是否为true即响应的数据是否加载完毕
        */
        if (!props.loading && !props.finished) {
          emit('loadingData')
        }
      }
    }, { threshold: 0 })

    return { target }
  }
}
</script>

<style lang="less" scoped>
.rabbitInfiniteLoad {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
