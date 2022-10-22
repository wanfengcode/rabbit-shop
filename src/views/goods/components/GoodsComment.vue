<template>
  <div class="goodsComment">
    <div class="head" v-if="commentInfos">
      <div class="data">
        <p>
          <span>{{ commentInfos.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfos.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(tag, index) in commentInfos.tags"
            :key="index"
            href="javascript:;"
            :class="{ active: currentIndex === index }"
            @click="tagChanged(index)"
            >{{ tag.title }}（{{ tag.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a @click="sortFieldChanged(null)" :class="{active:reqParams.sortField === null}" href="javascript:;">默认</a>
      <a @click="sortFieldChanged('createTime')" :class="{active:reqParams.sortField === 'createTime'}" href="javascript:;">最新</a>
      <a @click="sortFieldChanged('praisePercent')" :class="{active:reqParams.sortField === 'praisePercent'}" href="javascript:;">最热</a>
    </div>
    <!-- 评价列表 -->
    <div class="list">
      <div class="item">
        <div class="user">
          <img
            src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png"
            alt=""
          />
          <span>兔****m</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx02"></i>
            <span class="attr">颜色：黑色 尺码：M</span>
          </div>
          <div class="text">
            网易云app上这款耳机非常不错 新人下载网易云购买这款耳机优惠大
            而且耳机🎧确实正品 音质特别好 戴上这款耳机
            听音乐看电影效果声音真是太棒了 无线方便 小盒自动充电
            最主要是质量好音质棒 想要买耳机的放心拍 音效巴巴滴 老棒了
          </div>
          <div class="time">
            <span>2020-10-10 10:11:22</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import { findGoodsComment, findGoodsCommentList } from '@/api/goods'
export default {
  name: 'GoodsComment',
  setup () {
    const route = useRoute()
    const currentIndex = ref(0)
    const commentInfos = ref(null)
    // 获取评价信息
    findGoodsComment(route.params.id).then((data) => {
      // 往tags中追加两个两个对象，名称为全部评价和有图
      data.result.tags.unshift({
        tagCount: data.result.hasPictureCount,
        title: '有图',
        type: 'img'
      })
      data.result.tags.unshift({
        tagCount: data.result.evaluateCount,
        title: '全部评价',
        type: 'all'
      })
      commentInfos.value = data.result
    })

    const tagChanged = (index) => {
      currentIndex.value = index
      const currentTag = commentInfos.value.tags[index]
      if (currentTag.type === 'all') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (currentTag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = null
        reqParams.tag = currentTag.title
      }
    }
    const sortFieldChanged = (field) => {
      reqParams.sortField = field
    }

    // 准备数据请求参数体
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      // 排序字段可选值：praiseCount,createTime;分别代表最热、最新的顺序排列；默认值为null即默认排序
      sortField: null
    })
    // 监听reqParams的变化，发送数据请求
    watch(reqParams, () => {
      findGoodsCommentList(route.params.id, reqParams).then(data => {
        console.log(data.result)
      })
    }, { immediate: true })

    return { currentIndex, commentInfos, tagChanged, reqParams, sortFieldChanged }
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
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
