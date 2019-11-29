export const state = () => ({
  url: '',
  honeypot: '',
  show: true,
  modified: false,
  response: {
    info: {
      message: null,
      data: null,
      error: null
    }
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
  infoResponse (state, { message, data, error }) {
    state.response.info = { message, data, error }
  }
}

export const actions = {
  async request ({ state, commit }) {
    try {
      if (state.honeypot !== '') {
        throw new Error('Maybe you are not human at all?')
      }
      const info = await this.$axios.$post('/api/info', {
        url: state.url
      })
      commit('infoResponse', info)
    } catch (error) {
      commit('infoResponse', { message: error.message, data: null, error })
    }
  },
  reset ({ state, commit }) {
    commit('url', '')
    commit('honeypot', '')
    commit('infoResponse', { message: null, data: null, error: null })
    commit('modified', false)
  }
}
