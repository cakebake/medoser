const apiRoute = '/api'

export const state = () => ({
  status: {
    online: false,
    message: ''
  }
})

export const mutations = {
  status (state, online, message) {
    state.status.online = online
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
      const { message } = await this.$axios.$get(apiRoute)
      commit('status', true, message)
    } catch (e) {
      commit('status', false, `API offline. ${e.message}.`)
    }
  }
}
