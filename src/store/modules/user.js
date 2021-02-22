import * as Api from '@/api/user';
import authority from '@/utils/authority'

const state = {
  user: authority.get() || {}
}

const getters = {
  isLogin(state) {
    return !!state.user.token
  }
}

const mutations = {
  SET_USER: (state, payload = {}) => {
    Object.assign(state, payload)
  }
}

const actions = {
  // 登录
  async login({ commit }, { username = '', password = '' }) {
    const data = await Api.login({
      username: username.trim(),
      password: password.trim()
    })
    data.is_admin = 1
    authority.set(data)
    commit('SET_USER', { user: data })
  },
  // 登出
  async logout() {
    authority.clear()
    window.location.reload()
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
