<template>
  <div>
    <!--修改密码dialog-->
    <el-dialog title="修改密码" :visible.sync="updatePasswordVisible" style="width: 60%;margin-left: 20%">
      <el-form :model="passwordDto">
        <el-form-item label="原密码" >
          <el-input v-model="passwordDto.beforePassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" >
          <el-input v-model="passwordDto.afterPassword" show-password></el-input>
        </el-form-item>
        <el-form>
          <el-button type="danger" @click="changeUpdatePassword">取消</el-button>
          <el-button type="success" @click="updatePassword()">确定</el-button>
        </el-form>
      </el-form>
    </el-dialog>

    <!--修改信息的dialog-->
    <el-dialog title="修改信息" :visible.sync="updateInfoVisible" style="width: 60%;margin-left: 20%">
      <el-form :model="account">
        <el-form-item label="姓名" >
          <el-input v-model="account.name" @change="checkName()" >
            <template slot="append" v-if="nameTips">{{nameTips}}</template>
          </el-input>
        </el-form-item>
        <el-form>
          <el-button type="danger" @click="closeUpdateInfo()">取消</el-button>
          <el-button type="success" @click="updateInfo()" :disabled="nameCheck">确定</el-button>
        </el-form>
      </el-form>
    </el-dialog>

  <el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#FFFFFF"
    text-color="#000000"
    active-text-color="white">
    <img src="../../assets/zyt.jpg"  style="width: 4%;float: left;margin-left: 3%"/>
    <el-menu-item index="1" style="margin-left: 10%;height: 100%"><router-link :to="{name: 'SongsRecommend'}"><span class="header-font">单曲推荐</span></router-link></el-menu-item>
    <el-menu-item index="2" style="height: 100%"><router-link :to="{name: 'Rank'}"><span class="header-font">排行榜</span></router-link></el-menu-item>
    <el-menu-item index="3" style="height: 100%"  v-if="$store.state.account.username"><el-button type="text" class="header-font" style="color: black" @click="guess()">猜你喜欢</el-button></el-menu-item>
    <el-input v-model="$store.state.keywords" placeholder="请输入搜索内容" style="width: 15%;margin-top: 1%;"></el-input>
    <el-button style="" icon="el-icon-search"  @click="search()">搜索</el-button>
    <el-dropdown style="float: right;margin-top: 1%;margin-right: 10%" v-if="$store.state.account.username">
      <el-avatar icon="el-icon-user-solid" ></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><el-button type="text" @click="changeUpdatePassword">密码修改</el-button></el-dropdown-item>
        <el-dropdown-item ><el-button type="text" @click="changeUpdateInfo">信息修改</el-button></el-dropdown-item>
        <el-dropdown-item><el-button type="text" @click="logout()">退出登录</el-button></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button type="text" @click="goLogin()" style="float: right;margin-top: 1%;margin-right: 10%" v-else>登录/注册</el-button>
  </el-menu>
  </div>
</template>

<script>
import AccountApi from '@/api/AccountApi'
import LoginAndRegistApi from '@/api/LoginAndRegistApi'
import SongsApi from '@/api/SongsApi'
export default {
  name: 'head-menu',
  data () {
    return {
      guessSongsId: '',
      type: '',
      keywords: '',
      passwordDto: {
        beforePassword: '',
        afterPassword: ''
      },
      account: {
        name: ''
      },
      updatePasswordVisible: false,
      updateInfoVisible: false,
      nameTips: '',
      nameCheck: 'true'
    }
  },
  methods: {
    guess () {
      let songsId = ''
      SongsApi.guess().then(data => {
        if (data === '') {
          this.$notify({
            title: '',
            message: '您听的歌还不够多，无法进行推荐'
          })
        } else {
          songsId = data
          this.$router.push({
            name: 'SongsDetails',
            query: {id: songsId}})
        }
      })
    },
    checkName () {
      if (this.account.name !== '') {
        LoginAndRegistApi.checkName(this.account).then(data => {
          if (data === 'success') {
            this.nameTips = '可用'
            this.nameCheck = false
          } else {
            this.nameTips = '不可用'
            this.nameCheck = true
          }
        })
      } else {
        this.nameTips = ''
        this.nameCheck = true
      }
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
    changeUpdateInfo () {
      this.account.name = this.$store.state.account.name
      this.updateInfoVisible = true
    },
    closeUpdateInfo () {
      this.account.name = ''
      this.updateInfoVisible = false
    },
    changeUpdatePassword () {
      this.passwordDto.beforePassword = ''
      this.passwordDto.afterPassword = ''
      this.updatePasswordVisible = !this.updatePasswordVisible
    },
    updateInfo () {
      AccountApi.updateName(this.account).then(data => {
        if (data === 'success') {
          this.updateInfoVisible = false
          this.checkLogin()
        }
      })
    },
    updatePassword () {
      AccountApi.updatePassword(this.passwordDto).then(data => {
        if (data === 'success') {
          AccountApi.logout().then(data => {
            if (data === 'success') {
              this.changeUpdatePassword()
              this.checkLogin()
              this.$message({
                message: '修改密码成功，请重新登录',
                type: 'success'
              })
            }
          })
        }
      })
    },
    logout () {
      AccountApi.logout().then(data => {
        if (data === 'success') {
          this.$store.commit('changeUsername', '')
          this.$store.commit('changeName', '')
          this.$router.push({name: 'Main'})
          this.$message('退出登录成功')
        }
      })
    },
    goLogin () {
      this.$router.push({name: 'LoginAndRegist'})
    },
    search () {
      if (this.$store.state.keywords === '') {
        this.$message.error('请输入搜索的内容')
      } else {
        // this.$store.commit('changeKeywords', this.keywords)
        if (this.$route.path !== '/Search') {
          this.$router.push({name: 'Search'})
        } else {
          this.$emit('child-search', this.$store.state.keywords)
        }
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

<style scoped>
  .header-font{
    font-size: 20px;font-weight: 600;

    font-family: 微软雅黑;
  }
  .el-menu-item.is-active {
    background-color: #31C27C !important;
  }
</style>
