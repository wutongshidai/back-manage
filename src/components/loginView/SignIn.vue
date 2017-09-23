<template>
  <div class="SignIn">
    <div class="SignIn_bg">
      <h2>账号登录</h2>
      <hr/>
      <div class="SignIn_body">
        <el-input  @blur="checkUsername1" v-model="admin.userName" :maxlength="18" class="signIn_input" placeholder="请输入用户名" ></el-input>
        <el-input  @blur="checkPassword1" v-model="admin.password" :maxlength="18" type="password" class="signIn_input" placeholder="请输入密码" ></el-input>
        <el-button class="signIn_btt" type="primary" @click="signIn()">登录</el-button>
        <el-button style="float: left" type="text" @click="signUp()">注册</el-button>
        <el-button style="float: right" type="text" @click="changePass()">忘记密码</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        admin: {
          userName: '',
          password: ''
        },
        checkPassword3: '',
        checkUserName3: ''
      }
    },
    methods: {
      // 校验密码格式
      checkPassword1 () {
        let password = this.admin.password
        if (password.length < 6) {
          this.$message.error('密码长度不能小于6位')
          this.checkPassword3 = false
          return false
        } else {
          this.checkPassword3 = true
        }
        let str = '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z!@#$%^&*.+-_~]{6,18}$'
        let pattern = new RegExp(str)
        console.log(password)
        let b = pattern.test(password)
        console.log(b)
        if (!b) {
          this.$message.error('密码必须包含字母和数字')
          this.checkPassword3 = false
          return false
        } else {
          this.checkPassword3 = true
        }
      },
      // 校验用户名
      checkUsername1 () {
        let userName = this.admin.userName
        if (userName.length < 6) {
          this.$message.error('账号名称长度必须超过六位')
          this.checkUserName3 = false
          return false
        } else {
          this.checkUserName3 = true
        }
        let str = '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$'
        let pattern = new RegExp(str)
        let b = pattern.test(userName)
        if (!b) {
          this.$message.error('账号名称必须包含字母和数字')
          this.checkUserName3 = false
          return false
        } else {
          this.checkUserName3 = true
        }
      },
      // 登录
      signIn () {
        this.checkPassword1()
        this.checkUsername1()
        let checkUserName3 = this.checkUserName3
        let checkPassword3 = this.checkPassword3
        if (checkUserName3 !== false && checkPassword3 !== false) {
          this.$store.dispatch('signIns', this.admin).then((res) => {
            if (this.$store.state.login.adminState.status) {
              this.$message({
                showClose: false,
                message: '登录成功',
                type: 'success'
              })
              this.$store.commit('SET_TOKEN', 'true')
              window.sessionStorage.setItem('SET_TOKEN', 'true')
              let s = JSON.stringify(this.$store.state.login.adminState)
              window.sessionStorage.setItem('adminState', s)
              this.$router.push('/goodsManage')
            } else {
              let msg = this.$store.state.login.adminState.msg
              if (msg) {
                this.$message.error(this.$store.state.login.adminState.msg)
              } else {
                this.$message.error('服务器炸了。请稍等')
              }
            }
          })
        }
      },
      // 切换注册页面
      signUp () {
        this.$emit('signUp', 1)
      },
      // 切换修改密码页面
      changePass () {
        this.$emit('')
      }
    }
  }
</script>
<style>
  .SignIn {
    /*background-color: #9dc9fb;*/
    background: url(../../assets/bg5.png) no-repeat;
    height: 100%;
  }
  .SignIn_body {
    height: 280px;
    margin-top: 20px;
    width: 100%;
  }
  .SignIn_bg {
    float: right;
    width: 300px;
    height: 80%;
    margin-top: 50px;
    margin-right: 50px;
    overflow: hidden;
  }
  .signIn_input {
    margin-top: 20px;
    width: 100%;
  }
  .signIn_btt {
    margin-top: 50px;
    width: 100%;
  }
</style>
