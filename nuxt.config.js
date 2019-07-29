import router from './router'

export default {
  router,
  plugins: [
    '~/plugins/axios-interceptor.js',
    '~/plugins/filters.js',
    '~/plugins/authenticated.js'
  ]
}
