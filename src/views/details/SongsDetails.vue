<template>
<!--<div style="font-family: 'Times New Roman', Times, serif">-->
  <div>
    <!--上半部分-->
  <div style="min-height: 100px;">

    <div style="border: aqua solid 3px;width: 230px;margin-left:20%;float: left">
      <img :src="music.picture" style="width: 100%;display:block;" class="shadow"/>
    </div>

    <div style="width: 20%;margin-left: 10%;margin-top: 2%;float: left">
      <span style="font-weight: bold;font-size: 25px;color: #333333;">{{music.name}}</span><br/><br/>
      <span style="font-weight: bold;color: #9B9BA8">所属专辑：</span>
      <el-link type="primary"  @click="goAlbumDetails">{{music.albumName}}</el-link> <br/><br/>

      <span style="font-weight: bold;color: #9B9BA8">歌手：</span>
      <el-link type="primary" @click="goSingerDetails">{{music.singerName}}</el-link> <br/><br/>

      <el-button icon="el-icon-video-play" size="small" type="success" @click="play()">播放</el-button>
    </div>
    <div style="clear: both"></div> <!-- 清除浮动 -->

  </div>

<el-divider></el-divider>
      <comments :id="music.id" v-if="music.id"></comments>

</div>
</template>

<script>
import SongsApi from '@/api/SongsApi'
import Comments from '@/components/Comments'
export default {
  name: 'SongsDetails',
  components: {
    Comments
  },
  data () {
    return {
      id: '',
      music: {
        id: '',
        name: '',
        singerName: '',
        albumName: '',
        picture: '',
        url: '',
        singerId: '',
        albumId: ''
      }
    }
  },
  methods: {
    goAlbumDetails () {
      this.$router.push({name: 'AlbumDetails', query: {id: this.music.albumId}})
    },
    goSingerDetails () {
      this.$router.push({name: 'SingerDetails', query: {id: this.music.singerId}})
    },
    play () {
      this.$emit('child-event', this.music.id)
    }
  },
  mounted () {
    this.music.id = this.$route.query.id
    SongsApi.findSongsDtoById(this.music.id).then(data => {
      console.log(data)
      this.music.id = data.id
      this.music.singerName = data.singerName
      this.music.albumName = data.albumName
      this.music.picture = data.picture
      this.music.name = data.name
      this.music.singerId = data.singerId
      this.music.albumId = data.albumId
    })
  }
}
</script>

<style scoped>
  .shadow {
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
  }
</style>
