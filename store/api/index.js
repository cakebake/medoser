export const state = () => ({
  status: {
    online: false,
    message: ''
  }
})

export const mutations = {
  setOnline (state, message) {
    state.status.online = true
    state.status.message = message
  },
  setOffline (state, message) {
    state.status.online = false
    state.status.message = message
  }
}

export const getters = {
  status (state) {
    return state.status
  }
}

export const actions = {
  async fetchStatus ({ commit }) {
    try {
      const { message } = await this.$axios.$get('/api/status')
      commit('setOnline', message)
    } catch (e) {
      commit('setOffline', `API offline. ${e.message}.`)
    }
  }
}
