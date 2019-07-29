<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="mdToHtml(article.body)"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :slug="$route.params.slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import marked from 'marked'
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comment'

export default {
  name: 'ArticleIndex',

  components: {
    ArticleMeta,
    ArticleComment
  },
  
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    return {
      article: data.article
    }
  },

  methods: {
    mdToHtml (md) {
      return marked(md)
    }
  }
}
</script>

<style>
</style>
