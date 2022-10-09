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

export default {
  install (app) {
    app.component(RabbitCarousel.name, RabbitCarousel)
  }
}
