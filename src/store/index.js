import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}

function requireAll(r) {
  return r.keys().map(key => {
    if (key === './index.js') return
    let name = key.replace(/^.\/modules\//, '').replace(/.js$/, '')
    modules[name] = r(key).default
  })
}
requireAll(require.context('./', true, /.js$/))

// console.log(modules)

export default new Vuex.Store({
  modules
})
