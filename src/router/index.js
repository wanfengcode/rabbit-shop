import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = [
  // 一级路由
  {
    path: '/',
    component: () => import('@/views/Layout'),
    // 二级路由
    children: [
      {
        path: '/',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = createRouter({
// 使用hash路由模式
  history: createWebHashHistory(),
  routes
})

export default router
