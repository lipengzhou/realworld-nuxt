<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <nuxt-link
              v-if="auth && auth.username === profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="`/profile/${$route.params.username}`"
                  exact
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="`/profile/${$route.params.username}/favorited`"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from '@/api/profile'
import { mapState } from 'vuex'

export default {
  name: 'ProfileIndex',
  computed: {
    ...mapState(['auth'])
  },

  async asyncData ({ params }) {
    console.log('asyncData')
    const { data } = await getProfile(params.username)
    return {
      profile: data.profile
    }
  }
}
</script>

<style>
</style>
