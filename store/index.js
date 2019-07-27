const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  auth: null
})

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // 找不到有效的Cookie
      }
    }
    commit('setAuth', auth)
  }
}
