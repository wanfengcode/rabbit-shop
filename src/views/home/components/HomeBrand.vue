<template>
  <div class="home-brand">
    <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
      <template #right>
        <a href="javascript:;" class="iconfont icon-angle-left prev" @click="togo(-1)"  :class="{disabled:index===0}"></a>
        <a href="javascript:;" class="iconfont icon-angle-right next" @click="togo(1)" :class="{disabled:index === 1}" ></a>
      </template>
      <!-- 面板内容 -->
      <div class="box">
        <ul class="list" ref="target" :style="{ transform:`translate(${-index*1240}px)` }">
          <li v-for="(item,i) in brandList" :key="i">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './HomePanel.vue'
import { useLazyData } from '@/hooks'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',
  components: {
    HomePanel
  },
  setup () {
    const target = ref(null)
    const brandList = useLazyData(target, findBrand)
    const index = ref(0)

    // 品牌图片共十张等分为两版,因此index的值只存在0 1
    const togo = (step) => {
      const tempIndex = index.value + step
      //   当tempIndex值小于0或大于1对index均不做处理,并返回不再执行后续代码
      if (tempIndex < 0 || tempIndex > 1) {
        return
      }
      index.value = tempIndex
    }

    return { target, brandList, togo, index }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
