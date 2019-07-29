<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <a href class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | relativeTime }}</span>
    </div>
    <template
      v-if="$store.state.auth && (article.author.username === $store.state.auth.username)"
    >
      <span>
        <nuxt-link
          class="btn btn-outline-secondary btn-sm"
          :to="`/editor/${article.slug}`"
        >
          <i class="ion-edit"></i> Edit Article
        </nuxt-link>
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
        @click="$authenticated() && onFollow()"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ isFollowing ? 'UnFollow' : 'Follow' }} {{ article.author.username }}
        <!-- <span class="counter">(10)</span> -->
      </button>
      &nbsp;&nbsp;
      <!-- 
        已喜欢 btn-primary
        未喜欢 btn-outline-primary
       -->
      <button
        class="btn btn-sm"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
        :disabled="favoriteLoding"
        @click="$authenticated() && onFavorite()"
      >
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? 'UnFavorite' : 'Favorite' }} Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/profile'
import { favoriteArticle, unfavoriteArticle } from '@/api/article'

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
      followLoding: false,
      favoriteLoding: false
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
    },

    async onFavorite () {
      try {
        this.favoriteLoding = true

        const { favorited, slug } = this.article
      
        let res = null
        if (favorited) {
          res = await unfavoriteArticle(slug)
        } else {
          res = await favoriteArticle(slug)
        }

        this.article.favorited = res.data.article.favorited
      } catch (err) {
        console.log(err)
      }

      this.favoriteLoding = false
    },
  }
}
</script>
