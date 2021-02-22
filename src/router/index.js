import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './constantRoutes'
import asyncRoutes from './asyncRoutes'
import NProgress from 'nprogress' // 网页顶部进度
import 'nprogress/nprogress.css' // 进度条样式
NProgress.configure({ showSpinner: false }) // 隐藏旋转图标

Vue.use(VueRouter)


const createRouter = function () {
  return new VueRouter({
    routes: [...asyncRoutes, ...routes],
    scrollBehavior: () => ({ y: 0 })
  });
};


const router = createRouter();

export function resetRouter() {
  router.matcher = createRouter().matcher;
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { token } = store.state.user.user
  if (!token && to.path !== '/login') {
    next('login')
  }
  if (token && to.path === '/login') {
    next('index')
  }
  NProgress.done()
  next()
})

router.afterEach((route) => {
  NProgress.done()
})

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
