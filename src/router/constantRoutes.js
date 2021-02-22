// 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

// 基础路由
export default [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/403',
    component: () => import('@/views/error/403')
  },
  {
    path: '/404',
    component: () => import('@/views/error/404')
  },
  {
    path: '/500',
    component: () => import('@/views/error/500')
  }
]