import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // 网页顶部进度
import 'nprogress/nprogress.css' // 进度条样式
NProgress.configure({ showSpinner: false }) // 隐藏旋转图标

import GlobalLayout from '@/layouts/GlobalLayout'
import RouteView from '@/layouts/RouteView'

Vue.use(VueRouter)

// 基础路由
export const baseRoute = [
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


export const asyncRoutes = [
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

const createRouter = function () {
  return new VueRouter({
    routes: asyncRoutes,
    scrollBehavior: () => ({ y: 0 })
  });
};

const router = createRouter();

export function resetRouter() {
  router.matcher = createRouter().matcher;
}

// router.beforeEach((to, from, next) => {
//   NProgress.start(); // 进度条开始
//   // 设置标题
//   document.title = getPageTitle(to.meta.title)
//   NProgress.done()
// })

// router.afterEach(() => {
//   NProgress.done()
// })

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
