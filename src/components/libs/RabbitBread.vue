
<script>
import { h } from 'vue'
export default {
  name: 'RabbitBread',
  render () {
    /*
        render()函数用于渲染Vue的虚拟dom结构，其默认传入的参数createElement函数简写为h用于创建dom结构
        h(element,class,child):
            element是创建标签的标签名，String类型
            class是标签绑定的样式名，Object类型
            child是创建标签的子节点
    */
    //    this.$slots用于获取插槽的dom结构，default()方法返回默认插槽的dom结构；具名插槽则后面接具体的插槽名称
    const nodes = this.$slots.default()
    const dynamicList = []
    nodes.forEach((item, index) => {
      dynamicList.push(item)
      if (index < nodes.length - 1) {
        dynamicList.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })

    return h('div', { class: 'rabbitBread' }, dynamicList)
  }
}
</script>

<style lang="less">
.rabbitBread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
