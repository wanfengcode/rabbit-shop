<template>
    <rabbit-bread>
        <rabbit-bread-item to="/">首页</rabbit-bread-item>
        <rabbit-bread-item  v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</rabbit-bread-item>
        <transition name="fade-right">
        <rabbit-bread-item v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</rabbit-bread-item>
        </transition>
    </rabbit-bread>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup () {
    const store = useStore()
    const route = useRoute()

    // 获取vuex中category模块的全部分类数据集list
    const category = computed(() => {
      const result = {}
      /*
      遍历全部分类list即遍历一级分类
      若一级分类有children属性即二级分类
      则通过find方法遍历二级分类寻找id值等于当前路由地址的id
      匹配到相应id则找到当前二级分类，同时也就找到二级分类归属于哪个一级分类
      将相应一级、二级分类的id name属性取出存入到对象中并返回
      */
      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            result.top = { id: top.id, name: top.name }
            result.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return result
    })

    return { category }
  }
}
</script>

<style lang="less" scoped>

</style>
