<template>
  <div>
  <div style="position:fixed; bottom:0; width: 27%;z-index: 99999;">
    <!--播放器不用管-->
    <aplayer
      v-if="music.src"
      :music="music"
      theme="#092B24"
      :showLrc="true"
      :float="true"
      :key="music.src"
      style="width: 75%"
    >
    </aplayer>
  </div>
 <el-container>
   <el-header>
     <head-menu @child-search="search" @child-stop="stop" style="height: 80px"></head-menu>
   </el-header>
   <div style="width: 85%;margin: 0 auto;margin-top:35px;display: inline;min-height:300px;">
     <router-view @child-event="play" ref="Search"/>
   </div>
   <el-footer>
     <div style="margin-top: 50px">
       本系统为毕业设计，仅个人展示使用。
     </div>
   </el-footer>
 </el-container>

  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
import SongsRecommend from '@/views/SongsRecommend'
import SongsApi from '@/api/SongsApi'
import HeadMenu from '@/components/layout/head-menu'
import LoginAndRegistApi from '@/api/LoginAndRegistApi'
export default {
  components: {
    HeadMenu,
    SongsRecommend,
    Aplayer
  },
  name: 'main',
  data () {
    return {
      autoplay: true,
      hackSet: false,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      music: {
        id: '',
        title: '请选择播放的音乐',
        artist: ' ',
        src: '',
        pic: '',
        lrc: ''
      }
    }
  },
  watch: {
    '$route': 'checkLogin'
  },
  methods: {
    stop () {
      this.music.id = ''
      this.music.src = ''
      this.music.title = ''
      this.music.artist = ''
      this.music.pic = ''
      this.music.lrc = ''
    },
    checkLogin () {
      LoginAndRegistApi.checkLogin().then(data => {
        if (data === 'not login') {
          this.$store.commit('changeUsername', '')
          this.$store.commit('changeName', '')
        } else {
          this.$store.commit('changeUsername', data.username)
          this.$store.commit('changeName', data.name)
        }
      })
    },
    search (data) {
      if (this.$route.path === '/Search') {
        this.$refs.Search.sonToKid(data)
      }
    },
    play (data) {
      if (data !== this.music.id) {
        SongsApi.playSongs(data).then(data => {
          this.music.id = data.id
          this.music.src = data.url
          this.music.title = data.name
          this.music.artist = data.singerName
          this.music.pic = data.picture
          this.music.lrc = data.lyrics
        })
      }
      const audio = document.querySelector('audio')
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }
}
</script>

<style scoped>
.el-header{
  padding: 0;
}
</style>
