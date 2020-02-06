import HttpKit from '@/utils/http-kit'

export default {
  findAlbumById (id) {
    return HttpKit.get(`/visitor/find_album_by_id/${id}`).then(
      res => res.data
    )
  },
  findAlbumByKeywords (SearchDto) {
    return HttpKit.post(`/visitor/find_album_by_keywords`, SearchDto).then(
      res => res.data
    )
  },
  findAlbumBySingerId (page, size, singerId) {
    return HttpKit.get(`/visitor/find_album_by_singer_id/${page}/${size}/${singerId}`).then(
      res => res.data
    )
  }
}
