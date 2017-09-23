<template>
  <div id="SignUp" class="signUp">
    <div class="signUp_bg">
      <el-form class="signUp_form">
        <el-form-item label="公司名称:">
          <el-input v-model="company.companyName" @blur="checkName()"></el-input>
        </el-form-item>
        <el-form-item label="公司类型:">
          <el-select v-model="company.catId" placeholder="请选择">
            <el-option
              v-for="item in catId"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号名称:">
          <el-input v-model="company.userName" @blur="checkUserName" :maxlength=18></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" >
          <el-input v-model="company.mobilePhone" @blur="checkPhones"></el-input>
        </el-form-item>
        <el-form-item label="设置密码:">
          <el-input type="password" v-model="company.password" @blur="checkPassword" :maxlength=18></el-input>
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input placeholder="请输入验证码"v-model="checkCodes">
            <el-button :disabled = "disabled" slot="append" @click="sendCheck" :icon="loading" v-bind:style='msgClass'>{{sendmsg}}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="signUp_btt" @click="signUp">注册</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        sendmsg: '发送短信',
        loading: '',
        timer: 60,
        disabled: false,
        msgClass: 'background-color: #50bfff; color:#fff; width: 88px',
        catId: [{
          value: '1',
          label: '土建'
        }, {
          value: '2',
          label: '装饰'
        }, {
          value: '3',
          label: '辅助、工具'
        }, {
          value: '4',
          label: '其他'
        }],
        company: {
          companyName: '',
          catId: '',
          userName: '',
          mobilePhone: '',
          password: ''
        },
        checkCodes: '',
        signflag: '',
        checkName2: false,
        checkUserName2: false,
        checkPhones2: false,
        checkPassword2: false,
        checkSendMsg2: false
      }
    },
    methods: {
      // 发送验证码
      sendCheck () {
        if (this.checkPhones() !== false) {
          var s = this.company.mobilePhone + ''
          this.$store.dispatch('sendCheckMsg', {'phone': s}).then(
            res => {
              console.log(this.$store.state.login.sendmsg)
              if (this.$store.state.login.sendMsg === 'success') {
                console.log('短信发送成功')
                this.$message({
                  showClose: true,
                  message: '短信发送成功',
                  type: 'success'
                })
              } else {
                this.$message.error('短信发送失败。请稍后再试')
              }
            }
          ).catch((err) => {
            console.log(err)
          })
          if (this.$cookie.get(s) != null) {
            this.setTimer()
          } else {
            this.$cookie.set(s, new Date().getTime(), 1)
            this.setTimer()
          }
        }
      },
      // 设置验证码样式
      setTimer () {
        let times = this.$cookie.get(this.company.mobilePhone + '')
        let timer = Math.round((new Date().getTime() - times) / 1000 + 1)
        this.sendmsg = 60 - timer + '秒'
        this.loading = 'loading'
        if (timer < 60) {
          setTimeout(() => {
            this.disabled = true
            this.setTimer()
          }, 1000)
        } else {
          this.$cookie.delete(this.company.mobilePhone + '')
          this.disabled = false
          this.sendmsg = '重新发送'
          this.loading = ''
        }
      },
      // 校验验证码是否正确
      checkSendMsg () {
        let checkCode = this.checkCodes
        if (checkCode === '' || checkCode.length < 6) {
          this.$message.error('验证码不正确，请重新填写')
          this.checkSendMsg2 = false
          return false
        } else {
          this.$store.dispatch('checkcode', {'checkCode': checkCode}).then(
            res => {
              if (!this.$store.state.login.checkCode) {
                this.$message.error('验证码不正确，请重新填写')
                this.checkSendMsg2 = false
                return false
              } else {
                this.checkSendMsg2 = true
              }
            })
        }
      },
      // 校验公司名格式
      checkName () {
        let name = this.company.companyName
        let str = "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
        var pattern = new RegExp(str)
        let check = pattern.test(name)
        if (check) {
          this.$message.error('公司名称中不能包含符号，如有疑问请联系我们')
          this.checkName2 = false
          return false
        } else {
          this.checkName2 = true
        }
      },
      // 校验账号名格式
      checkUserName () {
        let userName = this.company.userName
        if (userName.length < 6) {
          this.$message.error('账号名称长度必须超过六位')
          this.checkUserName2 = false
          return false
        } else {
          this.checkUserName2 = true
        }
        let str = '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$'
        let pattern = new RegExp(str)
        let b = pattern.test(userName)
        console.log(b)
        if (!b) {
          this.$message.error('账号名称必须包含字母和数字')
          this.checkUserName2 = false
          return false
        } else {
          this.$store.dispatch('checkUser', {'userName': userName}).then(
            res => {
              if (!this.$store.state.login.checkUser) {
                this.$message.error('用户名已存在，请更换')
                this.checkUserName2 = false
                return false
              } else {
                this.checkUserName2 = true
              }
            }
          ).catch((err) => {
            console.log(err)
          })
        }
      },
      // 校验手机号格式
      checkPhones () {
        let phone = this.company.mobilePhone
        let str = /^1[34578]\d{9}$/
        let b = str.test(phone)
        if (!b) {
          this.$message.error('手机号格式不正确。请更换')
          this.checkPhones2 = false
          return false
        } else {
          this.$store.dispatch('checkPhone', {'phone': phone}).then(
            res => {
              let checkPhone = this.$store.state.login.checkPhone
              if (!checkPhone) {
                this.$message.error('手机号已注册。请修改')
                this.checkPhones2 = false
                return false
              } else {
                this.checkPhones2 = true
              }
            }
          )
        }
      },
      // 校验密码格式
      checkPassword () {
        let password = this.company.password
        if (password.length < 6) {
          this.$message.error('密码长度不能小于6位')
          this.checkPassword2 = false
          return false
        } else {
          this.checkPassword2 = true
        }
        let str = '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z!@#$%^&*.+-_~]{6,18}$'
        let pattern = new RegExp(str)
        console.log(password)
        let b = pattern.test(password)
        console.log(b)
        if (!b) {
          this.$message.error('密码必须包含字母和数字')
          this.checkPassword2 = false
          return false
        } else {
          this.checkPassword2 = true
        }
      },
      // 注册事件
      signUp () {
        this.checkSendMsg()
        this.checkName()
        this.checkUserName()
        this.checkPhones()
        this.checkPassword()
        let checkName2 = this.checkName2
        let checkUserName2 = this.checkUserName2
        let checkPhones2 = this.checkPhones2
        let checkPassword2 = this.checkPassword2
        let checkSendMsg2 = this.checkSendMsg2
        if (checkName2 !== false && checkUserName2 !== false && checkPhones2 !== false && checkPassword2 !== false && checkSendMsg2 !== false) {
          this.$store.dispatch('signUps', this.company).then(
            res => {
              let signUpRes = this.$store.state.login.signUpRes
              console.log(signUpRes)
              if (!signUpRes.status) {
                this.$message.error(signUpRes.msg)
                return
              } else {
                this.$message({
                  showClose: true,
                  message: '注册成功，1秒钟后跳转至信息完善页面',
                  type: 'success'
                })
                let userInfo = {
                  'companyName': this.company.companyName,
                  'userName': this.company.userName,
                  'adId': signUpRes.adId
                }
                let s = JSON.stringify(userInfo)
                sessionStorage.setItem('userInfo', s)
                setTimeout(() => {
                  this.$emit('signUp', 3)
                }, 1000)
                return
              }
            }
          )
        } else {
          return
        }
      }
    }
  }
</script>
<style>
  .signUp {
    height: 550px;
    width: 100%;
    margin: 0 auto;
    background: url(../../assets/组-8_7.png) no-repeat;
  }
  .signUp_bg {
    margin: 0 auto;
    height: 100%;
    width: 400px;
    overflow: hidden;
  }
  .signUp_form .el-input {
    width: 260px;
  }
  .signUp_form {
    margin-top: 40px;
  }
  .signUp_form label {
    width: 72px;
  }
  .signUp_btt {
    width: 260px;
    margin-left: 70px;
  }
</style>
