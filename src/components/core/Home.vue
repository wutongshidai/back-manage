<template>
  <div id="home" class="home_class">
    <div class="top_class">
      <div class="head_class">
        <div class="head_class_d">
          <p>{{userName}}</p><p>您好</p>
          <el-button type="text" class="head_class_btt" @click="logOut">退出</el-button>
        </div>
      </div>
      <!--<img src="../../assets/logobig.png" style="margin: 0;width: 1260px;height: 120px;display: block; "/>-->
      <div class="midd_class">
          <router-link to="/goodsManage"><el-button type="text" class="butt_class">商品管理</el-button></router-link>
          <router-link to="/shopManage"> <el-button type="text" class="butt_class" style="margin-left: 260px">店铺管理</el-button></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import localGoods from './goodsManage/rightPage/create/LocalGoods.vue'
  export default {
    components: {localGoods},
    name: 'home',
    data () {
      return {
        userName: ''
      }
    },
    methods: {
      logOut () {
        sessionStorage.clear()
        this.$router.push('/')
      },
      check_logins () {
        setTimeout(() => {
          this.$store.dispatch('checkLogin').then(
            res => {
//              console.log(this.$store.state.login.check_login)
              if (!this.$store.state.login.check_login.status) {
                this.$alert(this.$store.state.login.check_login.msg, '登录错误', {
                  confirmButtonText: '确定',
                  type: 'error',
                  callback: action => {
                    this.$router.push('/')
                    sessionStorage.clear()
                  }
                })
              } else {
                this.check_logins()
              }
            }
          ).catch(res => {
            this.$alert('登录异常请重新登录', '登录错误', {
              confirmButtonText: '确定',
              type: 'error',
              callback: action => {
                this.$router.push('/')
                sessionStorage.clear()
              }
            })
          })
        }, 1000 * 60 * 10)
      }
    },
    mounted () {
    },
    created () {
      this.userName = this.$store.state.login.adminState.userName
      this.check_logins()
    }
  }
</script>
<style>
  .home_class{
    height: 100%;
  }
  .midd_class{
    background: #eef1f6;
  }
  .head_class {
    width: 1260px;
    height: 120px;
    background: url(../../assets/logobig.png);
  }
 .head_class p {
    float: left;
   height: 40px;
   line-height: 40px;
    color: gray;
  }
  .head_class_d :first-child {
    color: #20a0ff;
  }

   .head_class_btt  {
     font-size: 20px;
   }
  .head_class_d {
    width: 200px;
    float: right;
    margin-top: 80px;
    font-size: 20px;
  }
  .top_class{
    /*background-color: #4db3ff;*/
    width: 100%;
    height: 215px;
  }
  .butt_class{
    float: left;
    margin-left: 60px;
    font-size: 25px;
    color: black;
  }

</style>
