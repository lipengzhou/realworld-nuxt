export default {
  linkActiveClass: 'active',
  extendRoutes (routes, resolve) {
    routes.splice(0)
    routes.push(...[
      {
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'views/home')
      },
      {
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'views/login')
      },
      {
        name: 'register',
        path: '/register',
        component: resolve(__dirname, 'views/login')
      },
      {
        name: 'editor',
        path: '/editor',
        component: resolve(__dirname, 'views/editor')
      },
      {
        name: 'editor',
        path: '/editor/:slug',
        component: resolve(__dirname, 'views/editor')
      },
      {
        name: 'profile',
        path: '/profile/:username',
        component: resolve(__dirname, 'views/profile')
      },
      {
        name: 'settings',
        path: '/settings',
        component: resolve(__dirname, 'views/settings')
      },
      {
        name: 'article',
        path: '/article/:slug',
        component: resolve(__dirname, 'views/article')
      },
    ])
  }
}
