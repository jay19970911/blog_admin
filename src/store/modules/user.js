// import authority from '@/utils/authority'

// const userCache = authority.get() || {}
// const { token } = userCache

const user = {
  state: {
    token: '',
    user: {},
  },

  mutations: {
    SET_USER: (state, payload) => {
      Object.assign(state, payload)
    },
  },

  actions: {
    // 登录
    async login({ commit }, { username = '', password = '' }) {
      commit('SET_USER', { user: { username, password }, token: 123456 })
    },

    // 登出
    logout({ commit }) {
      commit('SET_USER', {
        token: '',
        name: '',
      })
      // authority.clear()
      window.location.reload()
    },
  },
}

export default user
