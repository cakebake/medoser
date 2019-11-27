const apiRoute = '/api'

export const state = () => ({
  online: false,
  message: ''
})

export const mutations = {
  status (state, online, message) {
    state.online = online
    state.message = message
  }
}

export const actions = {
  async fetch ({ commit }) {
    try {
      const { message } = await this.$axios.$get(apiRoute)
      commit('status', true, message)
    } catch (e) {
      commit('status', false, `API offline. ${e.message}.`)
    }
  }
}
