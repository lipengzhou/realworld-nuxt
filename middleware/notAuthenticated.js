export default function ({ store, redirect }) {
  // 如果用户通过身份验证，则重定向到主页
  if (store.state.auth) {
    return redirect('/')
  }
}
