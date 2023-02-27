<template>
 <div class="cartGoodsSku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-show="visible">
      <GoodsSku @skuChanged="skuChanged" v-if="goods" :goods="goods" :skuId="skuId"></GoodsSku>
      <rabbit-btn v-if="goods" type="primary"  size="mini" style="margin-left : 300px" @click="submit" >确认</rabbit-btn>
      <div v-else class="loading"></div>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import { getSpecsAndSkus } from '@/api/cart'
import { ref } from 'vue'
import GoodsSku from '@/views/goods/components/GoodsSku.vue'
export default {
  name: 'CartGoodsSku',
  components: {
    GoodsSku
  },
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)
    const target = ref(null)
    const goods = ref(null)

    const getSkus = () => {
      getSpecsAndSkus(props.skuId).then(data => {
        goods.value = data.result
      })
    }

    const open = () => {
      visible.value = true
      // 向后台发送商品规格数据请求
      getSkus()
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

    // 记录商品sku的变化
    const currentSku = ref(null)
    const skuChanged = (sku) => {
      currentSku.value = sku
    }

    // 提交修改后的商品sku
    const submit = () => {
      // 变化后的sku存在且不与当前的skuid相同则视作一次有效的改变,向购物车组件提交修改后的sku信息
      if (currentSku.value && currentSku.value.skuId && currentSku.value.skuId !== props.skuId) {
        emit('skuChanged', currentSku.value)
        close()
      }
    }

    return { visible, toggle, target, goods, submit, skuChanged }
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
