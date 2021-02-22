// 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面

import GlobalLayout from '@/layouts/GlobalLayout'
import RouteView from '@/layouts/RouteView'

export default [
  {
    path: '/',
    component: GlobalLayout,
    redirect: '/index',
    children: [
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      },
      {
        name: 'introduction',
        path: '/introduction',
        component: () => import('@/views/introduction/index'),
        meta: {
          title: '个人简介',
          icon: 'user'
        }
      },
      {
        name: 'blog',
        path: '/blog',
        component: RouteView,
        redirect: '/blog',
        meta: {
          title: '博客管理',
          icon: 'file-markdown'
        },
        children: [
          {
            name: '博客列表',
            path: '/blog',
            component: () => import('@/views/blog/index'),
            meta: { title: '博客列表' }
          },
          {
            name: 'blogDetail',
            path: '/blog/detail',
            component: () => import('@/views/blog/detail.vue'),
            meta: {
              title: '博客详情',
            },
            invisible: true
          },
          {
            name: 'blogClassify',
            path: '/blog/classify',
            component: () => import('@/views/blog/classify.vue'),
            meta: {
              title: '分类管理'
            }
          }
        ]
      },
      {
        name: 'project',
        path: '/project',
        component: RouteView,
        redirect: '/project',
        meta: {
          title: '项目管理',
          icon: 'project'
        },
        children: [
          {
            name: 'project',
            path: '/project/list',
            component: () => import('@/views/project'),
            meta: {
              title: '项目列表'
            }
          },
          {
            name: 'projectDetail',
            path: '/project/detail',
            component: () => import('@/views/project/detail.vue'),
            meta: {
              title: '项目详情',
            },
            invisible: true
          },
        ]
      },
      {
        name: 'icon',
        path: '/icon',
        component: () => import('@/views/icon/index'),
        meta: {
          title: '图标管理',
          icon: 'file-image'
        }
      },
      {
        name: 'chart',
        path: '/chart',
        component: () => import('@/views/chart/index'),
        meta: {
          title: '图表管理',
          icon: 'pie-chart'
        }
      },
      {
        name: 'error',
        path: '/error',
        component: RouteView,
        redirect: '/error/403',
        meta: { title: '错误页面', icon: 'exclamation-circle' },
        children: [
          {
            name: '403',
            path: '/error/403',
            component: () => import('@/views/error/403'),
            meta: { title: '403' }
          },
          {
            name: '404',
            path: '/error/404',
            component: () => import('@/views/error/404'),
            meta: { title: '404' }
          },
          {
            name: '500',
            path: '/error/500',
            component: () => import('@/views/error/500'),
            meta: { title: '500' }
          }
        ]
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]


