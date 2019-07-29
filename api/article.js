import request from '@/utils/request'

/**
 * List Articles
 */
export const getArticles = ({
  tag = null,
  author = null,
  favorited = null,
  pageSize = 10,
  page = 1
} = {}) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params: {
      tag,
      author,
      favorited,
      limit: pageSize,
      offset: (page - 1) * pageSize
    }
  })
}

/**
 * Get Article
 */
export const getArticle = slug => {
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
export const updateArticle = (slug, {
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
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

/**
 * Favorite Article
 */
export const favoriteArticle = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

/**
 * Unfavorite Article
 */
export const unfavoriteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}
