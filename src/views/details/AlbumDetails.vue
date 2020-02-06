<template>
  <div>

    <!--上部-->
    <div style="min-height: 100px;">

      <div style="border: aqua solid 3px;width: 230px;margin-left:20%;float: left">
        <img :src="album.picture" style="width: 100%;display:block;" class="shadow"/>
      </div>

      <div style="width: 20%;margin-left: 10%;margin-top: 2%;float: left;">
        <span style="font-weight: bold;font-size: 25px;color: #646464;">{{album.name}}</span><br/><br/>

        <span style="font-weight: bold;color: #646464">歌手：</span>
        <el-link type="primary" @click="goSingerDetails">{{album.singerName}}</el-link> <br/><br/>

        <div style="text-align: left;font-weight: bold;color: #646464;line-height: 25px;font-size: 16px">{{album.introduction}}</div>

      </div>
      <div style="clear: both"></div> <!-- 清除浮动 -->

  </div>
  <div>
    <!--底部-->
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin: 0 auto">
    <el-tab-pane label="专辑歌曲" name="first">

      <div style="margin-left: 17%">
        <el-table
          :data="album.songsList"
          style="width: 80%">

          <el-table-column
            type="index"
            label="序号"
            :index="indexMethod"
            width="220">
          </el-table-column>

          <el-table-column
            prop="name"
            label="歌名"
            width="220">
          </el-table-column>

          <el-table-column prop="pictures" label="封面">
            <template slot-scope="scope">
              <img :src="scope.row.picture" width="25%" />
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="success" icon="el-icon-search" @click="check(scope.row.id)">查看</el-button>
              <el-button size="small" type="success" icon="el-icon-video-play" @click="play(scope.row.id)">播放</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-tab-pane>
    <el-tab-pane label="评论区" name="third">
      <comments :id="album.id" v-if="album.id"></comments>
    </el-tab-pane>
  </el-tabs>
  </div>
  </div>
</template>

<script>
import Comments from '@/components/Comments'
import SongsApi from '@/api/SongsApi'
import AlbumApi from '@/api/AlbumApi'
export default {
  name: 'AlbumDetails',
  components: {
    Comments
  },
  data () {
    return {
      activeName: 'first',
      album: {
        id: '',
        singerId: '',
        singerName: '',
        introduction: '',
        picture: '',
        name: '',
        songsList: []
      }
    }
  },
  methods: {
    goSingerDetails () {
      this.$router.push({name: 'SingerDetails', query: {id: this.album.singerId}})
    },
    handleClick (tab, event) {
    },
    indexMethod (index) {
      index = index + 1
      return index
    },
    check (id) {
      this.$router.push({ name: 'SongsDetails', query: {id: id} })
    },
    play (id) {
      this.$emit('child-event', id)
    }
  },
  mounted () {
    this.album.id = this.$route.query.id
    AlbumApi.findAlbumById(this.album.id).then(data => {
      this.album.introduction = data.introduction
      this.album.singerId = data.singerId
      this.album.singerName = data.singerName
      this.album.name = data.name
      this.album.picture = data.picture
      SongsApi.findSongsByAlbumId(this.album.id).then(data => {
        this.album.songsList = data
      })
    })
  }
}
</script>

<style scoped>
  .shadow {
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
  }
</style>
