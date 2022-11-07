import { createVNode, render } from 'vue'
import RabbitConfirm from '@/components/libs/RabbitConfirm'

const div = document.createElement('div')
div.setAttribute('class', 'rabbitConfirm')
document.body.appendChild(div)

export default ({ titel, text }) => {
  /*

    */
  return new Promise((resolve, reject) => {
    const confirmFn = () => {
      render(null, div)
      resolve()
    }
    const cancelFn = () => {
      render(null, div)
      reject(new Error('取消'))
    }

    const vNode = createVNode(RabbitConfirm, { titel, text, confirmFn, cancelFn })
    render(vNode, div)
  })
}
