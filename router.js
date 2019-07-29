export default {
  linkActiveClass: 'active',
  extendRoutes (routes, resolve) {
    // 删除 Nuxt 自动生成的路由表
    routes.splice(0)

    // 自定义配置路由表
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
        component: resolve(__dirname, 'views/register')
      },
      {
        name: 'editor',
        path: '/editor',
        component: resolve(__dirname, 'views/editor')
      },
      {
        name: 'editor-edit',
        path: '/editor/:slug',
        component: resolve(__dirname, 'views/editor')
      },
      {
        path: '/profile/:username',
        component: resolve(__dirname, 'views/profile'),
        children: [
          {
            name: 'profile',
            path: '',
            component: resolve(__dirname, 'views/profile/components/my-articles')
          },
          {
            name: 'profile-favorited',
            path: 'favorited',
            component: resolve(__dirname, 'views/profile/components/favorited-articles')
          }
        ]
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
