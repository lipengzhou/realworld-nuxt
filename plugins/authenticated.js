import Vue from 'vue'

export default function ({ store, redirect }) {
  Vue.prototype.$authenticated = () => {
    if (!store.state.auth) {
      redirect('/login')
      return false
    }
    return true
  }

  // Vue.directive('authenticated', (el) => {
  //   el.style.display = store.state.auth ? 'block' : 'none'
  // })
}
