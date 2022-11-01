/*
    向外提供一个能够显示RabbitMessage组件的函数，作用在于通过该函数能够渲染消息提示框组件
    函数将来用途：组件导入后可以直接使用或挂载到Vue实例的原型上
*/
import { createVNode, render } from 'vue'
import RabbitMessage from './RabbitMessage.vue'

// 创建虚拟Dom并添加到Body标签中成为真实的标签/容器
const div = document.createElement('div')
div.setAttribute('class', 'MessageContainer')
document.body.appendChild(div)

let timer = null

export default ({ type, text }) => {
  /*
        1.导入消息提示框组件
        2.将消息提示组件编译为Vue中的虚拟节点,createVNode(组件名,属性对象)该方法创建虚拟节点，其中属性对象即在使用组件时需要传入的props属性
        3.准备一个标签容器，用于装载消息提示组件
        4.将虚拟节点渲染在容器中，render(虚拟节点,容器)
        5.设置定时器，定时销毁组件
    */
  const vNode = createVNode(RabbitMessage, { type, text })

  render(vNode, div)

  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 2000)
}
