<template>
<!-- 商品推荐组件: 头部+轮播图展示 -->
  <div class="goodsRelevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 改造后的轮播图组件 -->
    <RabbitCarousel :list="relevantList" ></RabbitCarousel>
  </div>
</template>

<script>
import { findRelevantGoods } from '@/api/goods'
import { ref } from 'vue'
export default {
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const relevantList = ref([])
    findRelevantGoods({ id: props.goodsId }).then(data => {
      // 返回的数据result为数组,存储的数据类型为对象;但需要传入的数据集格式为[[{},{},...],[],[],[]],因此需要做进一步数据处理
      // pageSize记录每页展示几个商品,totalPages记录一共展示几页
      const pageSize = 4
      const totalPages = data.result.length / pageSize
      // 根据总页数totalPages的长度决定循环次数,每次都将result中的数据以4条一组截取出来,存到数组中;遍历完成后得到想要的数据格式
      for (let i = 0; i < totalPages; i++) {
        const arr = data.result.slice(pageSize * i, pageSize * (i + 1))
        relevantList.value.push(arr)
      }
    })

    return { relevantList }
  }
}
</script>

<style lang="less" scoped>
.goodsRelevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
    .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  // 覆盖轮播图插件的样式
  :deep(.rabbitCarousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
}
</style>
