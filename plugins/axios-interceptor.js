import request from '@/utils/request'

export default ({ store }) => {
  // Add a request interceptor
  request.interceptors.request.use(config => {
    // Do something before request is sent
    const { auth } = store.state
    if (auth) {
      config.headers['Authorization'] = `Token ${auth.token}`
    }
    return config
  }, error => {
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  request.interceptors.response.use(response => {
    // Do something with response data
    return response
  }, error => {
    // Do something with response error
    return Promise.reject(error)
  })
}
