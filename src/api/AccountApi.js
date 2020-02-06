import HttpKit from '@/utils/http-kit'

export default {
  login () {
    return HttpKit.get(`/visitor/login`).then(
      res => res.data
    )
  },
  updateName (accountDto) {
    return HttpKit.post(`/user/update_name`, accountDto).then(
      res => res.data
    )
  },
  updatePassword (passwordDto) {
    return HttpKit.post(`/user/update_password`, passwordDto).then(
      res => res.data
    )
  },
  logout () {
    return HttpKit.get(`/user/logout`).then(
      res => res.data
    )
  }
}
