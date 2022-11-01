<template>
   <!-- 一级路由 -->
  <router-view></router-view>
  <RabbitMessage type="success" text="成功"></RabbitMessage>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
