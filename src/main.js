import Vue from 'vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/styles/index.less'

import request from '@/utils/request'
import mixins from '@/utils/mixins'
import PageLayout from '@/layouts/PageLayout'


// 引入echarts
import 'echarts/lib/chart/line'
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import photoSwipe from 'kuan-vue-photoswipe'
import components from '@/common'
import echarts from 'echarts'

import router from './router'
import store from './store'
import App from './App.vue'

Vue.use(antd) // vue antd注册
Vue.use(components) // 全局组件
Vue.use(photoSwipe) // 多图预览
Vue.mixin(mixins) // mixins

Vue.config.productionTip = false;
Vue.prototype.$http = request
Vue.prototype.$echarts = echarts;

Vue.component('page-layout', PageLayout)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
