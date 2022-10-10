// 该文件用于封装复用逻辑的函数
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const useLazyData = (target, apiFn) => {
  /*
        useIntersectionObserver函数用于监听Dom标签是否进入可视区
            参数一target:为监听的目标元素
            参数二是一个回调函数,用于定义监听的操作;其中参数isIntersecting为布尔类型,为真时代表监听元素进入可视区反之没进入可视区
            参数三options为配置项,可选参数
        stop函数用于停止对目标元素的监听
    */
  const result = ref(null)
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 当元素进入可视区,停止监听调用相关数据请求函数返回结果值
    if (isIntersecting) {
      stop()
      apiFn().then(data => {
        result.value = data.result
      })
    }
  })
  return result
}
