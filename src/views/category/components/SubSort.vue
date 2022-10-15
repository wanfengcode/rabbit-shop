<template>
  <div class='sub-sort'>
    <div class="sort">
      <a href="javascript:;" :class="{active:sortCondition.sortFiled === null}" @click="changeCondition(null)" >默认排序</a>
      <a href="javascript:;" :class="{active:sortCondition.sortFiled === 'publishTime'}" @click="changeCondition('publishTime')" >最新商品</a>
      <a href="javascript:;" :class="{active:sortCondition.sortFiled === 'orderNum'}" @click="changeCondition('orderNum')" >最高人气</a>
      <a href="javascript:;" :class="{active:sortCondition.sortFiled === 'evaluateNum'}" @click="changeCondition('evaluateNum')" >评论最多</a>
      <a href="javascript:;" @click="changeCondition('price')" >
        价格排序
        <i :class="{active: sortCondition.sortMethod === 'asc'}" class="arrow up" />
        <i :class="{active: sortCondition.sortMethod === 'desc'}" class="arrow down" />
      </a>
    </div>
    <div class="check">
      <RabbitCheckedBox v-model="sortCondition.invertory" >仅显示有货商品</RabbitCheckedBox>
      <RabbitCheckedBox v-model="sortCondition.onlyDiscount" >仅显示特惠商品</RabbitCheckedBox>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  components: { },
  name: 'SubSort',
  setup () {
    const sortCondition = reactive({
      // 是否有库存
      inventory: false,
      //   是否有优惠
      onlyDiscount: false,
      //   排序条件/字段
      sortFiled: null,
      //   排序方法
      sortMethod: null
    })

    const changeCondition = (type) => {
      if (type === 'price') {
        sortCondition.sortFiled = type
        if (sortCondition.sortMethod === null) {
          sortCondition.sortMethod = 'desc'
        } else {
          sortCondition.sortMethod = sortCondition.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        if (sortCondition.sortFiled === type) {
          return
        }
        sortCondition.sortFiled = type
        sortCondition.sortMethod = null
      }
    }

    return { sortCondition, changeCondition }
  }
}
</script>

<style lang="less" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .rabbitCheckedBox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
