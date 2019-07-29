import request from '@/utils/request'

/**
 * Authentication
 */
export const login = ({
  email,
  password
}) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data: {
      user: {
        email,
        password
      }
    }
  })
}

/**
 * Registration
 */
export const register = ({
  username,
  email,
  password
}) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data: {
      user: {
        username,
        email,
        password
      }
    }
  })
}

/**
 * Get Current User
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

/**
 * Update User
 */
export const updateUser = ({
  email,
  username,
  password,
  image,
  bio
}) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data: {
      email,
      username,
      password,
      image,
      bio
    }
  })
}
