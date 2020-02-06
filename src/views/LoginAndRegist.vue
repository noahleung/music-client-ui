<template>
  <div class="back" :style="{height: (screenHeight) + 'px'}" >
    <span style="text-align: center;font-size: 30px;color:white;font-weight: bold;opacity: 0.9;font-family: 微软雅黑;margin-top: 10px;display: inline-block">肇院听</span>
    <div v-if="loginFlag" style="width: 280px;background: white;margin: 7% auto 0 auto;height: 35%;padding: 20px 80px;border-radius: 10px">
      <span style="font-weight: bold;font-size: 20px">用户登录</span>
      <el-form :model="account" style="margin-top: 15%">
        <el-form-item >
          <el-input prefix-icon="el-icon-s-custom" v-model="account.username" placeholder="邮箱账号" ></el-input>
        </el-form-item>
        <el-form-item >
          <el-input show-password prefix-icon="el-icon-lock" v-model="account.password" placeholder="密码" @keyup.enter.native="login()"></el-input>
          <span style="color: red">{{resultTips}}</span>
        </el-form-item>

        <el-form-item>
          <el-button type="success" style="width: 30%"  @click="openRegist()">注册</el-button>
          <el-button  type="primary" @click="login()" style="width: 30%" @keyup.enter.native="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--分割线-->
    <div v-else style="width: 280px;background: white;margin: 4% auto 0 auto;height: 60%;padding: 20px 80px;border-radius: 10px">
      <span style="font-weight: bold;font-size: 20px">用户注册</span>
      <el-form :model="regist" style="margin-top: 15%">
        <el-form-item >
          <el-input prefix-icon="el-icon-s-custom" v-model="regist.username" placeholder="邮箱账号" style="width: 100%" @change="validateUsername">
            <template slot="append" v-if="usernameTips">{{usernameTips}}</template>
          </el-input>
          <el-button style="width: 100%" :disabled="getCodeDisable"  @click="getVerifyCode"><span style="font-size: 13px">{{getCode}}</span></el-button>

        </el-form-item>
        <el-form-item >
          <el-input prefix-icon="el-icon-s-flag" v-model="regist.code" placeholder="邮箱验证码" style="width: 100%" @change="checkCode()">
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input prefix-icon="el-icon-s-custom" v-model="regist.name" placeholder="用户名称" style="width: 100%" @change="checkName()">
            <template slot="append" v-if="nameTips">{{nameTips}}</template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input show-password prefix-icon="el-icon-lock" v-model="regist.password" maxlength="11" placeholder="密码"  @change="checkPassword">
          <template slot="append" v-if="passwordTips">{{passwordTips}}</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input show-password prefix-icon="el-icon-lock" v-model="repeatPassword" maxlength="11" placeholder="重复输入密码" @change="recheckPassword">
          <template slot="append" v-if="repeatPasswordTips">{{repeatPasswordTips}}</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" style="width: 30%"  @click="loginFlag = true">返回</el-button>
          <el-button  type="primary" @click="registAccount()" style="width: 30%" :disabled="registDisable">注册</el-button>
          <span style="color: red">{{registResult}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginAndRegistApi from '@/api/LoginAndRegistApi'
export default {
  name: 'Login',
  data () {
    return {
      getCode: '获取验证码',
      isGeting: false,
      count: 30,
      getCodeDisable: true,
      loginFlag: true,
      screenHeight: document.documentElement.clientHeight,
      account: {
        username: '',
        password: ''
      },
      regist: {
        username: '',
        password: '',
        name: '',
        code: ''
      },
      repeatPassword: '',
      resultTips: '',
      usernameTips: '',
      passwordTips: '',
      nameTips: '',
      codeTips: '',
      repeatPasswordTips: '',
      registDisable: true, // 标记注册按钮是否可用
      passwordCheck: false, // 标记密码
      usernameCheck: false, // 标记账号
      nameCheck: false, // 标记姓名
      codeCheck: false, // 标记验证码
      registResult: ''
    }
  },
  methods: {
    checkAll () {
      if (this.passwordCheck === false || this.usernameCheck === false || this.nameCheck === false || this.codeCheck === false || this.username === '' || this.name === '') {
        this.registDisable = true
      } else {
        this.registDisable = false
      }
    },
    validateUsername () {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.regist.username !== '' && !regEmail.test(this.regist.username)) {
        this.usernameTips = '邮箱不合法'
        this.getCodeDisable = true
        this.usernameCheck = false
        this.checkAll()
      } else {
        this.usernameTips = ''
        this.usernameCheck = true
        this.checkUsername()
        this.checkAll()
      }
    },
    openRegist () {
      this.clearAll()
      this.loginFlag = false
    },
    checkCode () {
      if (this.regist.code !== '') {
        this.codeCheck = true
      } else {
        this.codeCheck = false
      }
      this.checkAll()
    },
    checkPassword () {
      if (this.regist.password === '') {
        this.passwordCheck = false
        this.passwordTips = ''
      } else {
        if (this.regist.password.length < 6) {
          this.passwordCheck = false
          this.passwordTips = '密码长度不能小于6位'
        } else {
          this.passwordCheck = true
          this.passwordTips = ''
        }
        this.checkAll()
      }
    },
    recheckPassword () {
      if (this.repeatPassword === '') {
        this.passwordCheck = false
      } else {
        if (this.regist.password === this.repeatPassword) {
          this.passwordCheck = true
          this.repeatPasswordTips = ''
        } else {
          this.passwordCheck = false
          this.repeatPasswordTips = '两次输入的密码不一致'
        }
      }
      this.checkAll()
    },
    checkName () {
      if (this.regist.name !== '') {
        LoginAndRegistApi.checkName(this.regist).then(data => {
          if (data === 'success') {
            this.nameTips = '可用'
            this.nameCheck = true
          } else {
            this.nameTips = '不可用'
            this.nameCheck = false
          }
        })
      } else {
        this.nameTips = ''
        this.nameCheck = false
      }
      this.checkAll()
    },
    checkUsername () {
      if (this.regist.username !== '') {
        LoginAndRegistApi.checkUsername(this.regist).then(data => {
          if (data === 'success') {
            this.usernameTips = '可用'
            this.usernameCheck = true
            this.getCodeDisable = false
          } else {
            this.usernameTips = '不可用'
            this.usernameCheck = false
            this.getCodeDisable = true
          }
        })
      } else {
        this.usernameTips = ''
        this.usernameCheck = false
        this.getCodeDisable = true
      }
      this.checkAll()
    },
    registAccount () {
      LoginAndRegistApi.regist(this.regist).then(data => {
        if (data === 'success') {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.loginFlag = true
          this.clearAll()
        } else {
          this.registResult = '验证码不正确'
        }
      })
    },
    getVerifyCode () {
      LoginAndRegistApi.registCode(this.regist)
      this.countDown()
    },
    countDown () {
      var countDown = setInterval(() => {
        if (this.count < 1) {
          this.isGeting = false
          this.getCodeDisable = false
          this.getCode = '获取验证码'
          this.count = 30
          clearInterval(countDown)
        } else {
          this.isGeting = true
          this.getCodeDisable = true
          this.getCode = this.count-- + 's后重发'
        }
      }, 1000)
    },
    login () {
      LoginAndRegistApi.login(this.account).then(data => {
        if (data.message === 'success') {
          this.$message('登陆成功')
          this.$router.push({name: 'Main'})
        } else if (data.data === 'not exist') {
          this.resultTips = '账号不存在'
        } else {
          this.resultTips = '账号或密码错误'
        }
      })
    },
    clearAll () {
      this.registDisable = true
      this.resultTips = ''
      this.usernameTips = ''
      this.nameTips = ''
      this.codeTips = ''
      this.repeatPasswordTips = ''
      this.account.username = ''
      this.account.password = ''
      this.regist.username = ''
      this.regist.password = ''
      this.regist.name = ''
      this.regist.code = ''
      this.repeatPassword = ''
      this.registResult = ''
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .back{
    background-image: url('../assets/login.jpg');
    background-repeat: no-repeat;
    background-size:cover;
    background-attachment: fixed;
  }
</style>
