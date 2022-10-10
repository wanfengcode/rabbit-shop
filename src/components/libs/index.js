// 该文件为项目自定义封装插件的入口文件,具体封装插件的代码放置同级文件libs下
// 插件用于扩展vue的功能主要包括：全局组件、自定义指令、挂载原型方法等
/*
    vue3封装插件步骤：
        1.默认导出一个对象
        2.对象中拥有install(){}方法，参数为app即main.js中创建的Vue实例
        3.通过app的component方法将插件名和插件进行配置
    使用时，在main.js中导入，通过use方法将插件进行注册
*/
import RabbitCarousel from './RabbitCarousel.vue'
import RabbitMore from './RabbitMore.vue'
import defaultImg from '@/assets/images/200.png'

const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}

export default {
  install (app) {
    // 将封装的插件注册到整个项目的根实例中,即全局注册
    app.component(RabbitCarousel.name, RabbitCarousel)
    app.component(RabbitMore.name, RabbitMore)

    // 将自定义的指令注册到根实例中
    defineDirective(app)
  }
}
