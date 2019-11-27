const apiRoute = '/api'

export const state = () => ({
  url: '',
  honeypot: '',
  show: true,
  response: {
    status: 0,
    message: null,
    data: null
  }
})

export const mutations = {
  url (state, url) {
    state.url = url
  },
  honeypot (state, honeypot) {
    state.honeypot = honeypot
  },
  show (state, show) {
    state.show = show
  },
  response (state, { status, message, data }) {
    state.response.status = status
    state.response.message = message
    state.response.data = data
  }
}

export const actions = {
  async request ({ state, commit }) {
    try {
      if (state.honeypot !== '') {
        throw new Error('Maybe you are not human at all?')
      }
      const { message, data } = await this.$axios.$post(apiRoute, {
        url: state.url
      })
      commit('response', { status: 200, message, data })
    } catch (e) {
      const status = typeof e.response !== 'undefined' ? e.response.status : 0
      commit('response', { status, message: e.message, data: null })
    }
  }
}
