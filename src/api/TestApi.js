import HttpKit from '@/utils/http-kit'

export default {
  test (date) {
    return HttpKit.post(`/visitor/test`, date).then(
      res => res.data
    )
  }
}
