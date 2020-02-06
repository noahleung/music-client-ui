<template>
  <div>
    <div style="margin-top: 20px"><span style="font-weight: bold;font-size: 30px;">单&nbsp;曲&nbsp;推&nbsp;荐</span></div>

     <div style="float:left;margin-left: 4%;margin-top: 20px" v-for="i in songsList" :key="i.id">
      <a @click="goDetails(i.id)"><img :src="i.picture" style="width: 200px;height: 200px" class="shadow"/></a>
      <div><span style="float: left">{{i.name}}</span><br>
        <span style="float: left;color: #9B9B9B">歌手：{{i.singerName}}</span></div>
    </div>
  </div>
</template>

<script>
import SongsApi from '@/api/SongsApi'

export default {
  name: 'SongsRecommend',
  data () {
    return {
      songsList: [],
      music: {
        id: '',
        name: '',
        singerName: '',
        albumName: '',
        picture: '',
        url: ''
      }
    }
  },
  methods: {
    goDetails (id) {
      this.$router.push({ name: 'SongsDetails', query: {id: id} })
    }
  },
  mounted () {
    SongsApi.findSongsByRandom().then(data => {
      this.songsList = data
    })
  }
}
</script>

<style scoped>
  .shadow {
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
  }

  img:hover{
    transform: scale(1.2);
    transition: all 0.2s linear;
  }
</style>
