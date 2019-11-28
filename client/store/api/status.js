export const state = () => ({
  online: false,
  message: 'The API server is unreachable'
})

export const mutations = {
  status (state, { online, message }) {
    state.online = online
    state.message = message
  }
}

export const actions = {
  async fetch ({ commit }) {
    try {
      const { message } = await this.$axios.$get('/api')
      commit('status', { online: true, message })
    } catch (e) {
      commit('status', { online: false, message: `offline. ${e.message}.` })
    }
  }
}
