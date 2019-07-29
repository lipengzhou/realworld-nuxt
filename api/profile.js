import request from '@/utils/request'

/**
 * Get Profile
 */
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

/**
 * Follow user
 */
export const followUser = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

/**
 * Unfollow user
 */
export const unFollowUser = (username) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}
