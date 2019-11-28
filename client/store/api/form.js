export const state = () => ({
  url: '',
  honeypot: '',
  show: true,
  modified: false,
  response: {
    status: 0,
    message: null,
    data: null
  }
})

export const mutations = {
  url (state, url) {
    state.url = url
    state.modified = true
  },
  honeypot (state, honeypot) {
    state.honeypot = honeypot
    state.modified = true
  },
  show (state, show) {
    state.show = show
  },
  modified (state, modified) {
    state.modified = modified
  },
  response (state, response) {
    state.response = response
  }
}

export const actions = {
  async download ({ state, commit }) {
    try {
      if (state.honeypot !== '') {
        throw new Error('Maybe you are not human at all?')
      }
      const { message, data } = await this.$axios.$post('/api/download', {
        url: state.url
      })
      commit('response', { status: 200, message, data })
    } catch (e) {
      const status = typeof e.response !== 'undefined' ? e.response.status : 0
      commit('response', { status, message: e.message, data: null })
    }
  },
  reset ({ state, commit }) {
    commit('url', '')
    commit('honeypot', '')
    commit('response', { status: 0, message: null, data: null })
    commit('modified', false)
  }
}
