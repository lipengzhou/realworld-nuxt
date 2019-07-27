<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter="onAddTag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="item in article.tagList"
                    :key="item"
                  >
                    <i class="ion-close-round"></i>
                    {{ item }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onPublish"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle } from '@/api/article'

export default {
  name: 'EditorIndex',
  
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },

  created () {
    if (this.isEdit) {
      this.loadArticle()
    }
  },

  computed: {
    isEdit () {
      return this.$route.path !== '/editor'
    }
  },

  methods: {
    loadArticle () {
      console.log('loadArticle')
    },
    
    async onPublish () {
      try {
        const { data } = await this.isEdit
          ? updateArticle()
          : createArticle(this.article)
        
        this.$router.push({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      } catch (err) {
        console.dir(err)
      }
    },

    onAddTag (e) {
      const input = e.target
      const tag = input.value.trim()
      
      if (!tag) {
        return
      }

      if (this.article.tagList.includes(tag)) {
        return
      }

      this.article.tagList.push(tag)

      input.value = ''
    }
  }
}
</script>

<style>
</style>
