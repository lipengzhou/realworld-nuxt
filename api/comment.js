import request from '@/utils/request'

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
 * Get Article
 */
export const getArticles = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

/**
 * Crate Article
 * Required fields: title, description, body
 * Optional fields: tagList as an array of Strings
 */
export const createArticle = ({
  title,
  description,
  body,
  tagList
}) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data: {
      article: {
        title,
        description,
        body,
        tagList
      }
    }
  })
}

/**
 * Update Article
 * Tip: The slug also gets updated when the title is changed
 */
export const getArticles = (slug, {
  title,
  description,
  body
}) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data: {
      title,
      description,
      body
    }
  })
}

/**
 * Delete Article
 * Tip: The slug also gets updated when the title is changed
 */
export const getArticles = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}
