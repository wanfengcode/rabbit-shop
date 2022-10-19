<template>
 <div class="goodsSku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="value in item.values" :key="value.name">
        <img @click="choosen(item.values,value)" :class="{selected:value.selected}" v-if="value.picture" :src="value.picture" :title="value.name">
        <span @click="choosen(item.values,value)" :class="{selected:value.selected}" v-else>{{value.name}}</span>
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

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    /*
     当前商品规格参数选中效果
     思路：往每个存储具体规格参数的value对象中规定一个属性为selected用于判断当前参数是否选中
     在触发事件函数中定义两个形参values value；values为装载规格参数的数组，value存储具体某个规格的具体参数
     判断value的selected是否存在，存在则将值取反
     不存在则遍历啊数组values将每个value的selected属性设为false
     遍历完成后将当前value的selected值取反
     */
    const choosen = (values, value) => {
      if (value.selected) {
        value.selected = !value.selected
      } else {
        values.forEach(item => {
          item.selected = false
        })
        value.selected = !value.selected
      }
    }

    // 获取sku路径字典
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)

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
