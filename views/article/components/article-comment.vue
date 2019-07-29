<template>
  <div>
    <form
      v-if="$store.state.auth"
      class="card comment-form"
      @submit.prevent
    >
      <div class="card-block">
        <textarea
          v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3">
        </textarea>
      </div>
      <div class="card-footer">
        <img :src="$store.state.auth.image" class="comment-author-img" />
        <button
          class="btn btn-sm btn-primary"
          @click="onPostComment"
        >Post Comment</button>
      </div>
    </form>
    <p v-else>
      <a href="#/login">Sign in</a> or <a href="#/register">sign up</a> to add comments on this article.
    </p>
    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <a href class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a href class="comment-author">{{ comment.author.username }}</a>
        <span class="date-posted">{{ comment.createdAt | relativeTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, createComment, deleteComments } from '@/api/comment'

export default {
  name: 'ArticleComment',
  props: {
    slug: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      comment: {
        body: ''
      },
      comments: []
    }
  },

  mounted () {
    this.loadComments()
  },

  methods: {
    async loadComments () {
      const { data } = await getComments(this.slug)
      this.comments = data.comments
    },

    async onPostComment () {
      const { data } = await createComment(this.slug, this.comment)
      this.comments.unshift(data.comment)
      this.comment.body = ''
    }
  }
}
</script>
