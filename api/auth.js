import request from '@/utils/request'

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
