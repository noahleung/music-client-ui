<template>
<div>
  <!--上部-->
  <div style="min-height: 100px;">

    <div style="border: aqua solid 3px;width: 230px;margin-left:20%;float: left">
      <img :src="singer.picture" style="width: 100%;display:block;" class="shadow"/>
    </div>

    <div style="width: 20%;margin-left: 10%;margin-top: 2%;float: left;text-align: left">
      <span style="font-weight: bold;font-size: 27px;color: #646464;">{{singer.name}}</span><br/><br/>
      <div style="line-height: 20px">
      <span style="font-weight: bold;color: #646464">
        个人介绍：{{singer.introduction}}
      </span>
      </div>
       <br/><br/>

    </div>
    <div style="clear: both"></div> <!-- 清除浮动 -->

  </div>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin: 0 auto">
      <el-tab-pane label="歌曲" name="songs">
        <el-table
          :data="songsList"
          style="width: 100%">
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
          <el-table-column
            prop="albumName"
            label="专辑名称"
            width="220">
          </el-table-column>
          <el-table-column
            prop="singerName"
            label="歌手名称">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="success" icon="el-icon-search" @click="songsCheck(scope.row.id)">查看</el-button>
              <el-button icon="el-icon-video-play" size="small" type="success" @click="play(scope.row.id)">播放</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="songsHandleSizeChange"
          @current-change="songsHandleCurrentChange"
          :current-page.sync="songsSearchDto.page"
          :page-sizes="[7,10]"
          :page-size="songsSearchDto.size"
          layout="sizes, prev, pager, next"
          :total="songsSearchDto.total">
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="专辑" name="album">

        <el-table
          :data="albumList"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            :index="indexMethod"
            width="220">
          </el-table-column>

          <el-table-column
            prop="name"
            label="专辑名称"
            width="220">
          </el-table-column>

          <el-table-column prop="pictures" label="封面">
            <template slot-scope="scope">
              <img :src="scope.row.picture" width="25%" class="album" />
            </template>
          </el-table-column>

          <el-table-column
            prop="introduction"
            label="介绍"
            width="220">
          </el-table-column>

          <el-table-column
            prop="singerName"
            label="歌手"
            width="220">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="success" icon="el-icon-search" @click="albumCheck(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="albumHandleSizeChange"
          @current-change="albumHandleCurrentChange"
          :current-page.sync="albumSearchDto.page"
          :page-sizes="[7,10]"
          :page-size="albumSearchDto.size"
          layout="sizes, prev, pager, next"
          :total="albumSearchDto.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>

</div>
</template>

<script>
import SingerApi from '@/api/SingerApi'
import AlbumApi from '@/api/AlbumApi'
import SongsApi from '@/api/SongsApi'
export default {
  name: 'SingerDetails',
  data () {
    return {
      activeName: 'songs',
      singer: {
        id: '',
        name: '',
        introduction: '',
        picture: ''
      },
      songsList: [],
      albumList: [],
      albumSearchDto: {
        page: 1,
        size: 7,
        total: 0
      },
      songsSearchDto: {
        page: 1,
        size: 7,
        total: 0
      }
    }
  },
  methods: {
    albumCheck (id) {
      this.$router.push({name: 'AlbumDetails', query: {id: id}})
    },
    songsCheck (id) {
      this.$router.push({ name: 'SongsDetails', query: {id: id} })
    },
    play (id) {
      this.$emit('child-event', id)
    },
    albumHandleSizeChange (val) {
      this.albumSearchDto.size = val
      this.search()
    },
    albumHandleCurrentChange (val) {
      this.albumSearchDto.page = val
      this.search()
    },
    songsHandleSizeChange (val) {
      this.songsSearchDto.size = val
      this.search()
    },
    songsHandleCurrentChange (val) {
      this.songsSearchDto.page = val
      this.search()
    },
    handleClick (tab, event) {
      this.search()
    },
    search () {
      if (this.activeName === 'songs') {
        this.songsSearch()
      } else if (this.activeName === 'album') {
        this.albumSearch()
      }
    },
    albumSearch () {
      AlbumApi.findAlbumBySingerId(this.albumSearchDto.page, this.albumSearchDto.size, this.singer.id).then(data => {
        this.albumList = data.data
        this.albumSearchDto.size = data.size
        this.albumSearchDto.page = data.page
        this.albumSearchDto.total = data.total
      })
    },
    songsSearch () {
      SongsApi.findSongsBySingerId(this.songsSearchDto.page, this.songsSearchDto.size, this.singer.id).then(data => {
        this.songsList = data.data
        this.songsSearchDto.size = data.size
        this.songsSearchDto.page = data.page
        this.songsSearchDto.total = data.total
      })
    },
    indexMethod (index) {
      index = index + 1
      return index
    }
  },
  mounted () {
    this.singer.id = this.$route.query.id
    SingerApi.findSingerById(this.singer.id).then(data => {
      this.singer.picture = data.picture
      this.singer.introduction = data.introduction
      this.singer.name = data.name
      this.search()
    })
  }
}
</script>

<style scoped>
  .shadow {
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
  }
</style>
