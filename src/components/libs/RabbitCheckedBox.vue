<template>
  <div class="rabbitCheckedBox" @click="changeCheck()">
    <i class="iconfont icon-checked" v-if="check"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <!-- $slots.default 用于判断外层组件使用时是否定义默认插槽结构样式 -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'RabbitCheckedBox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const check = ref(false)

    /*
        vue3中v-model指令在组件上生效时，可将该指令分为两个部分，getter setter分别为取值和改值
        对应的指令为 :modelValue="attr" @update:modelValue = 'handle()'\
        当在父子组件传递数据时使用,update:modelValue将作为子组件向父组件提交数据改变的事件触发名
    */
    const changeCheck = () => {
      // 改变父组件传递数据
      check.value = !check.value
      // 通知父组件数据改变
      emit('update:modelValue', check.value)
    }

    // 通过watch监听props属性中的modelValue字段，将其值赋值给check
    watch(() => props.modelValue, () => {
      check.value = props.modelValue
    }, { immediate: true })

    return { check, changeCheck }
  }
}
</script>

<style lang="less" scoped>
.rabbitCheckedBox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
