<template>
<div class="goodsCommentImg">
     <div class="list" v-if="imgs">
      <a
        @click="currentImg=url"
        :class="{active:currentImg===url}"
        v-for="url in imgs" :key="url"
        href="javascript:;"
      >
        <img :src="url" alt="">
      </a>
    </div>
    <div class="preview" v-if="currentImg">
        <img :src="currentImg" alt="">
        <i @click="currentImg=null" class="iconfont icon-close-new"></i>
    </div>
</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsCommentImg',
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currentImg = ref(null)

    return { currentImg }
  }
}
</script>

<style lang="less" scoped>
.goodsCommentImg{
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border:1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
    .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      background: rgba(0,0,0,0.2);
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
