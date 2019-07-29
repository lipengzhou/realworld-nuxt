import request from '@/utils/request'

/**
 * Add Comments to an Article
 */
export const createComment = (slug, comment) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {
      comment
    }
  })
}

/**
 * Get Comments from an Article
 */
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

/**
 * Delete Comment
 */
export const deleteComments = (slug, commentId) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${commentId}`
  })
}
