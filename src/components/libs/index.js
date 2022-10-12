// 该文件为项目自定义封装插件的入口文件,具体封装插件的代码放置同级文件libs下
// 插件用于扩展vue的功能主要包括：全局组件、自定义指令、挂载原型方法等
/*
    vue3封装插件步骤：
        1.默认导出一个对象
        2.对象中拥有install(){}方法，参数为app即main.js中创建的Vue实例
        3.通过app的component方法将插件名和插件进行配置
    使用时，在main.js中导入，通过use方法将插件进行注册
*/
// import RabbitCarousel from './RabbitCarousel.vue'
// import RabbitMore from './RabbitMore.vue'
// import RabbitBread from './RabbitBread.vue'
// import RabbitBreadItem from './RabbitBreadItem.vue'
import defaultImg from '@/assets/images/200.png'
/*
context(dir,deep,match)用于加载某一目录下的文件
dir为需要加载的文件目录
deep为是否需要加载子目录
match为正则表达式，用于匹配目标文件
context()返回一个函数用于导入文件，该函数具备一个keys()方法获取匹配后的所有文件
*/
const importFn = require.context('./', false, /\.vue$/)

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
    // app.component(RabbitCarousel.name, RabbitCarousel)
    // app.component(RabbitMore.name, RabbitMore)
    // app.component(RabbitBread.name, RabbitBread)
    // app.component(RabbitBreadItem.name, RabbitBreadItem)

    // 遍历匹配到的所有组件
    importFn.keys().forEach(item => {
      // 导入组件，default表明导入组件的默认导出也就是export default
      const component = importFn(item).default
      // 注册组件
      app.component(component.name, component)
    })

    // 将自定义的指令注册到根实例中
    defineDirective(app)
  }
}
