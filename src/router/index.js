import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = [
  // 一级路由
  {
    path: '/',
    // 路由懒加载
    component: () => import('@/views/Layout'),
    // 二级路由
    children: [
      {
        path: '/',
        component: () => import('@/views/home')
      },
      {
        path: '/category/:id',
        component: () => import('@/views/category')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/SubCategory')
      }
    ]
  }
]

const router = createRouter({
// 使用hash路由模式
  history: createWebHashHistory(),
  routes,
  // scrollBehavior函数控制切换到新路由时，页面滚到顶部或保持原来位置
  // 其中left控制水平方向上的滚动，top控制垂直方向的滚动；默认以浏览器的body为参照进行偏移
  scrollBehavior () {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
