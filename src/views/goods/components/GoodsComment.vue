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
    <div class="sort" v-if="commentInfos">
      <span>排序：</span>
      <a @click="sortFieldChanged(null)" :class="{active:reqParams.sortField === null}" href="javascript:;">默认</a>
      <a @click="sortFieldChanged('createTime')" :class="{active:reqParams.sortField === 'createTime'}" href="javascript:;">最新</a>
      <a @click="sortFieldChanged('praisePercent')" :class="{active:reqParams.sortField === 'praisePercent'}" href="javascript:;">最热</a>
    </div>
    <!-- 评价列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img
            :src="item.member.avatar"
            alt=""
          />
          <span>{{formatNickName(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">
            {{item.content}}
          </div>
          <!-- 评论图片 -->
          <GoodsCommentImg v-if="item.pictures.length" :imgs = "item.pictures"></GoodsCommentImg>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <RabbitPagination v-if="total" @pageChanged="pageChanged" :total="total" :pageSize="reqParams.pageSize" :currentPage="reqParams.page"></RabbitPagination>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import { findGoodsComment, findGoodsCommentList } from '@/api/goods'
import GoodsCommentImg from './GoodsCommentImg.vue'
export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImg
  },
  setup () {
    const route = useRoute()
    const currentIndex = ref(0)
    const commentInfos = ref(null)
    const commentList = ref([])
    const total = ref(0)
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
      //   重置页码
      reqParams.page = 1
    }
    const sortFieldChanged = (field) => {
      reqParams.sortField = field
      reqParams.page = 1
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
        commentList.value = data.result.items
        total.value = data.result.counts
      })
    }, { immediate: true })

    // 格式化规格数据
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => ` ${p}  ${c.name}：${c.nameValue} `, '').trim()
    }
    // 格式化用户名
    const formatNickName = (nickName) => {
      return nickName.substr(0, 1) + '***' + nickName.substr(-1)
    }

    // 分页组件触发事件
    const pageChanged = (page) => {
      reqParams.page = page
    }

    return { currentIndex, commentInfos, tagChanged, reqParams, sortFieldChanged, commentList, formatSpecs, formatNickName, total, pageChanged }
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
