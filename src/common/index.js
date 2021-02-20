// 在main.js中使用Vue.use(...), 会将同级目录下（包括子目录）的所有组件注册成全局组件

const components = {}
function requireAll(r) {
  return r.keys().map(key => {
    const name = key
      .replace(/^\.\//, '')
      .replace(/\/index.vue$/, '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
    components[name] = r(key).default
  })
}
requireAll(require.context('./', true, /index\.vue/))

const install = Vue => {
  Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
  })
}

// console.log(components, 8)

export default {
  install
}