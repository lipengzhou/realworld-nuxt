<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Post
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login">Sign up</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  created () {
    return {}
  }
}
</script>

