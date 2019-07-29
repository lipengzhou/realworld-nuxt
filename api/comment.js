import request from '@/utils/request'

/**
 * Add Comments to an Article
 */
export const createComment = (slug, body) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {
      comment: {
        body
      }
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
export const deleteComments = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/:id`
  })
}
