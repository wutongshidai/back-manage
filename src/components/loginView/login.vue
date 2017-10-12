<template>
  <div id="login" class="login">
    <div class="login_head">
      <el-button  type="text" class="return_signIn" @click="signIn" v-if="signUpState === 1 || signUpState ===3">返回登录</el-button>
    </div>
    <div class="login_body" v-if="signUpState === 0 || signUpState === 1">
      <sign-in @signUp="signEven" v-if="signUpState === 0"></sign-in>
      <sign-up @signUp="signEven" v-if="signUpState === 1"></sign-up>
    </div>
    <sign-up-pre @signUp="signEven" v-if="signUpState === 3"></sign-up-pre>
    <footers></footers>
  </div>
</template>
<script>
  import Footers from './Footers'
  import SignIn from './SignIn'
  import SignUp from './SignUp'
  import SignUpPre from './SignUpPre'
  export default {
    data () {
      return {
        signUpState: 0
      }
    },
    components: {
      Footers,
      SignIn,
      SignUp,
      SignUpPre
    },
    methods: {
      // 跳转登录
      signIn () {
        this.signUpState = 0
      },
      signEven (msg) {
        this.signUpState = msg
        console.log(msg)
      }
    }
  }
</script>
<style>
  .login {
    height: 900px;
    text-align: center;
  }
  .login2 {
    height: 1600px;
    text-align: center;
  }
  .login_body {
    height: 450px;
    width: 1260px;
    margin:105px auto;
  }
  .login_head {
    width: 1260px;
    height: 120px;
    margin:0 auto;
    background: url(../../assets/logobig1.png) no-repeat;
  }
  .return_signIn {
    width: 260px;
    float: right;
    color: gray;
    font-size: 18px;
    margin-top: 40px;
  }
</style>
