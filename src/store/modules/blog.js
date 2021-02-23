import * as Api from '@/api/blog'

const state = {
  cateList: []
}

const mutations = {
  SET_CATE_LIST(state, payload) {
    Object.assign(state, payload)
  },
}

const actions = {
  async fetchCateList({ commit }) {
    const { list = [] } = await Api.cateList()
    commit('SET_CATE_LIST', {
      cateList: list
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
