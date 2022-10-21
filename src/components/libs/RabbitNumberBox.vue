<template>
  <div class="rabbitNumberBox">
    <div class="label" v-if="label">{{label}}</div>
    <div class="numberBox">
      <a href="javascript:;" @click="numChanged(-1)" >-</a>
      <input type="text" readonly :value="count">
      <a href="javascript:;" @click="numChanged(1)" >+</a>
    </div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'RabbitNumberBox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number
    }
  },
  setup (props, { emit }) {
    const count = useVModel(props, 'modelValue', emit)
    const numChanged = (step) => {
      const tempCount = count.value + step
      if (tempCount < props.min || tempCount > props.max) return
      count.value = tempCount
      emit('numChanged', tempCount)
    }

    return { numChanged, count }
  }
}
</script>

<style lang="less" scoped>
.rabbitNumberBox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numberBox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
