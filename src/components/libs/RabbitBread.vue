<template>
  <div class='rabbitBread'>
    <div class="rabbitBread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>

    <!-- 一级类目 -->
    <div class="rabbitBread-item" v-if="topCategory" >
      <RouterLink v-if="topCategoryPath" :to="topCategoryPath">{{topCategory}}</RouterLink>
      <span v-else>{{topCategory}}</span>
    </div>
    <i class="iconfont icon-angle-right" v-if="topCategory" ></i>

    <!-- 二级类目或更多层,通过提供插槽位置由父组件自行决定 -->
    <div class="rabbitBread-item">
      <span><slot></slot></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RabbitBread',
  props: {
    // 用于接收父组件传递的一级类目名称
    topCategory: {
      type: String,
      default: ''
    },
    // 用于接收父组件传递的一级类目地址
    topCategoryPath: {
      type: [String, Object],
      default: '/'
    }
  }
}
</script>

<style lang="less" scoped>
.rabbitBread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
