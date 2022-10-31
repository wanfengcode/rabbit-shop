<template>
<!-- 分页组件 -->
 <div class="rabbitPagination">
    <a @click="pageChanged(localCurrentPage-1)" v-if="localCurrentPage > 1" href="javascript:;">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pageObj.start > 1" >...</span>
    <a @click="pageChanged(i)" v-for="i in pageObj.btnArr" :key="i" href="javascript:;" :class="{active: localCurrentPage === i}">{{i}}</a>
    <span v-if="pageObj.end < pageObj.totalPages">...</span>
    <a @click="pageChanged(localCurrentPage+1)" v-if="localCurrentPage < pageObj.totalPages" href="javascript:;">下一页</a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'RabbitPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    }
  },
  setup (props, { emit }) {
    // 需要的基础数据：分页按钮个数、当前页码、总条数、每页显示个数
    const pageBtn = 5
    const localCurrentPage = ref(1)
    const totalList = ref(100)
    const localPageSize = ref(10)
    // 依赖基础数据的加工数据：起始页、结束页、按钮数组、总页数
    const pageObj = computed(() => {
      // 总页数,向上取整
      const totalPages = Math.ceil(totalList.value / localPageSize.value)
      // 假设当前页为最中间的页码时：例如当前页为3，则此时起始页为1、结束页为5
      // 根据分页按钮个数得出页码偏移量,向下取整
      const offSet = Math.floor(pageBtn / 2)
      let start = localCurrentPage.value - offSet
      let end = pageBtn + start - 1
      // 判断起始和结束页的合法性
      if (start < 1) {
        start = 1
        // 同时检查结束页合法性
        end = (pageBtn + start - 1) > totalPages ? totalPages : (pageBtn + start - 1)
      }
      if (end > totalPages) {
        end = totalPages
        start = (totalPages - pageBtn + 1) < 1 ? 1 : (totalPages - pageBtn + 1)
      }
      //   根据起始页、结束页得出按钮数组存储的数据
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      return {
        totalPages,
        start,
        end,
        btnArr
      }
    })

    // 页码变化触发事件
    const pageChanged = (page) => {
      localCurrentPage.value = page
      emit('pageChanged', page)
    }

    // 监听props变化，接收外部组件传递分页组件相关数据
    watch(props, () => {
      localCurrentPage.value = props.currentPage
      localPageSize.value = props.pageSize
      totalList.value = props.total
    }, { immediate: true })

    return { localCurrentPage, pageObj, pageChanged }
  }
}
</script>

<style lang="less" scoped>
.rabbitPagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
