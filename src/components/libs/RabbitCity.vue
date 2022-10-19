<template>
  <div class="rabbitCity" ref="target">
    <div
      class="select"
      @click="changeShow"

      :class="{ active: show }"
    >
      <span v-if="fullAddress" class="value">{{fullAddress}}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="show" >
        <div v-if="loading" class="loading"></div>
        <template v-else>
            <span class="ellipsis" @click="changeItem(item)" v-for="item in currentList" :key="item.code">{{item.name}}</span>
        </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'RabbitCity',
  props: {
    fullAddress: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    console.log(props.fullAddress)
    // show用于控制城市选项框显示，target用于绑定元素
    const show = ref(false)
    const target = ref(null)
    const allCityData = ref([])
    // loading用于在数据渲染出来前控制相应加载动画显示
    const loading = ref(false)
    const currentLevel = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countryCode: '',
      countryName: '',
      fullAddress: ''
    })

    const open = () => {
      show.value = true
      loading.value = true
      getCityData().then((data) => {
        allCityData.value = data
        loading.value = false
      })
      for (const key in currentLevel) {
        currentLevel[key] = ''
      }
    }
    const close = () => {
      show.value = false
    }
    const changeShow = () => {
      show.value ? close() : open()
    }

    onClickOutside(target, () => {
      close()
    })

    // 获取城市数据
    const getCityData = () => {
      /*
            这里获取城市数据的接口并不属于该项目中封装过的axios中定义的数据接口，因此需要单独处理
            做法：将获取的城市数据集存储在window的属性下，这样在当前组件请求后，其他组件在使用时可以直接通过window对象获取
            1.判断window中是否存在数据集合，存在则直接获取同时return数据集，不存在则发送axios请求获取后return
                1.1上述两种情况分别为同步、异步操作，在同一函数体内无法同时存在，因此借助Promise对象解决该问题
            2.函数返回一个Promise对象，通过该对象将结果集返回
        */
      return new Promise((resolve, reject) => {
        if (window.cityData) {
          resolve(window.cityData)
        } else {
          const url =
            'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios.get(url).then((data) => {
            window.cityData = data.data
            resolve(window.cityData)
          })
        }
      })
    }

    // 使用计算属性对获取的所有城市数据集和做二次处理
    const currentList = computed(() => {
      let list = allCityData.value
      if (currentLevel.provinceCode) {
        list = list.find(p => p.code === currentLevel.provinceCode).areaList
      }
      if (currentLevel.cityCode) {
        list = list.find(c => c.code === currentLevel.cityCode).areaList
      }

      return list
    })

    const changeItem = (item) => {
      if (item.level === 0) {
        currentLevel.provinceCode = item.code
        currentLevel.provinceName = item.name
      }
      if (item.level === 1) {
        currentLevel.cityCode = item.code
        currentLevel.cityName = item.name
      }
      if (item.level === 2) {
        currentLevel.countryCode = item.code
        currentLevel.countryName = item.name
        currentLevel.fullAddress = `${currentLevel.provinceName} ${currentLevel.cityName} ${currentLevel.countryName}`
        close()
        emit('itemChanged', currentLevel)
      }
    }

    return { show, changeShow, target, loading, currentList, changeItem }
  }
}
</script>

<style lang="less" scoped>
.rabbitCity {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
