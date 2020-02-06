import HttpKit from '@/utils/http-kit'

export default {
  findSingerById (id) {
    return HttpKit.get(`/visitor/find_singer_by_id/${id}`).then(
      res => res.data
    )
  },
  findSingerByKeywords (SearchDto) {
    return HttpKit.post(`/visitor/find_singer_by_keywords`, SearchDto).then(
      res => res.data
    )
  }
}
