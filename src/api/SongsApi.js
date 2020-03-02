import HttpKit from '@/utils/http-kit'

export default {
  findSongsByKeywords (searchDto) {
    return HttpKit.post(`/visitor/find_songs_by_keywords`, searchDto).then(
      res => res.data
    )
  },
  findSongsDtoById (id) {
    return HttpKit.get(`/visitor/find_songs_dto_by_id/${id}`).then(
      res => res.data
    )
  },
  findSongsById (id) {
    return HttpKit.get(`/user/find_songs_by_id/${id}`).then(
      res => res.data
    )
  },
  findSongsByRandom () {
    return HttpKit.get(`/visitor/find_songs_by_random`).then(
      res => res.data
    )
  },
  findTopTenSongs () {
    return HttpKit.get(`/visitor/find_top_ten_songs`).then(
      res => res.data
    )
  },
  playSongs (id) {
    return HttpKit.get(`/user/play_songs/${id}`).then(
      res => res.data
    )
  },
  findSongsByAlbumId (id) {
    return HttpKit.get(`/visitor/find_songs_by_album_id/${id}`).then(
      res => res.data
    )
  },
  findSongsBySingerId (page, size, singerId) {
    return HttpKit.get(`/visitor/find_songs_by_singer_id/${page}/${size}/${singerId}`).then(
      res => res.data
    )
  },
  guess () {
    return HttpKit.get(`/user/guess`).then(
      res => res.data
    )
  },
  findAveragePoints (songsId) {
    return HttpKit.get(`/visitor/find_average_points/${songsId}`).then(
      res => res.data
    )
  },
  findMyPoints (songsId) {
    return HttpKit.get(`/user/find_my_points/${songsId}`).then(
      res => res.data
    )
  },
  giveMyPoints (songsId, points) {
    return HttpKit.get(`/user/give_my_points/${songsId}/${points}`).then(
      res => res.data
    )
  }
}
