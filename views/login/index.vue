<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link class="nav-link" to="/register" exact>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onLogin">
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { login } from '@/api/user'

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  data () {
    return {
      user: {
        email: 'lpzmail@163.com',
        password: '12345678'
      }
    }
  },
  methods: {
    async onLogin () {
      try {
        const { data } = await login(this.user)
        this.$store.commit('setAuth', data.user) // 存储在vuex中用来进行客户端渲染
        Cookie.set('auth', data.user) // 在cookie中保存token用来进行服务器端渲染
        this.$router.push('/')
      } catch (err) {
        console.log('登录失败')
        console.dir(err)
      }
    }
  }
}
</script>

<style>
</style>
