<template>
  <article-list :articles="articles" />
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleList from '@/components/article-list'

export default {
  name: 'FavoritedArticles',
  components: {
    ArticleList
  },

  async asyncData ({ params }) {
    const { data } = await getArticles({
      favorited: params.username
    })
    return {
      articles: data.articles
    }
  }
}
</script>
