<template>
 <div class="cartGoodsSku">
    <div class="attrs" ref="target" @click="toggle">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-show="visible">
      <div class="loading"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'CartGoodsSku',
  props: {
    attrsText: {
      type: String,
      default: ''
    }
  },
  setup () {
    const visible = ref(false)
    const target = ref(null)

    const open = () => {
      visible.value = true
    }
    const close = () => {
      visible.value = false
    }
    // 切换sku弹层显示/隐藏状态
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 监听鼠标处于弹层外时，关闭sku弹层
    onClickOutside(target, () => {
      close()
    })

    return { visible, toggle, target }
  }
}
</script>

<style lang="less" scoped>
.cartGoodsSku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
