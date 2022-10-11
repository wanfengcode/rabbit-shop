<template>
    <div class="rabbitBread-item">
      <RouterLink  v-if="to" :to="to"><slot></slot></RouterLink>
      <span v-else><slot></slot></span>
    </div>
    <!-- <i class="iconfont icon-angle-right"></i> -->
</template>

<script>
export default {
  name: 'RabbitBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
