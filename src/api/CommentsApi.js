import HttpKit from '@/utils/http-kit'

export default {
  findCommentsByObjectId (page, size, objectId) {
    return HttpKit.get(`/visitor/find_comments_by_object_id/${page}/${size}/${objectId}`).then(
      res => res.data
    )
  },
  addComments (comments) {
    return HttpKit.post(`/user/add_comments`, comments).then(
      res => res.data
    )
  },
  addReportComments (reportCommentsDto) {
    return HttpKit.post(`/user/add_report_comments`, reportCommentsDto).then(
      res => res.data
    )
  },
  delete (commentsId) {
    return HttpKit.get(`/user/delete_comments/${commentsId}`).then(
      res => res.data
    )
  }
}
