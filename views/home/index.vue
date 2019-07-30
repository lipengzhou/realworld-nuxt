<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="$store.state.auth" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: $route.query.tab === 'my-feed' }"
                  active-class=""
                  to="/?tab=my-feed&page=1"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  to="/"
                  active-class=""
                  :class="{ active: !$route.query.tab }"
                >Global Feed</nuxt-link>
              </li>
              <li v-if="$route.query.tab === 'tag'" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: $route.query.tab === 'tag' }"
                  active-class=""
                  :to="`/?tab=tag&tag=${$route.query.tag}&page=1`"
                ># {{ $route.query.tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <article-list :articles="articles" />
          <!-- /文章列表 -->

          <div class="article-preview" v-show="articleLoading">
            Loading articles...
          </div>

          <!-- 分页 -->
          <nav v-if="totalPage !== 1">
            <ul class="pagination">
              <!-- 
                /?page=xx
                /?tab=my-feed&page=xx
                /?tab=tag&tag=xx&page=xx
               -->
               <router-link
                 tag="li"
                 class="page-item"
                 :class="{ active: $route.fullPath === '/' && n === 1 }"
                 exact
                 :to="pageHref + n"
                 v-for="n in totalPage"
                 :key="n"
               >
               <a class="page-link">{{ n }}</a>
             </router-link>
            </ul>
          </nav>
          <!-- /分页 -->
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                :to="`/?tab=tag&tag=${tag}&page=1`"
              >{{ tag }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getMyFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import ArticleList from '@/components/article-list'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  
  async asyncData (context) {
    const {
      tab, // current tab
      tag = null, // tag name
      page = 1 // current page
    } = context.query

    let loadArticles = tab === 'my-feed' ? getMyFeedArticles : getArticles

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        tag,
        page
      }),
      getTags()
    ])

    const { articles, articlesCount } = articleRes.data

    return {
      articles,
      articlesCount,
      tags: tagRes.data.tags
    }
  },

  data () {
    return {
      articleLoading: false
    }
  },

  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / 10)
    },

    pageHref () {
      const { tab, tag } = this.$route.query
      let qs = ''
      if (tab === 'my-feed') {
        qs = 'tab=my-feed'
      } else if (tab === 'tag') {
        qs = `tab=tag&tag=${tag}`
      }
      return `/?${qs}&page=`
    }
  },

  watch: {
    async '$route.query' ({
      tab, // current tab
      tag = null, // tag name
      page = 1 // current page
    }) {
      this.articleLoading = true
      let loadArticles = tab === 'my-feed' ? getMyFeedArticles : getArticles

      const articleRes = await loadArticles({ tag, page })

      const { articles, articlesCount } = articleRes.data

      this.articles = articles
      this.articlesCount = articlesCount
      this.articleLoading = false
    }
  }
}
</script>
