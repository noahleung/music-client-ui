<template>
<div>
  <el-dialog title="举报评论" :visible.sync="dialogFormVisible">
    <el-form :model="reportCommentsDto">
      <el-form-item label="举报理由">
        <el-input v-model="reportCommentsDto.reason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitReportComments">确 定</el-button>
    </div>
  </el-dialog>

  <!--上部分-->
  <div style="margin-top: 20px">
    评论区
  </div>
  <div style="margin-top: 20px">
    <el-input type="textarea" style="width: 50%" v-model="comments.content" maxlength="100" show-word-limit autosize></el-input>
    <el-button type="success" size="small" @click="addComments()">提交</el-button>
  </div>

  <!--中间-->
  <div style="width: 60%;margin: 0 auto;" v-for="i in commentsList" :key="i.id">
    <el-divider></el-divider>
    <div style="float: left;width: 90%;text-align: left">
    <span style="line-height: 20px">{{i.accountName}}：
    {{i.content}}
    </span>
    </div>

    <div style="width: 90%">
      <span style="float: right;font-weight: bold;float: left">发表于：{{i.createAt}}</span>
    <el-link type="primary" style="float: right" @click="openReportComments(i.id)" v-if="i.accountName === $store.state.account.name">删除</el-link>
    <el-link type="primary" style="float: right" @click="openReportComments(i.id)" v-else>举报</el-link>
      <div style="clear: both"></div>
    </div>
    <div style="clear: both"></div>
  </div>
  <!--底部-->
  <el-divider></el-divider>
  <div style= "font-size: 20px;margin-right: 8%">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="searchDto.page"
      background
      layout="prev, pager, next"
      :page-size="searchDto.size"
      :total="searchDto.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import CommentsApi from '@/api/CommentsApi'
export default {
  props: {
    id: ''
  },
  name: 'comments',
  data () {
    return {
      dialogFormVisible: false,
      comments: {
        content: '',
        objectId: ''
      },
      // 被评论的歌曲或专辑id
      commentsList: [], // 存放着所有的评论
      reportCommentsDto: {
        commentsId: '', // 被举报的id
        reason: '' // 举报理由
      },
      searchDto: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    addComments () {
      if (this.comments.content.trim() === '') {
        this.$message.error('输入内容不能为空')
      } else {
        this.comments.objectId = this.id
        CommentsApi.addComments(this.comments).then(data => {
          if (data === 'success') {
            this.findComments()
          }
          this.comments.content = ''
        })
      }
    },
    openReportComments (commentsId) {
      this.reportCommentsDto.commentsId = commentsId
      this.reportCommentsDto.reason = ''
      this.dialogFormVisible = true
    },
    submitReportComments () {
      CommentsApi.addReportComments(this.reportCommentsDto).then(data => {
        if (data === 'success') {
          this.$message({
            message: '举报成功',
            type: 'success'
          })
        } else {
          this.$message.error('举报失败，请重试')
        }
        this.dialogFormVisible = false
      })
    },
    handleCurrentChange (val) {
      this.searchDto.page = val
      this.findComments()
    },
    findComments () {
      CommentsApi.findCommentsByObjectId(this.searchDto.page, this.searchDto.size, this.id).then(data => {
        this.commentsList = data.data
        this.searchDto.total = data.total
        this.searchDto.size = data.size
        this.searchDto.page = data.page
      })
    }
  },
  mounted () {
    this.findComments()
  }
}
</script>

<style scoped>

</style>
