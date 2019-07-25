import request from '@/utils/request'

export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}
