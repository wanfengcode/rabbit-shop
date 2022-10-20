<template>
 <div class="goodsSku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="value in item.values" :key="value.name">
        <img @click="choosen(item.values,value)" :class="{selected:value.selected , disabled:value.disabled}" v-if="value.picture" :src="value.picture" :title="value.name">
        <span @click="choosen(item.values,value)" :class="{selected:value.selected, disabled:value.disabled}" v-else>{{value.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import powerSet from '@/vender/powerSet'

// 生成路径字典部分
const split = '*'
// 将后台返回的skus信息转为路径字典也就是对象，方便查找相应sku组合
const getPathMap = (skus) => {
  const pathMap = {}
  // 获取后台返回的skus数据集
  // 筛选有效sku，
  skus.forEach(sku => {
    // 过滤掉没有库存的sku
    if (sku.inventory > 0) {
      // 将sku的具体参数取出作为可选值数组
      const validSku = sku.specs.map(item => item.valueName)
      // 借助第三方js库的powserSet方法将可选值数组传入，得到有效sku的幂集(子集)
      const powerSku = powerSet(validSku)
      // 根据子集往路径字典中存储键值对key-value
      powerSku.forEach(arr => {
        const key = arr.join(split)
        /*
        一个sku代表了一个具有完整规格参数的商品
        若即将要往pathMap中追加的key值在之前遍历中就已经追加了，说明当前规格参数不止存在于一条sku中
        例如；
                商品：衣服
                    规格：
                        颜色：红色 黑色 蓝色 绿色 白色
                        尺码：S M L XL XXL XXXL
        若当前遍历的sku属性为黑色 L ,那么将要往pathMap对象中追加的key值有黑色、L、黑色*L这三种；
        如果key值黑色已存在，说明黑色衣服的库存量有不同的尺码也就是存在多个sku，那么此时应将当前sku的id追加进当前的key值中
        以便在选择商品规格参数的时候判断是否可选
        */
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })

  return pathMap
}

// 获取当前选中规格参数的数组
const getSlectedValue = (specs) => {
  /*
        实现过程：
            声明一个空数组用于接收所有被选中参数
            遍历商品的每个规格，查找当前规格下selected属性为真的数据对象，将其取出
            若对象存在则将对象的name属性值追加到空数组中，没有则追加undefined
    */
  const arr = []
  specs.forEach(item => {
    const selectedValue = item.values.find(value => value.selected)
    arr.push(selectedValue ? selectedValue.name : undefined)
  })
  return arr
}

// 更新商品sku禁用状态
const updateSkuDisabled = (specs, pathMap) => {
  // 给每一个可选规格参数定义一个属性disabled，类型为布尔型用于控制禁用状态
//   遍历每个规格下的每个参数均绑定disabled属性，属性值由查找路径字典pathMap的结果决定
  specs.forEach((item, index) => {
    const selectedValueArr = getSlectedValue(specs)
    item.values.forEach(value => {
      // 若当前参数已被选中略过当前规格的判断
      if (value.selected) {
        return
      }
      // 当前参数没有被选中，则将其name属性值套入到选中参数的数组中，位置必须严格在遍历到的当前规格下
      selectedValueArr[index] = value.name
      // 将数组过滤掉undefined值并做字符拼接后作为路径字典关键字
      const key = selectedValueArr.filter(val => val).join(split)
      // 拿着关键字匹配路径字典，将结果返回给disabled
      value.disabled = !pathMap[key]
    })
  })
}

// 根据skuId选中对应商品的每个参数
const selectedValById = (goods, skuId) => {
  // 找到skuId对应的sku对象
  const sku = goods.skus.find(sku => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((item, index) => {
      const value = item.values.find(value => value.name === sku.specs[index].valueName)
      value.selected = true
    })
  }
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 获取sku路径字典
    const pathMap = getPathMap(props.goods.skus)
    // 组件初始化时，更新商品规格的禁用状态
    updateSkuDisabled(props.goods.specs, pathMap)
    /*
     当前商品规格参数选中效果
     思路：往每个存储具体规格参数的value对象中规定一个属性为selected用于判断当前参数是否选中
     在触发事件函数中定义两个形参values value；values为装载规格参数的数组，value存储具体某个规格的具体参数
     判断value的selected是否存在，存在则将值取反
     不存在则先遍历数组values将每个value的selected属性设为false
     遍历完成后将当前value的selected值取反，以此确保当前规格下只有一个参数被选中
     */
    const choosen = (values, value) => {
      // 当传入的value，其disabled属性为真时，则直接返回不做选中操作
      if (value.disabled) {
        return
      }
      if (value.selected) {
        value.selected = !value.selected
      } else {
        values.forEach(item => {
          item.selected = false
        })
        value.selected = !value.selected
      }
      // 每次选中商品参数后，都更新一次参数是否被禁用
      updateSkuDisabled(props.goods.specs, pathMap)
    }

    selectedValById(props.goods, props.skuId)

    return { choosen, pathMap }
  }
}

</script>

<style lang="less" scoped>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goodsSku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      line-height: 40px;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
