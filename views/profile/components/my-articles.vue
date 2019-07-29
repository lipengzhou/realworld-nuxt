<template>
  <article-list :articles="articles" />
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleList from '@/components/article-list'

export default {
  name: 'MyArticles',
  components: {
    ArticleList
  },

  async asyncData ({ params }) {
    console.log(params.username)
    const { data } = await getArticles({
      author: params.username
    })
    return {
      articles: data.articles
    }
  }
}
</script>
