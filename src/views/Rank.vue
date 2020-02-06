<template>
  <div>
    <div style="margin-top: 10px"><span style="font-weight: bold;font-size: 30px">7天排行榜Top10</span></div>
    <el-table
      :data="musicList"
      style="width: 100%;margin-top: 15px">
      <el-table-column
        type="index"
        label="名次"
        :index="indexMethod"
        width="220">
      </el-table-column>
      <el-table-column
        prop="name"
        label="歌名"
        width="220">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
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
          <el-button size="small" type="success" icon="el-icon-search" @click="check(scope.row.id)">查看</el-button>
          <el-button icon="el-icon-video-play" size="small" type="success" @click="play(scope.row.id)">播放</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SongsApi from '@/api/SongsApi'
export default {
  name: 'Rank',
  data () {
    return {
      musicList: []
    }
  },
  methods: {
    indexMethod (index) {
      index = index + 1
      return '第' + index + '名'
    },
    check (id) {
      this.$router.push({ name: 'SongsDetails', query: {id: id} })
    },
    play (id) {
      this.$emit('child-event', id)
    }
  },
  mounted () {
    SongsApi.findTopTenSongs().then(data => {
      this.musicList = data
    })
  }
}
</script>

<style scoped>

</style>
