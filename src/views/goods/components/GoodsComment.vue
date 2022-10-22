<template>
  <div class="goodsComment">
    <div class="head" v-if="commentList">
      <div class="data">
        <p>
          <span>{{ commentList.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentList.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(tag, index) in commentList.tags"
            :key="index"
            href="javascript:;"
            :class="{ active: currentIndex === index }"
            @click="currentIndex = index"
            >{{ tag.title }}（{{ tag.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" class="active">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
    <div class="list"></div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { findGoodsComment } from '@/api/goods'
export default {
  name: 'GoodsComment',
  setup () {
    const route = useRoute()
    const currentIndex = ref(0)
    const commentList = ref(null)
    findGoodsComment(route.params.id).then((data) => {
      // 往tags中追加两个两个对象，名称为全部评价和有图
      data.result.tags.unshift({
        tagCount: data.result.hasPictureCount,
        title: '有图'
      })
      data.result.tags.unshift({
        tagCount: data.result.evaluateCount,
        title: '全部评价'
      })
      commentList.value = data.result
    })

    return { currentIndex, commentList }
  }
}
</script>

<style lang="less" scoped>
.goodsComment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
