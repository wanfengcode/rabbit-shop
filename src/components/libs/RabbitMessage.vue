<template>
<Transition name = 'down'>
    <div class="rabbitMessage" :style="style[type]" v-show="visible">
    <!-- 上面绑定的是样式 -->
    <!-- 不同提示图标会变 -->
    <i class="iconfont" :class="[style[type].icon]"></i>
    <span class="text">{{text}}</span>
  </div>
</Transition>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'RabbitMessage',
  props: {
    type: {
      type: String,
      default: 'success'
    },
    text: {
      type: String,
      default: ''
    }
  },
  setup () {
    const style = {
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      }
    }
    // 控制显示隐藏
    const visible = ref(false)

    onMounted(() => {
      // 默认隐藏，组件初始化完毕显示，配合transition组件试下动画效果
      visible.value = true
    })

    return { style, visible }
  }
}
</script>

<style lang="less" scoped>
.rabbitMessage {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
.down {
  &-enter {
    &-from {
      transform: translate3d(0,-75px,0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
