<template>
  <div class="emptyCart">
    <img src="@/assets/images/none.png" alt="" />
    <p>购物车内暂时没有商品</p>
    <div class="btn">
      <RabbitBtn type="primary" @click="$router.push('/')">继续逛逛</RabbitBtn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyCart'
}
</script>

<style lang="less" scoped>
.emptyCart{
  text-align: center;
  padding: 150px 0;
  background: #fff;
  img {
    width: 180px;
  }
  p {
    color: #999999;
    padding: 20px 0;
  }
}
</style>
