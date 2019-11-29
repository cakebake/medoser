import { get } from 'lodash'

export const state = () => ({
  url: '',
  honeypot: '',
  show: true,
  modified: false,
  response: {
    info: {
      success: false,
      message: null,
      data: null
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
  infoResponse (state, { success, message, data }) {
    state.response.info = { success, message, data }
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
      const message = get(error, 'response.data.message', error.message)
      commit('infoResponse', { success: false, message, data: null })
    }
  },
  reset ({ state, commit }) {
    commit('url', '')
    commit('honeypot', '')
    commit('infoResponse', { success: false, message: null, data: null })
    commit('modified', false)
  }
}
