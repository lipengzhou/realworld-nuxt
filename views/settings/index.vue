<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="onUpdateUser"
              >Update Settings</button>
            </fieldset>
          </form>

          <!-- Line break for logout button -->
          <hr>
          <button
            class="btn btn-outline-danger"
            @click="handleLogout"
          >Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'SettingsIndex',
  middware: ['authenticated'],
  data () {
    return {
      user: {
        ...this.$store.state.auth
      }
    }
  },

  methods: {
    handleLogout () {
      // 使外部API上的JWT Cookie无效
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.$router.push('/')
    },

    async onUpdateUser () {
      const { data } = await updateUser(this.user)
      delete data.user.password
      this.$store.commit('setAuth', data.user)
      this.$router.push({
        name: 'profile',
        params: {
          username: this.user.username
        }
      })
    }
  }
}
</script>

<style>
</style>
