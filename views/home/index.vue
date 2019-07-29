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
              <li class="nav-item">
                <a class="nav-link disabled" href>Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href>Global Feed</a>
              </li>
            </ul>
          </div>

          <article-list :articles="articles" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{ item }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import ArticleList from '@/components/article-list'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  
  async asyncData (context) {
    const [articleRes, tagRes] = await Promise.all([
      getArticles(),
      getTags()
    ])

    return {
      articles: articleRes.data.articles,
      tags: tagRes.data.tags
    }
  },
  data () {
    return {}
  }
}
</script>
