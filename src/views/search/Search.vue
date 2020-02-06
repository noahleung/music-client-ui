<template>
<div>
  <div>
    <el-input v-model="keywords" placeholder="请输入搜索关键字" style="width: 15%;margin-top: 1%;margin-left: -10%"></el-input>
    <el-button style="" icon="el-icon-search"  @click="search()">搜索</el-button>
  </div>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="单曲搜索" name="songs">
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

    <el-tab-pane label="专辑搜索" name="album">
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

    <el-tab-pane label="歌手搜索" name="singer">
      <div style="float:left;margin-left: 4%;margin-top: 20px" v-for="i in singerList" :key="i">
        <a @click="singerCheck(i.id)"><img :src="i.picture" style="width: 200px;height: 200px" class="shadow"/></a>
        <div style="text-align: center">
          <span style="float: left;color: #9B9B9B;">{{i.name}}</span></div>
      </div>
      <div style="clear: both;"></div>
      <div>
      <el-pagination
        @size-change="singerHandleSizeChange"
        @current-change="singerHandleCurrentChange"
        :current-page.sync="singerSearchDto.page"
        :page-sizes="[5,10]"
        :page-size="singerSearchDto.size"
        layout="sizes, prev, pager, next"
        :total="singerSearchDto.total">
      </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
  <div>
  </div>
</div>
</template>
<script>
import SongsApi from '@/api/SongsApi'
import AlbumApi from '@/api/AlbumApi'
import SingerApi from '@/api/SingerApi'
export default {
  name: 'Search',
  data () {
    return {
      songsList: [],
      albumList: [],
      singerList: [],
      activeName: 'songs',
      keywords: '',
      singerSearchDto: {
        page: 1,
        size: 5,
        total: 0,
        keywords: ''
      },
      albumSearchDto: {
        page: 1,
        size: 7,
        total: 0,
        keywords: ''
      },
      songsSearchDto: {
        page: 1,
        size: 7,
        total: 0,
        keywords: ''
      }
    }
  },
  methods: {
    singerHandleSizeChange (val) {
      this.singerSearchDto.size = val
      this.search()
    },
    singerHandleCurrentChange (val) {
      this.singerSearchDto.page = val
      this.search()
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
    search () {
      if (this.activeName === 'songs') {
        this.songsSearch()
      } else if (this.activeName === 'album') {
        this.albumSearch()
      } else {
        this.singerSearch()
      }
    },
    handleClick (tab, event) {
      this.search()
    },
    sonToKid (keywords) {
      // 父组件传来的调用方法
      this.keywords = keywords
      this.search()
    },
    songsSearch () {
      this.songsSearchDto.keywords = this.keywords
      SongsApi.findSongsByKeywords(this.songsSearchDto).then(data => {
        console.log(data)
        this.songsList = data.data
        this.songsSearchDto.page = data.page
        this.songsSearchDto.size = data.size
        this.songsSearchDto.total = data.total
      })
      this.changeStoreKeywords()
    },
    albumSearch () {
      this.albumSearchDto.keywords = this.keywords
      AlbumApi.findAlbumByKeywords(this.albumSearchDto).then(data => {
        console.log(data)
        this.albumList = data.data
        this.albumSearchDto.page = data.page
        this.albumSearchDto.size = data.size
        this.albumSearchDto.total = data.total
      })
      this.changeStoreKeywords()
    },
    singerSearch () {
      this.singerSearchDto.keywords = this.keywords
      SingerApi.findSingerByKeywords(this.singerSearchDto).then(data => {
        console.log(data)
        this.singerList = data.data
        this.singerSearchDto.page = data.page
        this.singerSearchDto.size = data.size
        this.singerSearchDto.total = data.total
      })
      this.changeStoreKeywords()
    },
    changeStoreKeywords () {
      this.$store.commit('changeKeywords', this.keywords)
    },
    songsCheck (id) {
      this.$router.push({ name: 'SongsDetails', query: {id: id} })
    },
    albumCheck (id) {
      this.$router.push({name: 'AlbumDetails', query: {id: id}})
    },
    singerCheck (id) {
      this.$router.push({name: 'SingerDetails', query: {id: id}})
    },
    play (id) {
      this.$emit('child-event', id)
    },
    indexMethod (index) {
      index = index + 1
      return index
    }
  },
  mounted () {
    this.keywords = this.$store.state.keywords
    this.search()
  }
}
</script>

<style scoped>
  img:hover{
    transform: scale(1.2);
    transition: all 0.2s;
  }

  .shadow {
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
  }
</style>
