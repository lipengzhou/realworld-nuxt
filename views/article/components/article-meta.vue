<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <a href class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | relativeTime }}</span>
    </div>
    <template v-if="article.author.username === $store.state.auth.username">
      <span>
        <a class="btn btn-outline-secondary btn-sm" href="#">
          <i class="ion-edit"></i> Edit Article
        </a>
        <button class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </template>
    <template v-else>
      <!-- 
        未关注 btn-outline-secondary
        已关注 btn-secondary
       -->
      <button
        class="btn btn-sm"
        :class="{
          'btn-secondary': isFollowing,
          'btn-outline-secondary': !isFollowing
        }"
        :disabled="followLoding"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ isFollowing ? 'UnFollow' : 'Follow' }} {{ article.author.username }}
        <!-- <span class="counter">(10)</span> -->
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/profile'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      followLoding: false
    }
  },

  computed: {
    isFollowing () {
      return this.article.author.following
    }
  },

  methods: {
    async onFollow () {
      try {
        this.followLoding = true
        
        const { following, username } = this.article.author
      
        let res = null
        if (following) {
          res = await unFollowUser(username)
        } else {
          res = await followUser(username)
        }

        this.article.author.following = res.data.profile.following
      } catch (err) {
        console.log(err)
      }

      this.followLoding = false
    }
  }
}
</script>
