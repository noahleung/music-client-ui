import HttpKit from '@/utils/http-kit'

export default {
  login (LoginDto) {
    return HttpKit.post(`/login_and_regist/user_login`, LoginDto).then(
      res => res
    )
  },
  registCode (emailDto) {
    return HttpKit.post(`/login_and_regist/code`, emailDto).then(
      res => res.data
    )
  },
  regist (registDto) {
    return HttpKit.post(`/login_and_regist/regist`, registDto).then(
      res => res.data
    )
  },
  checkName (registDto) {
    return HttpKit.post(`/login_and_regist/check_name`, registDto).then(
      res => res.data
    )
  },
  checkUsername (registDto) {
    return HttpKit.post(`/login_and_regist/check_username`, registDto).then(
      res => res.data
    )
  },
  checkLogin () {
    return HttpKit.get(`/login_and_regist/user_check_login`).then(
      res => res.data
    )
  }
}
